package com.sunline.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.JSONSerializer;
import com.alibaba.fastjson.serializer.SerializeWriter;

import java.util.*;

/**
 * map和json的转为，解决了fastjson的冒号问题
 * 
 * @author huazhi
 * 
 */
public class JsonUtils {

	public static String obj2json(Object obj) {
		if (obj == null)
			return null;
		if (obj instanceof String) {
			return "_str_" + obj;
		}
		SerializeWriter out = new SerializeWriter();
		try {
			JSONSerializer serializer = new JSONSerializer(out);
			serializer.write(obj);
			return out.toString();
		} finally {
			out.close();
		}

	}

	public static Object json2obj(String json) {
		if (json == null)
			return null;
		if (json.trim().startsWith("{")) {
			return parse(JSONObject.parseObject(json));
		} else if (json.trim().startsWith("[")) {
			return parse(JSONArray.parseArray(json));
		} else {
			return json;
		}
	}

	public static String mapToJson(Map<String, Object> map) {
		SerializeWriter out = new SerializeWriter();
		try {
			JSONSerializer serializer = new JSONSerializer(out);
			serializer.write(map);
			return out.toString();
		} finally {
			out.close();
		}
	}

	public static String jsonEscape(String json) {
		String[] ESCAPE_CHARS = new String[] { "\'", "\r", "\n" };
		String[] REPLACE_CHARS = new String[] { "\\\'", "\\r", "\\n" };
		String ret = json;
		for (int i = 0; i < ESCAPE_CHARS.length; i++) {
			ret = ret.replaceAll(ESCAPE_CHARS[i], REPLACE_CHARS[i]);
		}
		return ret;
	}

	/**
	 * @param json
	 */
	private static Object parse(JSON json) {
		if (json instanceof JSONObject) {
			Map<String, Object> map = new HashMap<String, Object>();
			JSONObject jsonObject = (JSONObject) json;
			for (Object k : jsonObject.keySet()) {
				Object obj = jsonObject.get(k);
				if (obj instanceof JSON) {
					Object tmp = parse((JSON) obj);
					map.put(k.toString(), tmp);
				} else {
					map.put(k.toString(), obj);
				}
			}
			return map;
		} else if (json instanceof JSONArray) {
			List<Object> list = new ArrayList<Object>();
			JSONArray jsonArray = (JSONArray) json;
			Iterator<Object> it = jsonArray.iterator();
			while (it.hasNext()) {
				Object obj = it.next();
				if (obj instanceof JSON) {
					list.add(parse((JSON) obj));
				} else {
					list.add(obj);
				}
			}
			return list;
		}
		Log4j2Util.error(JsonUtils.class,"解析JSON字符串发生异常:===>[" + json + "]不是JSON对象!");
		return null;

	}

	public static Map<String, Object> parseJSON2Map(String jsonStr) {
		// 最外层解析
		JSONObject json = JSONObject.parseObject(jsonStr);
		return (Map<String, Object>) parse(json);
	}

	public static Map<String, Object> converByteToMap(byte[] bb) {

		String ss = new String(bb);
		ss = ss.substring(8);
		Map<String, Object> map = parseJSON2Map(ss);
		return map;

	}

}
