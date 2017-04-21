package com.sunline.service.backmanagement;

import java.io.File;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sunline.dao.impl.DaoSupport;
import com.sunline.exception.ResponseData;
import com.sunline.util.JsonUtils;

/**
 * @author HYP
 * @title 资讯管理
 * @body
 * @date 2017年3月24日
 */
@RestController
@RequestMapping("/wxManager")
public class wxManager {
	@Autowired
	DaoSupport Dao;

	// 查询列表
	@RequestMapping(value = "/artartli", method = RequestMethod.POST)
	public Object artartli(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.getartli", map);
		return ResponseData.success(map);
	}

	// 删除
	@RequestMapping(value = "/artdel", method = RequestMethod.POST)
	public Object artdel(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.article_delete", map);
		String path = ClassUtils.getDefaultClassLoader().getResource("").getPath();
		int begin = path.indexOf("MobileServer");
		String MobileServerpath = path.substring(1, begin + 13);
		String loadpath = MobileServerpath + "upload/wx/" + map.get("filename");
		File wxfolder = new File(loadpath);
		if (wxfolder.isDirectory()) {
			File lists[] = wxfolder.listFiles();
			for (int i = 0; i < lists.length; i++) {
				File wxfile = new File(lists[i].toString());
				if (wxfile.exists()) {
					wxfile.delete();
				}
			}
			wxfolder.delete();
		}
		return ResponseData.success(map);
	}
}
