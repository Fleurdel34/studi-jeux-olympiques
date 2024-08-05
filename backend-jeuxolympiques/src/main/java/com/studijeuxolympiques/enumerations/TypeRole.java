package com.studijeuxolympiques.enumerations;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Implements Enumeration for Role class
 */

@Getter
@AllArgsConstructor
public enum TypeRole {
    USER(
            Set.of(TypePermission.USER_CREATE_SALES)
    ),
    ADMIN(
            Set.of(TypePermission.ADMIN_CREATE,
                    TypePermission.ADMIN_READ,
                    TypePermission.ADMIN_UPDATE,
                    TypePermission.ADMIN_DELETE)
    );

    final Set<TypePermission> permissions;

    public Collection<? extends GrantedAuthority> getAuthorities() {
        final List<SimpleGrantedAuthority> simpleGrantedAuthorityList = this.getPermissions()
                .stream().map(
                        permission -> new SimpleGrantedAuthority(permission.name())
                ).collect(Collectors.toList());

       simpleGrantedAuthorityList.add(new SimpleGrantedAuthority("ROLE_" + this.name()));

        return simpleGrantedAuthorityList;
    }
}
