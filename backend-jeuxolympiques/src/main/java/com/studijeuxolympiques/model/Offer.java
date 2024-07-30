package com.studijeuxolympiques.model;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Build Class offer
 * Set up properties (id, name, description, price, and quantity)
 * Implement constructor
 * @Data allows the implementation of getter and setter
 */


@Data
@Entity
@Table(name = "offers")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(
            nullable = false
    )

    private String name;
    @Column(
            nullable = false
    )

    private float price;
    @Column(
            nullable = false
    )

    private String description;

    @ManyToOne
    private User user;

    public Offer(String name, String description, float price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }


    public Offer() {
    }
}
