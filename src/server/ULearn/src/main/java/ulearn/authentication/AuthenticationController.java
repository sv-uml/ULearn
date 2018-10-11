package ulearn.authentication;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
	
	@Autowired
	AuthenticationService authenticationService;
	
	public Map<String, Object> authenticate(@RequestBody AuthenticationRequest authReq) {
		return authenticationService.authenticate(authReq);
	}
	
}
