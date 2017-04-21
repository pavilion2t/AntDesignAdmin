package com.sunline.service.backmanagement;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
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
import com.sunline.util.JsonUtils;
import com.sunline.util.PingYinUtil;

/**
 * @author HYP
 * @title 网点信息管理
 * @body
 * @date 2017年3月22日
 */
@RestController
@RequestMapping("/queryBranch")
public class queryBranch {
	@Autowired
	DaoSupport Dao;

	// 网点信息
	@RequestMapping(value = "/brchQuery", method = RequestMethod.POST)
	public Object brchQuery(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_BRANCH_INFO", map);
		return ResponseData.success(map);
	}

	// 修改网点基本信息
	@RequestMapping(value = "/modifyBrch", method = RequestMethod.POST)
	public Object modifyBrch(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.MODIFY_BRANCH_INFO", map);
		return ResponseData.success(map);
	}

	// 人员配置新增
	@RequestMapping(value = "/saveBankUser", method = RequestMethod.POST)
	public Object saveBankUser(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		String result = PingYinUtil.getFirstSpellOnName(map.get("userna").toString());
		map.put("pingyna", result);
		Dao.findForMap("MobileServerMapper.SAVE_BANK_USER", map);
		return ResponseData.success(map);
	}

	// 人员配置删除
	@RequestMapping(value = "/deleteUser", method = RequestMethod.POST)
	public Object deleteUser(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		String userids=map.get("USERID").toString();
		String[] userid=userids.split(",");
		for(int i=0;i<userid.length;i++){
			map.put("USERID", userid[i]);
			Dao.findForMap("MobileServerMapper.VTAUSER_DELETEUSER", map);
		}
		if("0".equals(map.get("retCode"))){
			return ResponseData.success(map);
		}else{
			throw new ParamException(map.get("retParas").toString());
		}
	}

	// 设备配置
	@RequestMapping(value = "/getDeviceInfo", method = RequestMethod.POST)
	public Object getDeviceInfo(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_DEVICE_INFO", map);
		return ResponseData.success(map);
	}

	// 周边环境
	@RequestMapping(value = "/getAroundInfo", method = RequestMethod.POST)
	public Object getAroundInfo(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_BRANCH_AROUND_INFO", map);
		return ResponseData.success(map);
	}

	// 周边环境添加
	@RequestMapping(value = "/addAroundInfo", method = RequestMethod.POST)
	public Object addAroundInfo(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.ADD_BRANCH_AROUND_INFO", map);
		return ResponseData.success(map);
	}

	// 周边环境删除
	@RequestMapping(value = "/delAroundInfo", method = RequestMethod.POST)
	public Object delAroundInfo(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.DELETE_BRANCH_AROUND_INFO", map);
		return ResponseData.success(map);
	}

	// 周边环境编辑
	@RequestMapping(value = "/updateAroundInfo", method = RequestMethod.POST)
	public Object updateAroundInfo(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.UPDATE_BRANCH_AROUND_INFO", map);
		return ResponseData.success(map);
	}

	// 网点导览图
	@RequestMapping(value = "/getBranchImage", method = RequestMethod.POST)
	public Object getBranchImage(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		Dao.findForMap("MobileServerMapper.GET_BRANCH_IMAGE", map);
		return ResponseData.success(map);
	}

	// 网点导览图上传
	@RequestMapping(value = "/uploadBrchImage", method = RequestMethod.POST)
	public Object uploadBrchImage(@RequestParam("file") MultipartFile file, String brchno, HttpServletRequest req,
			HttpServletResponse res) throws Exception {
		res.setHeader("'Access-Control-Allow-Origin", "*");
		String filename = file.getOriginalFilename();
		String filenameend = filename.substring(filename.indexOf("."));// .png
		String path = ClassUtils.getDefaultClassLoader().getResource("").getPath();
		int begin = path.indexOf("MobileServer");
		String MobileServerpath = path.substring(1, begin + 13);
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");// 设置日期格式
		filename = df.format(new Date()) + ((int) (Math.random() * 100 + 1)) + filenameend;
		String temppath = "upload/temp/";
		String loadpath = MobileServerpath + temppath;
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
			map.put("loadpath", temppath + filename);
			return ResponseData.success(map);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new ParamException("上传失败");
		}
	}

	// 更新导览图
	@RequestMapping(value = "/updateBrchImage", method = RequestMethod.POST)
	public Object updateBrchImage(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		String brchno = map.get("brchno").toString();
		String filename = map.get("filename").toString();
		String path = ClassUtils.getDefaultClassLoader().getResource("").getPath();
		int begin = path.indexOf("MobileServer");
		String MobileServerpath = path.substring(1, begin + 13);
		File temp = new File(MobileServerpath + "upload/temp/" + filename);// 只代表一个对象，没有读写能力，所以需要一个InputStream
		File guidepath = new File(MobileServerpath + "upload/brchguide/" + brchno);
		if (!guidepath.exists()) {
			guidepath.mkdirs();
		}
		FileInputStream fis = null;
		FileOutputStream fos = null;
		try {
			fis = new FileInputStream(temp);
			fos = new FileOutputStream(MobileServerpath + "upload/brchguide/" + brchno + "/" + filename);
			byte[] buf = new byte[1024];
			int n = 0;// 记录实际读取的字节数
			while ((n = fis.read(buf)) != -1)// 循环读取
			{
				// 输出到指定文件
				fos.write(buf);
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new ParamException("拷贝图片失败");
		} finally {
			try {
				fis.close();
				fos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			if (temp.exists()) {
				temp.delete();
			}
		}
		map.put("url", "upload/brchguide/" + brchno + "/" + filename);
		Dao.findForMap("MobileServerMapper.UPDATE_BRANCH_IMAGE", map);
		return ResponseData.success(map);
	}
}
