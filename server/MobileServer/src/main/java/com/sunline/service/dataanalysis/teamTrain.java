package com.sunline.service.dataanalysis;

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
 * @title 网点训练情况
 * @body
 * @date 2017年3月23日
 */
@RestController
@RequestMapping("/teamTrain")
public class teamTrain {
	@Autowired
	DaoSupport Dao;

	// 查询用户
	@RequestMapping(value = "/brchQuery", method = RequestMethod.POST)
	public Object brchQuery(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_BRANCH_INFO", map);
		return ResponseData.success(map);
	}

	// 查询
	@RequestMapping(value = "/getTeamTrain", method = RequestMethod.POST)
	public Object getTeamTrain(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_TEAM_TRAIN_STAUS", map);
		return ResponseData.success(map);
	}
}
