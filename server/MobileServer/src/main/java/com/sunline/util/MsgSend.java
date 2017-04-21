package com.sunline.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MsgSend {

	// 向所有人发送消息
	public static void sendToAll(Map map) {
		if (map.get("listnm") == null || map.get("remark") == null) {
			return;
		}
		List list = (List) map.get("listnm");
		HashMap extMap = new HashMap();
		String msg = (String) map.get("remark");
		if (list != null && list.size() > 0) {
			MsgSendThread mt = new MsgSendThread(list, "", msg, extMap);
			Thread t = new Thread(mt);
			t.start();
		}

	}
}
