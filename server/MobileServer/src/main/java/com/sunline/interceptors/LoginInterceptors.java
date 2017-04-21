package com.sunline.interceptors;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.sunline.util.JedisUtil;
import com.sunline.util.JwtUtils;
import com.sunline.util.Log4j2Util;

import redis.clients.jedis.Jedis;

public class LoginInterceptors implements HandlerInterceptor {

    @Autowired
    JwtUtils jwtUtil;

    @Autowired
    JedisUtil jedisUtil;


    @Override
    public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
            throws Exception {
        // TODO Auto-generated method stub

    }

    @Override
    public void postHandle(HttpServletRequest req, HttpServletResponse res, Object arg2, ModelAndView arg3)
            throws Exception {

    }

    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object arg2) throws Exception {
        res.setCharacterEncoding("utf-8");
        res.setContentType("application/json; charset=utf-8");
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("code", 401);
        map.put("message", "登录失效，请重新登录");
        String jwtString = "";
        try {
            jwtString = req.getHeader("token");
        } catch (Exception e) {
            Log4j2Util.error(this,"获取头部token失败", e);
            map.put("message", "请提供token");
        }
        String userid = null;
        if (jwtString != null && !"".equals(jwtString))
            userid = jwtUtil.decodeJwtString(jwtString);
        Boolean b = true;
        if (userid == "" || userid == null) {
            b = false;
        } else {
            req.getSession().setAttribute("userid",userid);
            String sessionName = JedisUtil.SESSION;
            Jedis jedis = jedisUtil.getClient().getResource();
            try {
                b = jedis.hexists(sessionName, jwtString);
            } finally {
                if (jedis != null)
                    jedis.close();
            }
        }

        if (!b) {
            res.getWriter().println(JSON.toJSONString(map));
        }
        return b;

    }
}
