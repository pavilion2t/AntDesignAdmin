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
 * @title 周客流分析
 * @body
 * @date 2017年3月23日
 */
@RestController
@RequestMapping("/signReportWeek")
public class signReportWeek {
	@Autowired
	DaoSupport Dao;

	// 有问题
	// 查询部门
	@RequestMapping(value = "/getParentBrch", method = RequestMethod.POST)
	public Object getParentBrch(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_CHECK_OPTION_LIST", map);
		return ResponseData.success(map);
	}
}
