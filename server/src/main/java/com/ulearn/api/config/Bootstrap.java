package com.ulearn.api.config;

import java.sql.Connection;
import java.sql.Statement;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Bootstrap {
	
	@Autowired
	private DataSource dataSource;
	
	@PostConstruct
	public void initialize() {
		try (Connection con = dataSource.getConnection(); Statement st = con.createStatement()) {
			st.executeUpdate("DROP TABLE IF EXISTS users; CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, " +
				    "email VARCHAR(255) NOT NULL, password VARCHAR(512) NOT NULL)");
			
			st.executeUpdate("DROP TABLE IF EXISTS courses; CREATE TABLE courses (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255) NOT NULL, " +
				    "description VARCHAR(999) NOT NULL, author INTEGER NOT NULL, datetime INTEGER NOT NULL, start_date INTEGER NOT NULL, end_date INTEGER NOT NULL)");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
