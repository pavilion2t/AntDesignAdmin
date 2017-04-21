package com.sunline.service.backmanagement;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sunline.dao.impl.DaoSupport;
import com.sunline.exception.ParamException;
import com.sunline.exception.ResponseData;
import com.sunline.util.JsonUtils;

/**
 * @author HYP
 * @title 行员信息管理
 * @body 函数名就是bpl名
 * @date 2017年3月22日
 */
@RestController
@RequestMapping("/queryUser")
public class queryUser {
	@Autowired
	DaoSupport Dao;

	// 行员信息{"USERID":"","USERNA":"","DEPTNO":"","BRCHNO":"","ROLETP":"","ROLEID":""}
	@RequestMapping(value = "/queryUser", method = RequestMethod.POST)
	public Object queryUser(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.VTAUSER_QUERYUSER", map);
		return ResponseData.success(map);
	}

	// 新增行员
	@RequestMapping(value = "/saveBankUser", method = RequestMethod.POST)
	public Object saveBankUser(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.SAVE_BANK_USER", map);
		if ("0000".equals(map.get("_retCode").toString())) {
			return ResponseData.success(map);
		} else {
			if ("common_vta_adduser_000001".equals(map.get("_retCode").toString())) {
				throw new ParamException(map.get("_retMsg").toString());
			} else {
				throw new ParamException("请检查输入参数！");
			}
		}
	}

	// 修改行员基本信息
	@RequestMapping(value = "/modifyUser", method = RequestMethod.POST)
	public Object modifyUser(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.VTAUSER_UPDATEUSER", map);
		return ResponseData.success(map);
	}

	// 获取行员基本信息
	@RequestMapping(value = "/getUserBasic", method = RequestMethod.POST)
	public Object getUserBasic(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_USER_BASIC_INFO", map);
		return ResponseData.success(map);
	}

	// 获取行员个人经历
	@RequestMapping(value = "/getUserPro", method = RequestMethod.POST)
	public Object getUserPro(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.getuserpro", map);
		return ResponseData.success(map);
	}

	// 增加行员个人经历
	@RequestMapping(value = "/saveUserExper", method = RequestMethod.POST)
	public Object saveUserExper(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.ADD_USER_PROJ", map);
		return ResponseData.success(map);
	}

	// 删除行员个人经历
	@RequestMapping(value = "/delUserExper", method = RequestMethod.POST)
	public Object delUserExper(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.DEL_USER_PROJ", map);
		return ResponseData.success(map);
	}

	// 获取行员个人经历详情
	@RequestMapping(value = "/getOneUserPro", method = RequestMethod.POST)
	public Object getOneUserPro(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.getoneuserpro", map);
		return ResponseData.success(map);
	}

	// 修改行员个人经历详情
	@RequestMapping(value = "/updateOnePro", method = RequestMethod.POST)
	public Object updateOnePro(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.update_one_project", map);
		return ResponseData.success(map);
	}

	// 删除行员信息
	@RequestMapping(value = "/deleteUser", method = RequestMethod.POST)
	public Object deleteUser(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.VTAUSER_DELETEUSER", map);
		return ResponseData.success(map);
	}

	// 部门列表
	@RequestMapping(value = "/deptQuery", method = RequestMethod.POST)
	public Object deptQuery(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_DEPT_INFO", map);
		return ResponseData.success(map);
	}

	// 网点列表
	@RequestMapping(value = "/brchQuery", method = RequestMethod.POST)
	public Object brchQuery(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_BRANCH_INFO", map);
		return ResponseData.success(map);
	}

	// 角色列表
	@RequestMapping(value = "/roleQuery", method = RequestMethod.POST)
	public Object roleQuery(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_ROLE_INFO", map);
		return ResponseData.success(map);
	}

	// 省份
	@RequestMapping(value = "/provinceQuery", method = RequestMethod.POST)
	public Object provinceQuery(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_PROVINCE_INFO", map);
		return ResponseData.success(map);
	}

	// 城市
	@RequestMapping(value = "/cityQuery", method = RequestMethod.POST)
	public Object cityQuery(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_CITY_INFO", map);
		return ResponseData.success(map);
	}
}
