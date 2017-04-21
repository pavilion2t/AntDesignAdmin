package com.sunline.service.backmanagement;

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
 * @title 网点检查指标
 * @body
 * @date 2017年3月23日
 */
@RestController
@RequestMapping("/bankCheckConfig")
public class bankCheckConfig {
	@Autowired
	DaoSupport Dao;

	// 获取网点一类检查指标
	@RequestMapping(value = "/getCheckOption", method = RequestMethod.POST)
	public Object getCheckOption(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_CHECK_OPTION_LIST", map);
		return ResponseData.success(map);
	}

	// 获取网点二类检查指标
	@RequestMapping(value = "/getCheckOptionItem", method = RequestMethod.POST)
	public Object getCheckOptionItem(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_CHECK_OPTION_ITEM_LIST", map);
		return ResponseData.success(map);
	}

	// 二类状态清零
	@RequestMapping(value = "/resetCheckItem", method = RequestMethod.POST)
	public Object resetCheckItem(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.UPDATE_CHECK_ITEM_STATUS", map);
		return ResponseData.success(map);
	}

	// 修改二类状态
	@RequestMapping(value = "/updateCheckSec", method = RequestMethod.POST)
	public Object updateCheckSec(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.UPDATE_CHECK_SECOND_STATUS", map);
		return ResponseData.success(map);
	}

	// 一类状态清零
	@RequestMapping(value = "/updateAllStatus", method = RequestMethod.POST)
	public Object updateAllStatus(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.UPDATE_CHECK_OPTION_ALL_STATUS", map);
		return ResponseData.success(map);
	}

	// 修改一类状态
	@RequestMapping(value = "/updateStatus", method = RequestMethod.POST)
	public Object updateStatus(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.UPDATE_CHECK_OPTION_STATUS", map);
		return ResponseData.success(map);
	}

}
