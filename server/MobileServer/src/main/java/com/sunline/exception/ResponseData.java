package com.sunline.exception;

public class ResponseData {
	
	private int code = 200;
	private String message;
	private Object data;

	public static ResponseData success(Object data) {
		return new ResponseData(data);
	}
	public ResponseData(Object data) {
		super();
		this.data = data;
	}

	public ResponseData() {
		super();
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

}