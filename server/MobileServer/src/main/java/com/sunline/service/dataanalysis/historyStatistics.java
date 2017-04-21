package com.sunline.service.dataanalysis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunline.dao.impl.DaoSupport;

/**
 * @author HYP
 * @title 历史交易统计
 * @body
 * @date 2017年3月23日
 */
@RestController
@RequestMapping("/historyStatistics")
public class historyStatistics {
	@Autowired
	DaoSupport Dao;

}
