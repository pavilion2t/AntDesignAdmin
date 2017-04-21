package com.sunline.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

public class ExcelValidUtils {
	/**
	 * 
	 * @param value
	 *            需要验证的值
	 * @param regListMap
	 *            多重验证的Map的List集合，Map中必须只包含 reg(对应正则表达式)和msg(验证不通过的错误信息)两个key值
	 * @return 验证通过返回 0，不通过返回对应map中msg存放的错误信息
	 */
	public static String validWithListMap(String value, List<Map<String, String>> regListMap) {
		for (Map<String, String> map : regListMap) {
			if (!value.matches(map.get("reg"))) {
				return map.get("msg");
			}
		}
		return "0";
	}

	/**
	 * 验证形同 2010-10-10格式的日期
	 * 
	 * @param dateString
	 * @return 验证通过返回0，否则返回对应的错误信息
	 */
	public static String validDate(String dateString) {
		String reg = "^(\\d{4})(-)(\\d{1,2})(-)(\\d{1,2})$";
		if (!dateString.matches(reg)) {
			return "日期格式应为：2014-12-12";
		}
		DateFormat dateFormat = DateFormat.getDateInstance();
		dateFormat.setLenient(false);
		try {
			dateFormat.parse(dateString);
		} catch (ParseException e) {
			return "日期內容不合法";
		}
		return "0";
	}
}
