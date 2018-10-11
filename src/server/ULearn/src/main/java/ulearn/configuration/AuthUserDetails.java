package ulearn.configuration;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class AuthUserDetails implements UserDetails {
	private static final long serialVersionUID = 4885242582325641937L;

    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    private AuthUserDetails(String email, Collection<? extends GrantedAuthority> authorities) {
        this.email = email;
        this.authorities = authorities;
    }

    public static AuthUserDetails create(String email, Collection<? extends GrantedAuthority> authorities) {
        return new AuthUserDetails(email, authorities);
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public boolean isAccountNonExpired() {
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return false;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
