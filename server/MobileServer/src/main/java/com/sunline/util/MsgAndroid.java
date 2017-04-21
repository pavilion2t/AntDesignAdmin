package com.sunline.util;

import cn.jiguang.common.resp.APIConnectionException;
import cn.jiguang.common.resp.APIRequestException;
import cn.jpush.api.JPushClient;
import cn.jpush.api.push.PushResult;
import cn.jpush.api.push.model.Platform;
import cn.jpush.api.push.model.PushPayload;
import cn.jpush.api.push.model.audience.Audience;
import cn.jpush.api.push.model.notification.Notification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

public class MsgAndroid {
	
	//private static final String appKey ="0767b6ceb66160ced65b50cf";
	//private static final String masterSecret = "785b94613ff7b072ca3c2195";
	private static final String appKey ="74d1b7f56186c3bd43f5ac6b";
	private static final String masterSecret = "be936943ed9d2d22b4f770bc";
	 protected static final Logger LOG = LoggerFactory.getLogger(MsgAndroid.class);
	
	private static JPushClient jpushClient;
	
	public static  void getJPushClient(){
		if (jpushClient==null){
			synchronized(JPushClient.class){
			if (jpushClient==null){
					jpushClient = new JPushClient(masterSecret, appKey);
				}
			}
			
		}
		//return jpushClient;
	}
	
	public static void pushMsg(String token,String alert,String title,Map map){
		  // For push, all you need do is to build PushPayload object.
		
		getJPushClient();
        PushPayload payload = buildPushObject_all_all_alert(token,alert,title,map);
//        PushPayload payload = buildPushObject_android_and_ios();
        try {
            PushResult result = jpushClient.sendPush(payload);
            LOG.info("Got result - " + result);
            
        } catch (APIConnectionException e) {
            LOG.error("Connection error. Should retry later. ", e);
            
        } catch (APIRequestException e) {
            LOG.error("Error response from JPush server. Should review and fix it. ", e);
            LOG.info("HTTP Status: " + e.getStatus());
            LOG.info("Error Code: " + e.getErrorCode());
            LOG.info("Error Message: " + e.getErrorMessage());
            LOG.info("Msg ID: " + e.getMsgId());
        }catch(Exception e){
        	LOG.info("Msg ID: " + e.getMessage());
        }
	}
	
	public static PushPayload buildPushObject_all_all_alert(String token,String alert,String title,Map map) {
//	    return PushPayload.alertAll(ALERT);
/*		Map<String, String>map = new HashMap<String, String>();
		map.put("trantp", "03");
		map.put("_pendMsg", "true");
		map.put("_appInBackground", "false");
		map.put("envesq", "123123");*/
		System.out.println("token是"+token);
		System.out.println("alert是"+alert);
		System.out.println("title是"+title);
		System.out.println("map是"+map);
		Audience.registrationId(token);
		 return PushPayload.newBuilder()
	                .setPlatform(Platform.all())
	                .setAudience(Audience.registrationId(token))
//	                .setNotification(Notification.alert(ALERT))
	                .setNotification(Notification.android(alert, title, map))
	                .build();
	}
	
	
	public static void main(String[] args) {
		pushMsg( "1a0018970aab3518b0a", "测试","给你发钱了",null);
		//pushMsg( "140fe1da9ea8b5f56c3", "测试","给你发钱了",null);
	}

}
