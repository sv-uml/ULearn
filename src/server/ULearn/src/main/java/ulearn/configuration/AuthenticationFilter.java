package ulearn.configuration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import ulearn.configuration.model.Token;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	public AuthenticationFilter() {
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		String token = request.getHeader("token");
		Token authToken = new Token();
		authToken.setToken(token);
		return getAuthenticationManager().authenticate(new AuthenticationToken(authToken));
	}
	
	@Override
	@Autowired
	public void setAuthenticationManager(AuthenticationManager authenticationManager) {
		super.setAuthenticationManager(authenticationManager);
	}
	
}
