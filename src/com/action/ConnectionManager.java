package com.action;

import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;



public class ConnectionManager {

	private static Connection conn = null;
	
	//disable access to constructor
	private ConnectionManager() {
		
	}
	
	public static Connection getConnection(String dbName) {
		//If instance has not been created yet, create on
		initConnection(dbName);
		/*
		if (ConnectionManager.conn == null) {
			initConnection(dbName);
		} else {
			try {
				System.out.println(conn.isClosed());
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		*/
		return ConnectionManager.conn;
	}
	
	
	// private method to get the connection
	private static void initConnection(String dbName) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			//eg. jdbc:mysql://mydbinstance.abcdefghijkl.us-east-1.rds.amazonaws.com:3306/employees?user=sa&password=mypassword
				
			 
			//Uncomment these for local host		
			//String url = "jdbc:mysql://localhost/"+dbName;
		    
			/*
			String userName = "root";
			String userPwd = "";
			String hostname ="localhost";
			String port="3306";
			*/
			
			
			String hostname = "kkdbinstance.chjo6kcikqdh.us-west-2.rds.amazonaws.com";
			String userName = "aryan"; 
			String userPwd = "ss011809"; 
			String port = "3306";
		    	
			//String url = "jdbc:mysql://"+hostname+":"+port+"/"+dbName;
			
			//ConnectionManager.conn = DriverManager.getConnection(url, userName, userPwd);	
			
			String url = "jdbc:mysql://"+hostname+":"+port+"/"+dbName+"?user="+userName+"&password="+userPwd;
			System.out.println(url);
			ConnectionManager.conn = DriverManager.getConnection(url);

		} 
		catch (ClassNotFoundException cse) {
			System.out.println("Class not found exception :"+cse.getMessage());
			System.out.println( getStackTrace(cse) );
			System.exit(0);
		}
		catch(SQLException sqle) {
			System.out.println("SQL Exception :"+sqle.getMessage());
			System.out.println( getStackTrace(sqle) );
			System.exit(0);			
		}
		catch(Exception e) {
			System.out.println("Exception :"+e.getMessage());
			System.out.println( getStackTrace(e) );
			System.exit(0);
		}
	}

		
	  public static String getStackTrace(Throwable aThrowable) {
		    final Writer result = new StringWriter();
		    final PrintWriter printWriter = new PrintWriter(result);
		    aThrowable.printStackTrace(printWriter);
		    return result.toString();
	  }
	  
	  public static void closeConnection() {
		  try {
			conn.close();
			if (conn.isClosed()) {
				System.out.println("Connection closed successfuly");
			} else {
				System.out.println("Connection closed FAILED!!!");
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	  }
	  
}
