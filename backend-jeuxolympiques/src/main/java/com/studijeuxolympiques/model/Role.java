package com.studijeuxolympiques.model;

import com.studijeuxolympiques.TypeRole;
import jakarta.persistence.*;
import lombok.Data;

/**
 * @author johanna
 * @version 1.0.0
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