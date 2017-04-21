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
 * @title 指标参数管理
 * @body
 * @date 2017年3月24日
 */
@RestController
@RequestMapping("/bankTargetFirst")
public class bankTargetFirst {
	@Autowired
	DaoSupport Dao;

	// 添加一类指标
	@RequestMapping(value = "/addCheckOption", method = RequestMethod.POST)
	public Object addCheckOption(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_CHECK_OPTION_ADD", map);
		return ResponseData.success(map);
	}

	// 删除一类指标
	@RequestMapping(value = "/delCheckOption", method = RequestMethod.POST)
	public Object delCheckOption(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.DEL_CHECK_OPTION", map);
		return ResponseData.success(map);
	}

	// 添加二类指标
	@RequestMapping(value = "/addCheckOptionItem", method = RequestMethod.POST)
	public Object addCheckOptionItem(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_CHECK_OPTION_ITEM_ADD", map);
		return ResponseData.success(map);
	}

	// 删除二类指标
	@RequestMapping(value = "/delCheckSec", method = RequestMethod.POST)
	public Object delCheckSec(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.DEL_CHECK_SECOND_ITEM", map);
		return ResponseData.success(map);
	}
}
