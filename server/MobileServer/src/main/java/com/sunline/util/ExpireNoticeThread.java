package com.sunline.util;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class ExpireNoticeThread extends Thread {

	private JedisPool pool;

	public ExpireNoticeThread(JedisPool pool) {
		this.pool = pool;
	}

	@Override
	public void run() {
		Jedis jedis = pool.getResource();
		jedis.psubscribe(new KeyExpiredListener(), "__key*__:*");
	}
}