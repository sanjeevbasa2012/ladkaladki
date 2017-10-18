package com.action;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;


public class ResultsetToJson {
	
	@SuppressWarnings("unchecked")
	public static JSONObject convertToJSON (ResultSet rs) {
		//JSONArray
		JSONArray jsonArray = new JSONArray();
		try {
			while (rs.next()) {
				int colCount = rs.getMetaData().getColumnCount();
				JSONObject jsonObj = new JSONObject();
				for (int i=0; i< colCount; i++) {
					jsonObj.put(rs.getMetaData().getColumnLabel(i+1), rs.getObject(i+1));
				}
				jsonArray.add(jsonObj);
				
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		JSONObject jsonObj = new JSONObject();
		jsonObj.put("jsonResultSetData", jsonArray);
		//return jsonArray;
		return jsonObj;
		
	}

}
