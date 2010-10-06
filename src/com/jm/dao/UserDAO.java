package com.jm.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.jm.bean.User;

public class UserDAO {

	private static final ConnectDAO connect = new ConnectDAO();
	
	public List<String> allUsersStrings(String token) throws Exception{
		List<String> listPeople = new ArrayList<String>();	

        PreparedStatement ps = null;
        ResultSet rs = null;
        
    	try {
    		String sql = "select * from users where name like '%" + token + "%' ORDER BY name desc";
    		ps = connect.getConnection().prepareStatement(sql);
    		
    		rs = ps.executeQuery(sql);
	        
	        while(rs.next()){
	        	String s = rs.getString("name");
				listPeople.add(s);
			}

    	} catch (SQLException e) {
			throw new Exception("Erro no banco: " + e.getCause());
		}catch (Exception ee) {
			throw new Exception("Ocorreu um erro: " + ee.getCause());
		}finally{
			 rs.close();
	         ps.close();
			connect.closeConnection();
		}
        
		return listPeople;
	}
	
	
	public List<User> allUsersBean(String token) throws Exception{
		List<User> listPeople = new ArrayList<User>();	

        PreparedStatement ps = null;
        ResultSet rs = null;
        
    	try {
    		String sql = "select * from users where name like '%" + token + "%' ORDER BY name desc";
    		ps = connect.getConnection().prepareStatement(sql);
    		
    		rs = ps.executeQuery(sql);
	        
    		User user = null;
	        while(rs.next()){
	        	user = new User();
	        	user.setId(new Integer(rs.getInt("id")));
	        	user.setName(rs.getString("name"));
	        	user.setLogin(rs.getString("login"));
	        	user.setPass(rs.getString("pass"));
				listPeople.add(user);
			}

    	} catch (SQLException e) {
			throw new Exception("Erro no banco: " + e.getCause());
		}catch (Exception ee) {
			throw new Exception("Ocorreu um erro: " + ee.getCause());
		}finally{
			 rs.close();
	         ps.close();
			connect.closeConnection();
		}
        
		return listPeople;
	}
	

}
