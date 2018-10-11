package ulearn.authentication;

import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
	
	public Map<String, Object> authenticate(AuthenticationRequest authReq) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String email = authReq.getEmail();
		String password = authReq.getPassword();
		password = encoder.encode(password);
		return null;
	}
	
}
