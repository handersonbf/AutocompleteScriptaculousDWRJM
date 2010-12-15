package com.jm.facade;

import java.util.List;

import com.jm.bean.User;
import com.jm.dao.UserDAO;

public class FacadeAjax {

	private UserDAO userDAO = new UserDAO();
	
	public List<String> allUsersStrings(String token) throws Exception{
		return userDAO.allUsersStrings(token);
	}
	
	public List<User> allUsersBean(String token) throws Exception{
		return userDAO.allUsersBean(token);
	}
}
