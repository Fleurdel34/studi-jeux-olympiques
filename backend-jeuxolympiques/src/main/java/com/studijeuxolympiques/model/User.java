package com.studijeuxolympiques.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    @Column(
            nullable = false
    )
    private String firstname;
    @Column(
            nullable = false
    )
    private String lastname;
    @Column(
            nullable = false
    )
    private Long telephone;
    @Column(
            nullable = false
    )
    private String mail;
    @Column(
            nullable = false
    )
    private String password;

    public User(String firstname, String lastname, long telephone, String mail, String password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.telephone = telephone;
        this.mail = mail;
        this.password = password;
    }

    public User() {
    }


}
