package com.sunline.interceptors;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.ClassUtils;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebMvc
public class WebAppConfigurer extends WebMvcConfigurerAdapter {

	@Bean
	LoginInterceptors LoginInterceptors() {
		return new LoginInterceptors();
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {

		registry.addInterceptor(LoginInterceptors()).addPathPatterns("/**").excludePathPatterns("/login","/upload/**");
		super.addInterceptors(registry);
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		// TODO Auto-generated method stub
		String path = ClassUtils.getDefaultClassLoader().getResource("").getPath();
		int a = path.indexOf("MobileServer");
		String MobileServerpath = path.substring(1, a + 13);
		MobileServerpath=MobileServerpath+"upload/";
		registry.addResourceHandler("/upload/**").addResourceLocations("file:"+MobileServerpath);
		super.addResourceHandlers(registry);
	}
}
