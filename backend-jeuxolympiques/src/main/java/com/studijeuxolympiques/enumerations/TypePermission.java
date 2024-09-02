package com.studijeuxolympiques.enumerations;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * Implements Enumeration for permissions
 */

@Getter
@RequiredArgsConstructor
public enum TypePermission {

    ADMIN_CREATE,
    ADMIN_READ,
    ADMIN_UPDATE,
    ADMIN_DELETE,

    USER_CREATE_PAYMENT;

    private String wording;
}
