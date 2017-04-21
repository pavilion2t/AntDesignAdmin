package com.sunline.aop;

import com.sunline.exception.GlobalException;
import com.sunline.util.JsonUtils;
import com.sunline.util.Log4j2Util;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

@Aspect
@Component
public class WebLogAspect {
	ThreadLocal<Long> startTime = new ThreadLocal<>();

	@Pointcut("execution(public * com.sunline.service..*.*(..))")
	public void webLog() {
	}

	@Before("webLog()")
	public void doBefore(JoinPoint joinPoint) throws Throwable {
		startTime.set(System.currentTimeMillis());
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        // 记录下请求内容
		Log4j2Util.info(this,"===============请求Begin===============");
        Log4j2Util.info(this,"请求地址: " + request.getRequestURL().toString());
        Log4j2Util.info(this,"请求方式: " + request.getMethod());
        Log4j2Util.info(this,"请求IP: " + request.getRemoteAddr());
        Log4j2Util.info(this,"请求处理类: " + joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName());
        Log4j2Util.info(this,"请求参数: " + Arrays.toString(joinPoint.getArgs()));
	}

	@AfterReturning(returning = "ret", pointcut = "webLog()")
	public void doAfterReturning(Object ret) throws Throwable {
		// 处理完请求，返回内容
		Log4j2Util.info(this,"请求正常返回: " + JsonUtils.obj2json(ret));
		Log4j2Util.info(this,"处理时长(ms): " + (System.currentTimeMillis() - startTime.get()));
		Log4j2Util.info(this,"===============请求End===============");
	}
	
	@AfterThrowing(pointcut = "webLog()", throwing = "error")
	public void afterThrowing(JoinPoint joinPoint, Throwable error) {
		if(error instanceof GlobalException){
			Log4j2Util.info(this,"请求参数存在问题: " + error.getMessage());
		}else {
			String ret = JsonUtils.obj2json(error);
			Log4j2Util.info(this,"请求返回未捕获异常，需要检查服务端相关代码======》: " + JsonUtils.obj2json(ret));
		}
		Log4j2Util.info(this,"处理时长(ms): " + (System.currentTimeMillis() - startTime.get()));
		Log4j2Util.info(this,"===============请求End===============");
	}
}