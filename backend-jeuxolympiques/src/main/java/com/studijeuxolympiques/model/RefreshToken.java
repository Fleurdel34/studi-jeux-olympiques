package com.studijeuxolympiques.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.Date;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name= "refresh-token")
public class RefreshToken {

    /**
     * Build Class RefreshToken
     * Set up properties (id, value, boolean expired and Date created)
     * Implement constructor, builder, Getter and name table for database
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean expired;
    private String value;
    private Instant created;
    private Instant expiration;
}
