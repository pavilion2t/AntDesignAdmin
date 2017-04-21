package com.sunline.exception;

import com.sunline.util.Log4j2Util;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.NoHandlerFoundException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@ControllerAdvice
public class GlobalExceptionHandler {
	

	@ExceptionHandler(value = {GlobalException.class,Exception.class})
	@ResponseBody
	public ResponseData jsonErrorHandler(HttpServletRequest req, HttpServletResponse res, Exception e) throws Exception {
		int errorCode = 500;
		String errorMessage = "服务器处理请求时发生的异常，请与后台开发人员联系";
		if (e instanceof GlobalException){
			errorCode = ((GlobalException) e).getCode();
			errorMessage = e.getMessage();
		}
		ResponseData r = new ResponseData();
		r.setMessage(errorMessage);
		r.setCode(errorCode);
		r.setData(null);
		Log4j2Util.error(this,"发生错误啦：", e);
		return r;
	}
	@ExceptionHandler(value = {NoHandlerFoundException.class})
	@ResponseBody
	public ResponseData ErrorHandler(HttpServletRequest req, HttpServletResponse res, NoHandlerFoundException e) throws Exception {
		res.addHeader("Access-Control-Allow-Origin", "*");
		int errorCode = 404;
		String errorMessage = "未找到请求["+e.getRequestURL()+"]对应的处理逻辑，请查证Url是否正确";
		ResponseData r = new ResponseData();
		r.setMessage(errorMessage);
		r.setCode(errorCode);
		r.setData(null);
		return r;
	}
}