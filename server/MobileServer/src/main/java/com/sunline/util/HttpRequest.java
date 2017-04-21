package com.sunline.util;

import com.sunline.dao.impl.DaoSupport;
import com.sunline.exception.ParamException;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import java.util.Map;

public class HttpRequest {
	private static final Logger LOG = LogManager.getLogger(HttpRequest.class);

	public static Map sendMessage(Map data, DaoSupport Dao) throws Exception {
		data.put("mesgtp", "46");
		Map result = HttpRequest.sendToServer(data, Dao);
		return result;
	}

	public static Map sendToServer(Map param, DaoSupport Dao) throws Exception {
		Dao.findForMap("MobileServerMapper.user_sendmsg", param);
		MsgSend.sendToAll(param);
		return param;
	}

	// public static Map rewardUser(Map data) {
	// String prcscd = "reward/user/award";
	// Map result = HttpRequest.sendToServer(prcscd, data);
	// return result;
	// }
	//
	// public static Map getUserid(Map data, HttpServletRequest request) {
	// String userid = (String) request.getSession().getAttribute("userid");
	// data.put("userid", userid);
	// return data;
	// }
}
