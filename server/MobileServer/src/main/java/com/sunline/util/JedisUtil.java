package com.sunline.util;

import com.sunline.util.ExpireNoticeThread;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

@Component
public final class JedisUtil {

    private static JedisPool  client = null;
    public static String REDPACKKEY = "redPacklist";
    public static String FETCHEDUSERKEY = "fetchedUsers";
    public static String TODAYINFO = "todayInfo";
    public static String STARUSERS = "starUsers";
    public static String SESSION = "sessionInfo";
    public static int EXPIRE_TIME = 24*60*60+15*60;

    @Value("${redis.host}")
    private String redis_host;
    @Value("${redis.port}")
    private int redis_port;
    /**
     * 获取Jedis实例
     * @return
     */
    public  JedisPool getClient() {
        if (client == null) {
            client =  new JedisPool(new JedisPoolConfig(), redis_host,redis_port);
            ExpireNoticeThread thread = new ExpireNoticeThread(client);
            thread.start();
            return client;
        } else {
            return client;
        }
    }
}