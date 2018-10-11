package ulearn.configuration;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import ulearn.configuration.model.Token;

@Component
public class AppAuthenticationProvider implements AuthenticationProvider {

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		Token token = (Token)authentication.getCredentials();
		String subject = Jwts.parser().setSigningKey(ApplicationVars.signingKey)
		.parseClaimsJws(token.getToken()).getBody().getSubject();
		List<GrantedAuthority> authorities = new ArrayList<>();
		AuthUserDetails authUserDetails = AuthUserDetails.create(subject, authorities);
		return new AuthenticationToken(authUserDetails, authUserDetails.getAuthorities());
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return Token.class.isAssignableFrom(authentication);
	}

}
