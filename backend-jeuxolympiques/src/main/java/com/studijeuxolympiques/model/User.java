package com.studijeuxolympiques.model;


import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.Collection;
import java.util.Collections;


/**
 * @author johanna
 * @version 1.0.0
 */

@Data
@Entity
@Table(name = "users")
public class User implements UserDetails {

    /**
     * Build Class user
     * Set up properties (id, firstname, lastname, telephone, email, password and role)
     * Implement constructor
     * @Data allows the implementation of getter and setter
     */

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    @Column(
            nullable = false
    )

    private String lastname;
    @Column(
            nullable = false
    )

    private String firstname;
    @Column(
            nullable = false
    )

    private String username;
    @Column(
            nullable = false
    )

    private String mail;
    @Column(
            nullable = false
    )

    private String password;
    @Column(
            nullable = false
    )


    private boolean active = false;


    @OneToOne(cascade = CascadeType.ALL)
    private Role role;



    public User(String lastname, String firstname, String username, String mail, String password, Role role) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.username = username;
        this.mail = mail;
        this.password = password;
        this.role = role;
    }

    public User(){}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_"+this.role.getRole()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.active;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.active;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.active;
    }

    @Override
    public boolean isEnabled() {
        return this.active;
    }
}
