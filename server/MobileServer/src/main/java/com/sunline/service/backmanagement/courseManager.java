package com.sunline.service.backmanagement;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sunline.dao.impl.DaoSupport;
import com.sunline.exception.ResponseData;
import com.sunline.util.HttpRequest;
import com.sunline.util.JsonUtils;

/**
 * @author HYP
 * @title 课程管理
 * @body
 * @date 2017年3月23日
 */
@RestController
@RequestMapping("/courseManager")
public class courseManager {
	@Autowired
	DaoSupport Dao;

	// 查询t_paper_group里面每个课程的名称及编号，供下拉框使用
	@RequestMapping(value = "/queryGroup", method = RequestMethod.POST)
	public Object queryGroup(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_GROUP_INFO", map);
		return ResponseData.success(map);
	}

	// 查询
	@RequestMapping(value = "/getOrder", method = RequestMethod.POST)
	public Object getOrder(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_PORDER", map);
		return ResponseData.success(map);
	}

	// 查询
	@RequestMapping(value = "/queryQuestion", method = RequestMethod.POST)
	public Object queryQuestion(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_QUESTION_INFO", map);
		return ResponseData.success(map);
	}

	// 有问题
	@RequestMapping(value = "/useQuestion", method = RequestMethod.POST)
	public Object useQuestion(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.USE_QUESTION_INFO", map);
		if(map.get("newtag") != null && map.get("newtag") == "1"){
			map.put("SENDTP", "0");
			map.put("SAVETG", "0");
			map.put("TITLE", "消息通知");
			map.put("REMARK", "亲，训练场有新题啦，赶紧去试试水吧");
			HttpRequest.sendMessage(map, Dao);
			return ResponseData.success(map);
		}
		return ResponseData.success(map);
	}

	@RequestMapping(value = "/modifyQuestion", method = RequestMethod.POST)
	public Object modifyQuestion(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.MODIFY_QUESTION_INFO", map);
		return ResponseData.success(map);
	}
}
