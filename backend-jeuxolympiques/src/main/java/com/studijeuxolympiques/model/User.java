package com.studijeuxolympiques.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * @author johanna
 * @version 1.0.0
 */

@Data
@Entity
@Table(name = "users")
public class User {

    /**
     * Build Class user
     * Set up properties (id, firstname, lastname, telephone, email and password)
     * Implement constructor
     * @Data allows the implementation of getter and setter
     */

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    @Getter
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

    private Long telephone;
    @Column(
            nullable = false
    )

    private String mail;
    @Setter
    @Column(
            nullable = false
    )

    private String password;

    public User( String lastname, String firstname, long telephone, String mail, String password) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.telephone = telephone;
        this.mail = mail;
        this.password = password;
    }

    public User() {

    }
}
