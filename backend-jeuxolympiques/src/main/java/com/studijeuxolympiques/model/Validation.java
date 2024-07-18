package com.studijeuxolympiques.model;


import jakarta.persistence.*;
import lombok.Data;

/** Build Class Validation
 * Set up properties (id and code)
 * Set up Instant creation, expired and activation
 * @Data allows the implementation of constructor, getter and setter
 */

import java.time.Instant;

@Data
@Entity
@Table(name = "validation")
public class Validation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Instant creation;
    private Instant expired;
    private Instant activation;
    private String code;
    @OneToOne(cascade = CascadeType.ALL)
    private User user;
}
