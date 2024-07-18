package com.studijeuxolympiques.model;

import com.studijeuxolympiques.TypeRole;
import jakarta.persistence.*;
import lombok.Data;

/** Build Class Role
 * Set up properties (id and Enumeration)
 * @Data allows the implementation of constructor, getter and setter
 */

@Data
@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    @Column(
            nullable = false
    )

    @Enumerated(EnumType.STRING)
    private TypeRole role;


}