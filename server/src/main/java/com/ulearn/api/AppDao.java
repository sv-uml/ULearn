package com.ulearn.api;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class AppDao {

	@Autowired
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
	
	/**
	 * Gets id, name and password for given user email
	 * @param email - user's email
	 * @return id, name and password
	 */
	public Map<String, Object> getUserByEmail(String email) {
		Map<String, Object> ret = new HashMap<>();
		Map<String, Object> params = new HashMap<>();
		params.put(AppConstants.REQUEST_KEY_EMAIL, email);
		List<Map<String, Object>> lst = namedParameterJdbcTemplate.queryForList("SELECT id, name, password FROM users where email = :email", params);
		if (lst.isEmpty()) {
			return ret;
		} else {
			return lst.get(0);
		}
	}
	
	/**
	 * Checks if given user email is registered
	 * @param email - user email
	 * @return true if registered, false otherwise
	 */
	public boolean userExists(String email) {
		Map<String, Object> params = new HashMap<>();
		params.put(AppConstants.REQUEST_KEY_EMAIL, email);
		List<Map<String, Object>> lst = namedParameterJdbcTemplate.queryForList("SELECT id FROM users where email = :email", params);
		return (!lst.isEmpty());
	}
	
	/**
	 * Registers given name, email and password
	 * @param name - name of user
	 * @param email - email of user
	 * @param password - encrypted password of user
	 * @return id of user
	 */
	public int register(String name, String email, String password) {
		KeyHolder holder = new GeneratedKeyHolder();
		Map<String, Object> params = new HashMap<>();
		params.put("name", name);
		params.put(AppConstants.REQUEST_KEY_EMAIL, email);
		params.put(AppConstants.REQUEST_KEY_PASS, password);
		
		namedParameterJdbcTemplate.getJdbcOperations().update(new PreparedStatementCreator() {
			@Override
			public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
				PreparedStatement pst = con.prepareStatement("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
				pst.setString(1, name);
				pst.setString(2, email);
				pst.setString(3, password);
				return pst;
			}
		}, holder);
		return Integer.parseInt(String.valueOf(holder.getKeys().get("last_insert_rowid()")));
	}
	
	public int createCourse(String title, String description, int author, int startDate, int endDate) {
		KeyHolder holder = new GeneratedKeyHolder();
		namedParameterJdbcTemplate.getJdbcOperations().update(new PreparedStatementCreator() {
			@Override
			public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
				PreparedStatement pst = con.prepareStatement("INSERT INTO courses (title, description, author, datetime, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
				pst.setString(1, title);
				pst.setString(2, description);
				pst.setInt(3, author);
				pst.setInt(4, Integer.parseInt(String.valueOf(System.currentTimeMillis() / 1000)));
				pst.setInt(5, startDate);
				pst.setInt(6, endDate);
				return pst;
			}
		}, holder);
		return Integer.parseInt(String.valueOf(holder.getKeys().get("id")));
	}
	
	public List<Map<String, Object>> getAllCourses() {
		Map<String, Object> params = new HashMap<>();
		return namedParameterJdbcTemplate.queryForList("SELECT * FROM courses", params);
	}
	
}
