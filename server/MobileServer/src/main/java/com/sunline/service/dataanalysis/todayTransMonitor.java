package com.sunline.service.dataanalysis;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.sunline.dao.impl.DaoSupport;
import com.sunline.exception.ResponseData;
import com.sunline.util.JsonUtils;

/**
 * @author HYP
 * @title 当日业务总量监控
 * @body
 * @date 2017年3月23日
 */
@RestController
@RequestMapping("/todayTransMonitor")
public class todayTransMonitor {
	@Autowired
	DaoSupport Dao;

	// 查询部门
	@RequestMapping(value = "/getParentBrch", method = RequestMethod.POST)
	public Object getParentBrch(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		RequestAttributes ra = RequestContextHolder.getRequestAttributes();
		ServletRequestAttributes sra = (ServletRequestAttributes) ra;
		HttpServletRequest request = sra.getRequest();
		HttpSession session = request.getSession();
		String id = session.getId();
		String userid = (String) session.getAttribute("userid");
		map.put("userid", userid);
		Dao.findForMap("MobileServerMapper.GET_PARENT_BRANCH", map);
		return ResponseData.success(map);
	}
}
