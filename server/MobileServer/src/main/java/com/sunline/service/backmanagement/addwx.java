package com.sunline.service.backmanagement;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
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

/**
 * @author HYP
 * @title 添加资讯
 * @body
 * @date 2017年3月24日
 */
@RestController
@RequestMapping("/addwx")
public class addwx {
	@Autowired
	DaoSupport Dao;

	// 文件上传
	@RequestMapping(value = "/fileUpload", method = RequestMethod.POST)
	public Object fileUpload(@RequestParam("file") MultipartFile file, HttpServletRequest req, HttpServletResponse res)
			throws Exception {
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
			map.put("loadpath", "/" + temppath + filename);
			return ResponseData.success(map);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new ParamException("上传失败");
		}

	}

	// 文件上传
	@RequestMapping(value = "/contentUpload", method = RequestMethod.POST)
	public Object contentUpload(@RequestParam("file") MultipartFile file, HttpServletRequest req,
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
			String ip = InetAddress.getLocalHost().getHostAddress();
			return "/" + temppath + filename;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new ParamException("上传失败");
		}
	}

	// 提交，有路径问题，以为存储过程没改，要自己截取
	@RequestMapping(value = "/artadd", method = RequestMethod.POST)
	public Object artadd(@RequestBody String jsonData) throws Exception {
		Map<String, Object> map = JsonUtils.parseJSON2Map(jsonData);
		String path = ClassUtils.getDefaultClassLoader().getResource("").getPath();
		int begin = path.indexOf("MobileServer");
		String MobileServerpath = path.substring(1, begin + 13);
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		String date = df.format(new Date());
		String loadpath = MobileServerpath + "upload/wx/" + date;
		File file1 = new File(loadpath);
		File file2 = null;
		if (!file1.exists()) {
			file1.mkdirs();
			// 创建文件
			loadpath = loadpath + "/" + date + ".html";
			file2 = new File(loadpath);
			try {
				file2.createNewFile();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				throw new ParamException("创建HTML失败");
			}
		}
		FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(file2);
			// 把contet写入到html
			String contet = map.get("contet").toString();
			fos.write(contet.getBytes());
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
			throw new ParamException("写入HTML失败");
		} finally {
			fos.close();
		}

		// 把临时图片文件拷贝到wx下
		File temp = new File(MobileServerpath + "upload/temp");
		if (temp.isDirectory()) {
			File lists[] = temp.listFiles();
			for (int i = 0; i < lists.length; i++) {
				File tempimg = new File(lists[i].toString());
				FileInputStream fis = null;
				FileOutputStream foss = null;
				try {
					fis = new FileInputStream(tempimg);
					foss = new FileOutputStream(MobileServerpath + "upload/wx/" + date + "/" + lists[i].getName());
					byte[] buf = new byte[1024];
					int n = 0;// 记录实际读取的字节数
					while ((n = fis.read(buf)) != -1)// 循环读取
					{
						// 输出到指定文件
						foss.write(buf);
					}
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					throw new ParamException("拷贝图片失败");
				} finally {
					fis.close();
					foss.close();
					if (tempimg.exists()) {
						tempimg.delete();
					}
				}
			}
		}
		String imagename = map.get("image").toString();
		map.put("image", "/upload/wx/" + date + "/" + imagename);
		map.put("contet", "/upload/wx/" + date + "/" + date + ".html");
		Dao.findForMap("MobileServerMapper.article_add", map);
		map.put("path", "/upload/wx/" + date + "/" + date + ".html");
		return ResponseData.success(map);
	}

	// 删除临时文件
	@RequestMapping(value = "/tempdelete", method = RequestMethod.POST)
	public Object tempdelete() throws Exception {
		String path = ClassUtils.getDefaultClassLoader().getResource("").getPath();
		int begin = path.indexOf("MobileServer");
		String MobileServerpath = path.substring(1, begin + 13);
		String tempimg = MobileServerpath + "upload/temp";
		File temp = new File(tempimg);
		if (temp.isDirectory()) // 判断是否存在
		{
			File lists[] = temp.listFiles();
			for (int i = 0; i < lists.length; i++) {
				if (lists[i].exists()) {
					lists[i].delete();
				}
			}
		}
		return ResponseData.success("");
	}
}
