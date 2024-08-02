package com.studijeuxolympiques.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name= "sales")
public class Sale {

    /**
     * Build Class Sale
     * Implement constructor, builder, Getter and name table for database
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer quantity;
    private String nameOffer;


    @ManyToOne
    private User user;

}
