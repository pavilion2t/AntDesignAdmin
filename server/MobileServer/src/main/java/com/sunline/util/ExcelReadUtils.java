package com.sunline.util;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;

public class ExcelReadUtils {
	/**
	 * 顺序读取excel，需要读取的列与keys对应，每读取一行将根据提供的keys加入到行map中，并添加到list中。
	 * 
	 * @param filePath
	 *            读取文件的路径
	 * @param keys
	 *            每一列的key集合
	 * @param start_row_index
	 *            起始行 从0开始计数
	 * @param start_col_index
	 *            起始列 从0开始计数
	 * @param regMap
	 *            对应列key与其验证的List<Map>映射
	 * @return
	 */
	public static List<Map<String, String>> readExcelSeqToList(String filePath, List<String> keys, int start_row_index,
			int start_col_index, Map<String, List<Map<String, String>>> regMap) {
		List<Map<String, String>> dataList = new ArrayList<Map<String, String>>();
		try {
			HSSFWorkbook wb = new HSSFWorkbook(new FileInputStream(filePath));
			HSSFSheet sheet = wb.getSheetAt(0);
			int lastRowNum = sheet.getLastRowNum();
			HSSFRow row = null;
			String value = "";
			HSSFCell cell = null;
			for (int rowNum = start_row_index; rowNum < lastRowNum + 1; rowNum++) {
				Map<String, String> map = new HashMap<String, String>();
				row = sheet.getRow(rowNum);
				if (row == null) {
					continue;
				}
				boolean flag = false;
				for (int keyIndex = 0; keyIndex < keys.size(); keyIndex++) {
					String key = keys.get(keyIndex);
					cell = row.getCell(start_col_index + keyIndex);
					if (cell == null) {
						map.put(key, "");
						continue;
					}
					cell.setCellType(HSSFCell.CELL_TYPE_STRING);
					value = cell.getStringCellValue();
					value = value == null ? "" : value;
					value = value.trim();
					if (regMap != null && value != "") {
						List<Map<String, String>> regexItem = regMap.get(key);
						if (regexItem != null && regexItem.size() != 0) {
							// 验证不通过
							String validMsg = ExcelValidUtils.validWithListMap(value, regexItem);
							if (!validMsg.equals("0")) {
								Map<String, String> errorMsgMap = new HashMap<String, String>();
								String errorMsg = "第" + (rowNum + 1) + "行" + "、第" + (start_col_index + keyIndex + 1)
										+ "列输入有误；" + validMsg;
								errorMsgMap.put("error", errorMsg);
								dataList.add(errorMsgMap);
								return dataList;
							}
						}
					}
					if (!"".equals(value)) {
						flag = true;
					}
					map.put(key, value);
				}
				if (flag) {
					dataList.add(map);
				}
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return dataList;
	}

	/**
	 * 
	 * @param filePath
	 * @param keys
	 * @param start_row_index
	 *            标题行位置
	 * @param start_col_index
	 *            标题列位置
	 * @return
	 */
	public static void readExcelCroTo(String filePath, Map<String, Object> retData) {
		try {
			HSSFWorkbook wb = new HSSFWorkbook(new FileInputStream(filePath));
			HSSFSheet sheet = wb.getSheetAt(0);
			HSSFRow row = sheet.getRow(0);
			int colIndex = 1;
			int rowIndex = 1;
			HSSFCell cellTop = null;
			String valueTop = "";
			String valueLeft = "";
			String valueData = "";
			HSSFRow rowData = null;
			for (rowData = sheet.getRow(rowIndex); (rowData = sheet.getRow(rowIndex)) != null; rowIndex++) {
				valueLeft = getCellValue(rowData.getCell(0));
				if (valueLeft == null) {
					break;
				}
				colIndex = 1;
				for (cellTop = row.getCell(colIndex); (cellTop = row.getCell(colIndex)) != null; colIndex++) {
					valueTop = getCellValue(cellTop);
					valueData = getCellValue(rowData.getCell(colIndex));

				}
			}

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 
	 * @param cell
	 * @return
	 */
	public static String getCellValue(Cell cell) {
		String strCell = "";
		if (cell == null) {
			return strCell;
		}
		switch (cell.getCellType()) {
		case Cell.CELL_TYPE_STRING:
			strCell = cell.getStringCellValue();
			break;
		case Cell.CELL_TYPE_NUMERIC:
			strCell = new BigDecimal(cell.getNumericCellValue()).toString();
			break;
		case Cell.CELL_TYPE_BOOLEAN:
			strCell = String.valueOf(cell.getBooleanCellValue());
			break;
		case Cell.CELL_TYPE_BLANK:
			strCell = "";
			break;
		default:
			strCell = "";
			break;
		}
		if (strCell.equals("") || strCell == null) {
			return "";
		}
		return strCell.trim().replace("\n\r", "");
	}

	public static void main(String[] args) {
		String filePath = "data.xls";
		System.out.println(filePath.substring(0, filePath.indexOf(".")) + ".txt");
	}
}
