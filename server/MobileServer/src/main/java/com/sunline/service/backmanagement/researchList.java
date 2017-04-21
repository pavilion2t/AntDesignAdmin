package com.sunline.service.backmanagement;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sunline.dao.impl.DaoSupport;
import com.sunline.exception.ParamException;
import com.sunline.exception.ResponseData;
import com.sunline.util.ImportExcelUtil;
import com.sunline.util.JsonUtils;

/**
 * @author HYP
 * @title 调查问卷管理
 * @body
 * @date 2017年3月23日
 */
@RestController
@RequestMapping("/researchList")
public class researchList {
	@Autowired
	DaoSupport Dao;

	// 查询
	@RequestMapping(value = "/getInversInfo", method = RequestMethod.POST)
	public Object getInversInfo(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_INVERTIGATE_INFO", map);
		return ResponseData.success(map);
	}

	// 文件上传
	@RequestMapping(value = "/fileUpload", method = RequestMethod.POST)
	public Object fileUpload(@RequestParam("file") MultipartFile file, HttpServletRequest req, HttpServletResponse res)
			throws Exception {
		res.setHeader("'Access-Control-Allow-Origin", "*");
		String filename = file.getOriginalFilename();
		String path = ClassUtils.getDefaultClassLoader().getResource("").getPath();
		int begin = path.indexOf("MobileServer");
		String MobileServerpath = path.substring(1, begin + 13);
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");// 设置日期格式
		String savepath = "/upload/researchList/" + df.format(new Date()) + "/";
		String loadpath = MobileServerpath + savepath;
		File file1 = new File(loadpath);
		if (!file1.exists()) {
			file1.mkdirs();
		}
		try {
			InputStream is = file.getInputStream();
			OutputStream os = new FileOutputStream(loadpath + filename);
			int len = 0;
			byte[] buffer = new byte[400];
			while ((len = is.read(buffer)) != -1) {
				os.write(buffer, 0, len);
			}
			is.close();
			os.close();
			Map map = new HashMap<String, Object>();
			map.put("filename", filename);
			map.put("loadpath", savepath + filename);
			return ResponseData.success(map);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new ParamException("上传失败");
		}
	}

	// 导入完成
	@RequestMapping(value = "/importQuestion", method = RequestMethod.POST)
	public Object importQuestion(@RequestBody String jsonData, HttpServletRequest req) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		ImportExcelUtil icl = new ImportExcelUtil();
		Map m = icl.importExamData(map, Dao);
		if ("0".equals(m.get("retCode"))) {
			return ResponseData.success(m);
		} else {
			throw new ParamException(m.toString());
		}
	}

	// 问卷详情
	@RequestMapping(value = "/getInversDetail", method = RequestMethod.POST)
	public Object getInversDetail(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_INVERTIGATE_DETAIL", map);
		return ResponseData.success(map);
	}

	// 获取问卷调查问题
	@RequestMapping(value = "/getInversPaper", method = RequestMethod.POST)
	public Object getInversPaper(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_INVERTIGATE_PAPER", map);
		return ResponseData.success(map);
	}

	// 编辑问卷
	@RequestMapping(value = "/updateInversPaper", method = RequestMethod.POST)
	public Object updateInversPaper(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.UPDATE_INVERTIGATE_PAPER", map);
		return ResponseData.success(map);
	}
}
