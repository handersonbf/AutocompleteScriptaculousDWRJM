/**
 * @author Handerson Frota - handersonbf@gmail.com
 * Used classroom to create a connection with the Data base
 */

package com.jm.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class ConnectDAO {

  private Connection conexao = null;
  private String urlBanco = null;
  private String userName = null;
  private String userPassword = null;
  private String jdbcDriver = null;
  /**
   * Construction standard
   *
   */
  public ConnectDAO() {

    super();
    userName 		= "root";
    userPassword 	= "123";
    urlBanco 		= "jdbc:mysql://127.0.0.1/autocomplete";
    jdbcDriver		= "org.gjt.mm.mysql.Driver";
    
  }

  /**
   * Return  java.sql.Connection.
   * @return conexao
   */
  public Connection getConnection() {
	    try {
		      if (conexao == null) {
		        Class.forName(jdbcDriver);
		        conexao = DriverManager.getConnection(urlBanco, userName, userPassword);

		      } else if (conexao.isClosed()) {
		        conexao = null;
		        return getConnection();
		      }
	    } catch (ClassNotFoundException e) {
	    	e.printStackTrace();
	    } catch (SQLException e) {
	    	e.printStackTrace();
	    }
	    	return conexao;
  }

  /**
   * It closes the connection with the BD
   *
   */
  public void closeConnection() {
    if (conexao != null) {
      try {
        conexao.close();
      } catch (SQLException e) {
        e.printStackTrace();
      }
    }
  }
}
