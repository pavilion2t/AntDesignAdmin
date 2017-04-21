package com.sunline.service.backmanagement;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sunline.dao.impl.DaoSupport;
import com.sunline.exception.ParamException;
import com.sunline.exception.ResponseData;
import com.sunline.util.JedisUtil;
import com.sunline.util.JsonUtils;
import com.sunline.util.JwtUtils;

import redis.clients.jedis.Jedis;

@RestController
public class LoginService {
	@Autowired
	DaoSupport Dao;

	@Autowired
	JwtUtils jwtUtil;

	@Autowired
	JedisUtil jedisUtil;

	// {"userid":"2001","resPasswd":"123456"}
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public Object login(@RequestBody String jsonData, HttpServletRequest req) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		String pwd = map.get("resPasswd").toString();
		Map result = (Map) Dao.findForObject("MobileServerMapper.GET_USER_ID", map);
		String innerid;
		if(result != null && !"".equals(result.get("INNERID"))){
			innerid = (String) result.get("INNERID");
			String passwd = (String) result.get("PASSWORD") ;
			String newpwd = DigestUtils.md5Hex(innerid+pwd.toUpperCase()).toUpperCase();
			if(!passwd.equals(newpwd))
				throw new ParamException("请检查用户名或密码");
			String jwtString = jwtUtil.generateJwtString(innerid);
			map.put("token", jwtString);
			Jedis jedis = jedisUtil.getClient().getResource();
			String sessionName = JedisUtil.SESSION;
			try {
				String old_session = jedis.hget(sessionName, innerid);
				if (old_session != null)
					jedis.hdel(sessionName, old_session);
				jedis.hset(sessionName, innerid, jwtString);
				jedis.hset(sessionName, jwtString, innerid);
			} finally {
				if (jedis != null)
					jedis.close();
			}
			map.put("userna",result.get("USERNA"));
			return ResponseData.success(map);
		} else {
			throw new ParamException("请检查用户名或密码");
		}
	}
}
