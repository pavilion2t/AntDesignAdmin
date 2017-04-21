package com.sunline.service.operationreport;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sunline.dao.impl.DaoSupport;
import com.sunline.exception.ResponseData;
import com.sunline.util.JsonUtils;

/**
 * @author HYP
 * @title 用户活跃度
 * @body
 * @date 2017年3月23日
 */
@RestController
@RequestMapping("/userActivity")
public class userActivity {
	@Autowired
	DaoSupport Dao;

	// 查询
	@RequestMapping(value = "/getActiveInfo", method = RequestMethod.POST)
	public Object getActiveInfo(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_ACTIVE_USER_INFO", map);
		return ResponseData.success(map);
	}
}
