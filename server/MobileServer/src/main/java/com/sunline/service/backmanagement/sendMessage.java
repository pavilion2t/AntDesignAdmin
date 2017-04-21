package com.sunline.service.backmanagement;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sunline.dao.impl.DaoSupport;
import com.sunline.exception.ParamException;
import com.sunline.exception.ResponseData;
import com.sunline.util.HttpRequest;
import com.sunline.util.JsonUtils;
import com.sunline.util.MsgSend;

/**
 * @author HYP
 * @title 发送消息
 * @body
 * @date 2017年3月24日
 */
@RestController
@RequestMapping("/sendMessage")
public class sendMessage {
	@Autowired
	DaoSupport Dao;

	// 网点信息
	@RequestMapping(value = "/brchQuery", method = RequestMethod.POST)
	public Object brchQuery(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_BRANCH_INFO", map);
		return ResponseData.success(map);
	}

	// 发送
	@RequestMapping(value = "/SendMsg", method = RequestMethod.POST)
	public Object SendMsg(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Map m = HttpRequest.sendMessage(map, Dao);
		if ("0000".equals(m.get("_retCode"))) {
			return ResponseData.success(map);
		} else {
			throw new ParamException(m.get("_retMsg").toString());
		}
	}

}
