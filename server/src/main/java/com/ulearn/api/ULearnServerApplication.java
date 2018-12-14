package com.ulearn.api;

import java.util.HashMap;
import java.util.Map;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Controller
@SpringBootApplication
@RequestMapping("/api")
@CrossOrigin(origins = { "http://localhost:3003", "https://ulearn-uml.herokuapp.com" })
public class ULearnServerApplication {
	
	@Autowired
	private AppDao appDao;

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> login(@RequestBody Map<String, Object> req) {
		Map<String, Object> ret = new HashMap<>();
		String email = String.valueOf(req.get(AppConstants.REQUEST_KEY_EMAIL));
		String password = String.valueOf(req.get(AppConstants.REQUEST_KEY_PASS));

		Map<String, Object> user = appDao.getUserByEmail(email);
		
		if (user.isEmpty()) {
			// User not found, error.
			ret.put(AppConstants.REQUEST_KEY_MESSAGE, AppConstants.REQUEST_MESSAGE_INVALID_AUTH);
			return ret;
		}
		
		String dbPassword = String.valueOf(user.get(AppConstants.REQUEST_KEY_PASS));
		
		if (BCrypt.checkpw(password, dbPassword)) {
			// Valid user
			Map<String, Object> tokenData = new HashMap<>();
			tokenData.put(AppConstants.REQUEST_KEY_ID, user.get(AppConstants.REQUEST_KEY_ID));
			String jwt = Jwts.builder().setClaims(tokenData).signWith(SignatureAlgorithm.HS512, getKey()).compact();
			
			ret.put(AppConstants.REQUEST_KEY_TOKEN, jwt);
			ret.put(AppConstants.REQUEST_KEY_MESSAGE, AppConstants.REQUEST_MESSAGE_SUCCESS);
			ret.put(AppConstants.REQUEST_KEY_NAME, user.get(AppConstants.REQUEST_KEY_NAME));
			ret.put(AppConstants.REQUEST_KEY_EMAIL, email);
		} else {
			// Incorrect password, error.
			ret.put(AppConstants.REQUEST_KEY_MESSAGE, AppConstants.REQUEST_MESSAGE_INVALID_AUTH);
		}
		return ret;
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> register(@RequestBody Map<String, Object> req) {
		Map<String, Object> ret = new HashMap<>();
		String name = String.valueOf(req.get(AppConstants.REQUEST_KEY_NAME));
		String email = String.valueOf(req.get(AppConstants.REQUEST_KEY_EMAIL));
		String password = String.valueOf(req.get(AppConstants.REQUEST_KEY_PASS));
		if (appDao.userExists(email)) {
			ret.put(AppConstants.REQUEST_KEY_MESSAGE, AppConstants.REQUEST_MESSAGE_INVALID_AUTH);
			return ret;
		}
		String newPassword = BCrypt.hashpw(password, BCrypt.gensalt());
		int id = appDao.register(name, email, newPassword);
		Map<String, Object> tokenData = new HashMap<>();
		tokenData.put(AppConstants.REQUEST_KEY_ID, id);
		String jwt = Jwts.builder().setClaims(tokenData).signWith(SignatureAlgorithm.HS512, getKey()).compact();
		ret.put(AppConstants.REQUEST_KEY_TOKEN, jwt);
		ret.put(AppConstants.REQUEST_KEY_MESSAGE, AppConstants.REQUEST_MESSAGE_SUCCESS);
		ret.put(AppConstants.REQUEST_KEY_NAME, name);
		ret.put(AppConstants.REQUEST_KEY_EMAIL, email);
		return ret;
	}
	
	@RequestMapping(value = "/courses", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getAllCourses(@RequestHeader HttpHeaders headers) {
		Map<String, Object> ret = new HashMap<>();
		String token = headers.get("Authorization").get(0);
		try {
			Map<String, Object> tokenData = Jwts.parser().setSigningKey(getKey()).parseClaimsJws(token).getBody();
			if (!tokenData.containsKey("id") || tokenData.get("id") == null) {
				ret.put(AppConstants.REQUEST_KEY_MESSAGE, AppConstants.REQUEST_MESSAGE_INVALID_AUTH);
				return ret;
			}
		} catch (Exception ex) {
			ret.put(AppConstants.REQUEST_KEY_MESSAGE, AppConstants.REQUEST_MESSAGE_INVALID_AUTH);
			return ret;
		}
		ret.put(AppConstants.REQUEST_KEY_MESSAGE, AppConstants.REQUEST_MESSAGE_SUCCESS);
		ret.put("courses", appDao.getAllCourses());
		return ret;
	}
	
	@RequestMapping(value = "/course/create", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> create(@RequestHeader HttpHeaders headers, @RequestBody Map<String, Object> req) {
		Map<String, Object> ret = new HashMap<>();
		String token = headers.get("Authorization").get(0);
		int author = -1;
		try {
			Map<String, Object> tokenData = Jwts.parser().setSigningKey(getKey()).parseClaimsJws(token).getBody();
			if (tokenData.containsKey("id") && tokenData.get("id") != null) {
				author = Integer.parseInt(String.valueOf(tokenData.get("id")));
			} else {
				ret.put(AppConstants.REQUEST_KEY_MESSAGE, AppConstants.REQUEST_MESSAGE_INVALID_AUTH);
				return ret;
			}
		} catch (Exception ex) {
			ret.put(AppConstants.REQUEST_KEY_MESSAGE, AppConstants.REQUEST_MESSAGE_INVALID_AUTH);
			return ret;
		}
		
		String title = String.valueOf(req.get("title"));
		String description = String.valueOf(req.get("description"));
		int startDate = Integer.parseInt(String.valueOf(req.get("startDate")));
		int endDate = Integer.parseInt(String.valueOf(req.get("endDate")));
		int newCourseId = appDao.createCourse(title, description, author, startDate, endDate);
		
		ret.put(AppConstants.REQUEST_KEY_ID, newCourseId);
		ret.put(AppConstants.REQUEST_KEY_MESSAGE, AppConstants.REQUEST_MESSAGE_SUCCESS);
		return ret;
	}
	
	private String getKey() {
		StringBuilder string = new StringBuilder(512);
		while (string.length() < 512) {
			string.append(Base64.encodeBase64String("secret".getBytes()));
		}
		string.setLength(512);
		return string.toString();
	}

	public static void main(String[] args) {
		SpringApplication.run(ULearnServerApplication.class, args);
	}
}
