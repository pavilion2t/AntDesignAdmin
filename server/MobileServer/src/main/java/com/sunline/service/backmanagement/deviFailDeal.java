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
 * @title 设备故障处理
 * @body
 * @date 2017年3月23日
 */
@RestController
@RequestMapping("/deviFailDeal")
public class deviFailDeal {
	@Autowired
	DaoSupport Dao;

	// 获取设备信息
	@RequestMapping(value = "/getDeviceList", method = RequestMethod.POST)
	public Object getDeviceList(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.BANK_PC_DEVICE_LIST", map);
		return ResponseData.success(map);
	}

	// 设备故障详情
	@RequestMapping(value = "/getBorkDetail", method = RequestMethod.POST)
	public Object getBorkDetail(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.BANK_BORK_DETAIL", map);
		return ResponseData.success(map);
	}

	// 获取故障描述
	@RequestMapping(value = "/getBrokContet", method = RequestMethod.POST)
	public Object getBrokContet(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_BORK_CONTET", map);
		return ResponseData.success(map);
	}

	// 指派
	@RequestMapping(value = "/toBrokDesginate", method = RequestMethod.POST)
	public Object toBrokDesginate(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.BANK_BORK_DESIGNATE", map);
		return ResponseData.success(map);
	}
}
