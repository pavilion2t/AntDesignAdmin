package com.sunline.util;


import org.apache.commons.lang3.StringUtils;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPubSub;

public class KeyExpiredListener extends JedisPubSub {

	@Override
	public void onPSubscribe(String pattern, int subscribedChannels) {
		System.out
				.println("onPSubscribe " + pattern + " " + subscribedChannels);
	}

	@Override
	public void onPMessage(String pattern, String channel, String message) {
		if (StringUtils.contains(channel, "expired")) {
			if (StringUtils.startsWith(message, JedisUtil.REDPACKKEY)) {
				String redPackId = StringUtils.substring(message, -20);
				String mode = message;
				mode = mode.replaceAll(redPackId, "").replaceAll(JedisUtil.REDPACKKEY, "");
				/*if (StringUtils.equals(mode, Settings.getString("MODE", ""))) {
					RedPackBizlet.returnRedPack(redPackId);
					Jedis jedis = JedisUtil.getClient().getResource();
					try {
						jedis.del(JedisUtil.FETCHEDUSERKEY + mode + redPackId);
					} finally {
						if (jedis != null) {
							jedis.close();
						}
					}
				}*/
			}
		}
	}

}