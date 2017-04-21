/**
 * 
 */
package com.sunline.util;

import org.apache.log4j.MDC;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.HashMap;
import java.util.Map;

/**
 * @author hfwang
 * 
 */
public class Log4j2Util {
	
	/** 日志最大输出文本串长度 40K */
	public static final int MAX_LOGTEXT_LENGTG = 40960;

	private static Map<Class<?>, Logger> loggers = new HashMap<Class<?>, Logger>();

	public static Logger getLogger(Object o) {
		Class<?> clazz = o.getClass();
		if (o instanceof Class<?>)
			clazz = (Class<?>) o;
		Logger logger = loggers.get(clazz);
		if (logger == null) {
			logger = LogManager.getLogger(clazz);
			loggers.put(clazz, logger);
		}
		Throwable t = new Throwable();
		StackTraceElement[] st = t.getStackTrace();
		if(st.length >= 3)
			MDC.put("location", st[2]); // 出错处的堆栈信息
		return logger;
	}
	
	private static String getOutputMessage(Object message) {
		String ret = message.toString();
		if (ret.length() > MAX_LOGTEXT_LENGTG)
			return ret.substring(0, MAX_LOGTEXT_LENGTG) + "......";
		return ret;
	}

	public static void debug(Object o, Object message) {
		getLogger(o).debug(getOutputMessage(message));
	}

	public static void debug(Object o, Object message, Throwable t) {
		getLogger(o).debug(getOutputMessage(message), t);
	}

	public static void error(Object o, Object message) {
		getLogger(o).error(getOutputMessage(message));
	}

	public static void error(Object o, Object message, Throwable t) {
		getLogger(o).error(getOutputMessage(message), t);
	}

	public static void fatal(Object o, Object message) {
		getLogger(o).fatal(getOutputMessage(message));
	}

	public static void fatal(Object o, Object message, Throwable t) {
		getLogger(o).fatal(getOutputMessage(message), t);
	}

	public static void info(Object o, Object message) {
		getLogger(o).info(getOutputMessage(message));
	}

	public static void info(Object o, Object message, Throwable t) {
		getLogger(o).info(getOutputMessage(message), t);
	}

	public static void trace(Object o, Object message) {
		getLogger(o).trace(getOutputMessage(message));
	}

	public static void trace(Object o, Object message, Throwable t) {
		getLogger(o).trace(getOutputMessage(message), t);
	}
}
