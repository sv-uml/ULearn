package ulearn.configuration;

import java.util.Collection;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import ulearn.configuration.model.Token;

public class AuthenticationToken extends AbstractAuthenticationToken {

	private static final long serialVersionUID = -9081505202437090042L;
	private Token token;
	private AuthUserDetails authUserDetails;

	public AuthenticationToken(Token token) {
		super(null);
		this.token = token;
		this.setAuthenticated(false);
	}
	
	public AuthenticationToken(AuthUserDetails authUserDetails, Collection<? extends GrantedAuthority> authorities) {
		super(authorities);
		this.authUserDetails = authUserDetails;
		super.setAuthenticated(true);
	}

	@Override
	public Object getCredentials() {
		return this.token;
	}

	@Override
	public Object getPrincipal() {
		return this.authUserDetails;
	}
}
