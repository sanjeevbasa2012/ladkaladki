package com.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.action.ConnectionManager;
import com.action.ResultsetToJson;

/**
 * Servlet implementation class getJSONServlet
 */
@WebServlet("/getJSONServlet")
public class getJSONServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public getJSONServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
		//get the printwriter object from response to write the json object to the output stream
		PrintWriter writer = response.getWriter();
				
		String dbSource = "";
		String dbProcName = "";
		String inputParams = "";
		//String outputParams = "";
		
		
		String dynCallProcArguments = "";
		JSONObject jsonObjectResultSet = new JSONObject();
		List<procVO> paramList = new ArrayList<procVO>();
		
		/* Connect to database and return the resultset */
		Connection dbConn = null;
		ResultSet rs = null;
		CallableStatement procStmt = null;
		String dynCallProc = "";
		
		dbSource = request.getParameter("dataSource").toString();
		dbProcName = request.getParameter("procName").toString();
		inputParams = request.getParameter("inputParam").toString();
		//outputParams = request.getParameter("outputParam").toString();

		System.out.println("data Source Name:"+dbSource);
		System.out.println("Procedure Name:"+dbProcName);
		System.out.println("Input Parameters:"+inputParams);
		//System.out.println("Output Parameters:"+outputParams);

		//Parse the String as JSON object,
		// Extract the JSON object inputParams and dynamically create the 
		// prepare statement
		if (inputParams.length()> 0) {
			JsonParser parser = new JsonParser();
			JsonElement jsonElement = parser.parse(inputParams);
			JsonArray jsonArr = jsonElement.getAsJsonArray();
	
			//Extract the data from JSON Array using GSON library
			Gson gson = new Gson();
			for (JsonElement aElement: jsonArr) {			
				procVO jsonParam = gson.fromJson(aElement, procVO.class);
				paramList.add(jsonParam);
			}
			
			System.out.println(paramList.size());
			// Dynamically create the procedure argument list
			// based on the number input parameters
			for (int i=0; i<paramList.size(); i++) {
				procVO valueObj = new procVO();
				valueObj = paramList.get(i);				
				System.out.println(valueObj.toString());
				if (i == 0 ) {
					dynCallProcArguments = "?";
				} else {
					dynCallProcArguments = dynCallProcArguments+",?";
				}
			}
			dynCallProcArguments = "("+dynCallProcArguments+")";  // ENCLOSE ARGUMENTS IN BRACKET
			
			System.out.println("dynCallProcArguments="+dynCallProcArguments );
			
		} // End of, if (inputParams.length()> 0) 
		

		try {	
			//Connect to the database;
			dbConn = ConnectionManager.getConnection(dbSource);

			System.out.println("Connection successful");
			
			//Construct the Call statement and set the prepareCall statement
			//e.g. {Call ProcedureName(?,?)}
			dynCallProc = "{ Call "+dbProcName+dynCallProcArguments+" }";
			
			//set the parameter to the call statement,
			//based on the arguments passed in the inputparams
			procStmt = dbConn.prepareCall(dynCallProc);
			
			//Set the parameter list
			for (int i=0; i<paramList.size(); i++) {
				procVO valueObj = new procVO();
				valueObj = paramList.get(i);	
				System.out.println("Parameter "+i+":"+valueObj.toString() );
				if (valueObj.getParameterType().equalsIgnoreCase("Number") ) {
					
					procStmt.setInt(i+1, Integer.parseInt(valueObj.getParameter()  ) );
				}

				if (valueObj.getParameterType().equalsIgnoreCase("VARCHAR") ) {
					procStmt.setString(i+1, valueObj.getParameter());
				}
				

			}
			
			//Execute the stored procedure
			rs = procStmt.executeQuery();
			
			// Convert the resultset to JSON 
			jsonObjectResultSet = ResultsetToJson.convertToJSON(rs);	
			
			// Output the JSON object array List
			writer.print(jsonObjectResultSet);
			writer.flush();
			
			
		} catch (SQLException sqle) {
			// TODO Auto-generated catch block
			System.out.println("SQL Exception:"+sqle.getMessage());
			sqle.printStackTrace();
		} catch (Exception e) {
				// TODO Auto-generated catch block
			System.out.println("Exception:"+e.getMessage());
			e.printStackTrace();
		} finally {
			try {
				if (rs != null) {
					rs.close();				
				}
                if (procStmt != null) {
                	procStmt.close();
                }
                if (dbConn != null) {
                	dbConn.close();
                }
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}		

	}

}
