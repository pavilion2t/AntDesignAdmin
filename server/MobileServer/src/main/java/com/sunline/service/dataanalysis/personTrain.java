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
 * @title 个人训练情况
 * @body
 * @date 2017年3月23日
 */
@RestController
@RequestMapping("/personTrain")
public class personTrain {
	@Autowired
	DaoSupport Dao;

	// 行员信息
	@RequestMapping(value = "/queryUser", method = RequestMethod.POST)
	public Object queryUser(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.VTAUSER_QUERYUSER", map);
		return ResponseData.success(map);
	}

	// 网点信息
	@RequestMapping(value = "/brchQuery", method = RequestMethod.POST)
	public Object brchQuery(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_BRANCH_INFO", map);
		return ResponseData.success(map);
	}

	// 确定
	@RequestMapping(value = "/getPerTrain", method = RequestMethod.POST)
	public Object getPerTrain(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_PERSON_TRAIN_STAUS", map);
		return ResponseData.success(map);
	}
}
