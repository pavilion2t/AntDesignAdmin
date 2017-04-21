package com.sunline.util;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.Resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.notnoop.apns.APNS;
import com.notnoop.apns.ApnsDelegate;
import com.notnoop.apns.ApnsNotification;
import com.notnoop.apns.ApnsService;
import com.notnoop.apns.ApnsServiceBuilder;
import com.notnoop.apns.DeliveryError;
import com.notnoop.exceptions.InvalidSSLConfig;

public class PushUtils {
	private static final Log log = LogFactory.getLog(PushUtils.class);
	
	private static boolean isRun = false;
	private static ApnsServiceBuilder apnsServiceBuilder;
	private static ApnsService svc;
	private static PushUtils instance;
	
	private static Resource certificatePath;
	private static String password;
	private static boolean isProduce = true;
	private static final ApnsDelegate delegate = new ApnsDelegate() {
        public void messageSent(final ApnsNotification message, final boolean resent) {
            log.info("Sent message " + message + " Resent: " + resent);
        }
        public void messageSendFailed(final ApnsNotification message, final Throwable e) {
            log.info("Failed message " + message);
        }
        public void connectionClosed(final DeliveryError e, final int messageIdentifier) {
            log.info("Closed connection: " + messageIdentifier + "\n   deliveryError " + e.toString());
        }
        public void cacheLengthExceeded(final int newCacheLength) {
            log.info("cacheLengthExceeded " + newCacheLength);
        }
        public void notificationsResent(final int resendCount) {
            log.info("notificationResent " + resendCount);
        }
    };
	private PushUtils(){
		if(certificatePath == null || password == null){
			throw new IllegalArgumentException("Use the PushUtils should call the initPushUtils method for the first time");
		}
		apnsServiceBuilder = APNS.newService();
		try {
			apnsServiceBuilder.withAppleDestination(isProduce)
							  .withCert(certificatePath.getInputStream(), password)
							  .withDelegate(delegate);
			svc = apnsServiceBuilder.build();
		} catch (InvalidSSLConfig e) {
			e.printStackTrace();
		} catch (IOException e){
			e.printStackTrace();

		}
	}
	/**
	 * 
	 * @param certPath 证书路径
	 * @param pwd 	密码
	 * @param isProduce 是否通过生产APNS推送
	 */
	public static void initPushUtils(Resource certPath, String pwd, boolean isProduce){
		certificatePath = certPath;
		password = pwd;
		if(instance != null){
			instance = new PushUtils();
		}
	}
	private static synchronized void init(){
		if(instance == null){
			instance = new PushUtils();
		}
	}
	private static void startService(){
		if(isRun){
			return;
		}
		svc.start();
		isRun = true;
	}
	public static void stopService(){
		init();
		svc.stop();
		isRun = false;
	}
	public static void pushMsg(String token, String msgText, int badgeNumber, Map<String, String> extrInfo){
		try{
			init();
			startService();
			String payload = packageMsg(msgText, badgeNumber, extrInfo);
			svc.push(token, payload);
		}catch(Exception e){
			log.info("send message error：" + e.getMessage());
		}
	}
	
	private static String packageMsg(String msgBody, int badge, Map<String, String> extrInfo){
		String payload = null;
		Map<String, Object> root = new HashMap<String, Object>();
		Map<String, Object> aps = new HashMap<String, Object>();
		Map<String, Object> alert = new HashMap<String, Object>();
		if(extrInfo != null){
			aps.putAll(extrInfo);
		}
		alert.put("body", msgBody);
		aps.put("alert", msgBody);
		aps.put("badge", badge);
		aps.put("sound", "default");
		root.put("aps", aps);
		ObjectMapper mapper = new ObjectMapper();
		try {
			payload = mapper.writeValueAsString(root);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		log.info("send msg payload：" + payload);
		return payload;
	}
	
}
