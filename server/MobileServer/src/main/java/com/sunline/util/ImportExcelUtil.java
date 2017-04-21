package com.sunline.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.util.ClassUtils;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.sunline.dao.impl.DaoSupport;


public class ImportExcelUtil {
    static final String RETCODE = "retCode";
    static final String ERRORCODE = "-1";
    static final String RETMSG = "retMsg";

    public Map importExamData(Map<String, Object> map,  DaoSupport Dao) throws Exception {
        // String tranSeq = (String) map.get("tranSeq");
		RequestAttributes ra = RequestContextHolder.getRequestAttributes();
		ServletRequestAttributes sra = (ServletRequestAttributes) ra;
		HttpServletRequest request = sra.getRequest();
		HttpSession session = request.getSession();
		String id = session.getId();
		String userid = (String) session.getAttribute("userid");
		
        String filepath = (String) map.get("filePath"); // /upload/20170405/template.xls
        String loadpath = filepath.substring(0, 17);
        String filename = filepath.substring(17);
        // String userid = (String) ((Map)
        // (ActionContext.getContext().getSession().get(CommonKey.LOGINED_USER))).get("_userid");
        String path = ClassUtils.getDefaultClassLoader().getResource("").getPath();
        int a = path.indexOf("MobileServer");
        String b = path.substring(1, a + 13);
        // 上传之后的表格的全路径
        String filePath = b + loadpath + filename;

        // String filePath =
        // ServletActionContext.getServletContext().getRealPath("//") +
        // "//upload//" + tranSeq + "//"+ userid + "/" + filename;
        String textName = filename.substring(0, filename.indexOf(".")) + ".txt";
        String outPutPath = b + loadpath + textName;
        // String outPutPath =
        // ServletActionContext.getServletContext().getRealPath("//") +
        // "//upload//" + tranSeq + "//"+ userid + "/" + textName;
        Workbook wb = null;
        try {
            if (filePath.endsWith("xlsx"))
                wb = new XSSFWorkbook(new FileInputStream(filePath));
            else if (filePath.endsWith("xls"))
                wb = new HSSFWorkbook(new FileInputStream(filePath));
        } catch (Exception e) {
            Log4j2Util.error(this, "表格解析异常", e);
        }
        Sheet sheet = wb.getSheetAt(0);
        int rownum = sheet.getLastRowNum();
        LinkedList<Map<String, Object>> list = new LinkedList<Map<String, Object>>();
        Map<String, Object> question_info = null;
        List<String> options = null;
        for (int i = 0; i <= rownum; i++) {
            Row row = sheet.getRow(i);
            if (row != null) {
                Cell cell = row.getCell(0);
                if (cell != null && cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
                    if (question_info != null) {
                        if (((LinkedList<String>) question_info.get("options")).size() == 0) {
                            map.put(RETCODE, ERRORCODE);
                            map.put(RETMSG, "题目【" + question_info.get("question") + "】没有输入选项，请查证");
                            break;
                        }
                        list.add(question_info);
                    }
                    question_info = new HashMap<String, Object>();
                    options = new LinkedList<String>();
                    String type = ExcelReadUtils.getCellValue(row.getCell(1));
                    String question = ExcelReadUtils.getCellValue(row.getCell(2));
                    String answer = ExcelReadUtils.getCellValue(row.getCell(3));
                    if ("".equals(type)) {
                        map.put(RETCODE, ERRORCODE);
                        map.put(RETMSG, "第" + (i + 1) + "行中的题目类型未输入，请查证");
                        break;
                    } else if ("".equals(question)) {
                        map.put(RETCODE, ERRORCODE);
                        map.put(RETMSG, "第" + (i + 1) + "行中的题目内容未输入，请查证");
                        break;
                    } else if ("".equals(answer)) {
                        map.put(RETCODE, ERRORCODE);
                        map.put(RETMSG, "第" + (i + 1) + "行中的答案未输入，请查证");
                        break;
                    }
                    question_info.put("type", type);
                    question_info.put("question", question);
                    question_info.put("answer", answer);
                    question_info.put("options", options);
                } else {
                    if (question_info != null) {
                        String option = ExcelReadUtils.getCellValue(row.getCell(2));
                        if ("".equals(option)) {
                            map.put(RETCODE, ERRORCODE);
                            map.put(RETMSG, "第" + (i + 1) + "行中的选项未输入，请查证");
                            break;
                        }
                        options.add(option);
                    }
                }
            }
        }
        list.add(question_info);
        if (!map.containsKey(RETCODE)) {
            if (list.size() > 0 && list.get(0) != null) {
                boolean success = insertToDataBase(list, outPutPath, userid, Dao);
                if (success) {
                    map.put(RETCODE, "0");
                    map.put("url", loadpath + textName);
                } else {
                    map.put(RETCODE, ERRORCODE);
                    map.put(RETMSG, "导入数据库发生异常");
                }
            } else {
                map.put(RETCODE, ERRORCODE);
                map.put(RETMSG, "导入的Excel数据为空，请检查上传的文件格式是否正确");
            }
        }
        return map;

    }

    private boolean insertToDataBase(List list, String filePath, final String userid, DaoSupport Dao) throws Exception {
        StringBuffer success = new StringBuffer();
        StringBuffer invalid = new StringBuffer();
        StringBuffer already = new StringBuffer();
        StringBuffer other = new StringBuffer();
        boolean finish = false;
        for (int i = 0; i < list.size(); i++) {
            Map data = (Map) list.get(i);
            data.put("userid", userid);
            LinkedList<String> options = (LinkedList<String>) data.get("options");
            String options_string = "";
            for (int k = 0; k < options.size(); k++) {
                options_string = options_string + options.get(k).trim();
                if (k != options.size() - 1)
                    options_string = options_string + "^";
            }
            data.put("options",
                    options_string.replace("A、", "").replace("B、", "").replace("C、", "").replace("D、", "")
                            .replace("E、", "").replace("A.", "").replace("B.", "").replace("C.", "").replace("D.", "")
                            .replace("E.", ""));
            Dao.findForMap("MobileServerMapper.USER_QUESTION_IMPORT", data);
            // Map result = (Map)
            // RuntimeUtils.execFlow("sunline.subsystem.vta.product.user.flow.import_question.bpl",
            // data)[0];
            Map result = data;
            String retcode = (String) result.get("retCode");
            if ("0".equals(retcode)) {
                success.append(data.toString() + "\n");
            }
            if ("1001".equals(retcode)) {
                already.append(data.toString() + "\n");
            } else if ("1002".equals(retcode)) {
                invalid.append(data.toString() + "\n");
            } else {
                other.append(data.toString() + "\n");
            }
        }
        String out = "成功记录:\n" + success.toString() + "\n已存在未导入的记录：\n" + already.toString() + "\n因用户信息非法未导入的记录:\n"
                + invalid.toString() + "\n其他错误记录:\n" + other.toString();

        try {
            FileUtils.writeStringToFile(new File(filePath), out);
            Map<String, String> data = new HashMap<String, String>();
            data.put("userid", userid);
            Dao.findForMap("MobileServerMapper.QUERY_USER_IMPORT_DATA", data);
            // Map result = (Map)
            // RuntimeUtils.execFlow("sunline.subsystem.vta.product.user.flow.query_data.bpl",
            // data)[0];
            Map result = data;
            String userno = (String) result.get("userno");
            int scores = Integer.parseInt((String) result.get("scores"));
            if (scores > 0) {
                String content = "感谢您为WeCom贡献题目，您本次";
                if (scores > 4) {
                    content = content + "共成功贡献了" + scores + "道题目";
                } else {
                    content = content + "贡献获得了" + scores * 5 + "积分";
                }
                data.put("sendtp", "3");
                data.put("tartid", userno);
                data.put("title", "消息通知");
                data.put("remark", content);
                HttpRequest.sendMessage(data, Dao);
            }
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

}
