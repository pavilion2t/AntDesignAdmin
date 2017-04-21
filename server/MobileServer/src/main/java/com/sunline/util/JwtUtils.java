package com.sunline.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtils {

	private final String USERID = "userid";

	@Value("${jwt.security}")
	private  String security;

	public  String generateJwtString(String userid){
		 try {
			 Base64.Encoder encoder = Base64.getEncoder();
			 userid = encoder.encodeToString(userid.getBytes("utf-8"));
			 Algorithm algorithm = Algorithm.HMAC256(security);
			    String token = JWT.create()
			        .withIssuedAt(new Date())
			        .withClaim(USERID, userid)
			        .sign(algorithm);
			    return token;
			} catch (UnsupportedEncodingException exception){
			    Log4j2Util.error(this,"生成JWT字符串时发生异常[变量不支持UTF8编码]：", exception);
			    return "";
			} catch (JWTCreationException exception){
			 	Log4j2Util.error(this,"生成JWT字符串时发生异常：", exception);
				return "";
			}
	}
    
    
	public String decodeJwtString(String jwtString){
		try {
		    Algorithm algorithm = Algorithm.HMAC256(security);
		    JWTVerifier verifier = JWT.require(algorithm)
		        .build(); //Reusable verifier instance
		    DecodedJWT jwt = verifier.verify(jwtString);
		    Claim claim = jwt.getClaim(USERID);
		    String userid = claim.asString();
			Base64.Decoder decoder = Base64.getDecoder();
			userid = new String(decoder.decode(userid), "UTF-8");
		    return userid;
		} catch (UnsupportedEncodingException exception){
			Log4j2Util.error(this,"验证JWT字符串时发生异常[变量不支持UTF8编码]：", exception);
		    return "";
		} catch (SignatureVerificationException exception){
			Log4j2Util.error(this,"验证JWT字符串时发生异常[未通过验证]：", exception);
			return "";
		} catch (Exception exception){
			Log4j2Util.error(this,"验证JWT字符串时发生异常[其他异常]：", exception);
			return "";
		}
	}
}
