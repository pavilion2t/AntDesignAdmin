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
 * @title 设备信息管理
 * @body
 * @date 2017年3月23日
 */
@RestController
@RequestMapping("/queryVTM")
public class queryVTM {
	@Autowired
	DaoSupport Dao;

	// 获取设备信息
	@RequestMapping(value = "/getDeviceInfo", method = RequestMethod.POST)
	public Object getDeviceInfo(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_DEVICE_INFO", map);
		return ResponseData.success(map);
	}
}
