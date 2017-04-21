package com.sunline.listener;

import com.sunline.util.PushUtils;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.core.io.Resource;

import java.io.*;
import java.net.URL;

public class ApplicationStartup implements ApplicationListener<ApplicationReadyEvent> {

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        ApplicationContext applicationContext = event.getApplicationContext();
        String env = applicationContext.getEnvironment().getActiveProfiles()[0];
        String certName = "wecomDG_prod.p12";
        String password  = "123456";
        if("dev".equals(env)){
            certName = "wecom2_APN.p12";
            password = "12345678";
        }
        Resource path = applicationContext.getResource("classpath:/cert/"+certName);
        PushUtils.initPushUtils(path,password,true);
    }
}