package com.sunline.util;

import java.util.List;
import java.util.Map;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import com.sunline.service.backmanagement.sendMessage;
import com.sunline.util.PushUtils;

public class MsgSendThread implements Runnable {

	private List tokenList;
	private String title;
	private String msg;
	private Map extraMap;
	private static final Logger Log = LogManager.getLogger(MsgSendThread.class);

	public MsgSendThread(List tokenList, String title, String msg, Map extraMap) {
		super();
		this.tokenList = tokenList;
		this.title = title;
		this.msg = msg;
		this.extraMap = extraMap;
	}

	public MsgSendThread() {
		super();
	}

	@Override
	public void run() {
		Log.info("启动子线程发送消息");
		sendToUsers(tokenList, title, msg, extraMap);

	}

	public void sendToUsers(List tokenList, String title, String msg, Map extraMap) {
		if (tokenList == null) {
			return;
		}
		if (tokenList.size() == 0) {
			return;
		}
		for (int i = 0; i < tokenList.size(); i++) {
			Map map2 = (Map) tokenList.get(i);
			extraMap.put("userid", map2.get("USERID"));
			if (map2 == null || map2.get("LOGNTP") == null) {
				continue;
			}
			String token = (String) map2.get("LOGNTP");
			String device = (String) map2.get("DEVICE");
			if ("a".equals(device)) {
				MsgAndroid.pushMsg(token, msg, title, extraMap);
			} else if ("i".equals(device)) {
				PushUtils.pushMsg(token, msg, 0, extraMap);
			} else if (token != null) {
				if (token.length() > 60) {
					PushUtils.pushMsg(token, msg, 0, extraMap);
				} else {
					MsgAndroid.pushMsg(token, msg, title, extraMap);
				}
			}
		}
	}

	public List getTokenList() {
		return tokenList;
	}

	public void setTokenList(List tokenList) {
		this.tokenList = tokenList;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Map getExtraMap() {
		return extraMap;
	}

	public void setExtraMap(Map extraMap) {
		this.extraMap = extraMap;
	}

}
