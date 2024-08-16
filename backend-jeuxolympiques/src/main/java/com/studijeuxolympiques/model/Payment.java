package com.studijeuxolympiques.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

/**Build Class Payment
 * Set up properties (id, n, holder, accountNumber, date, code, nameOffer and priceOffer)
 * Implement constructor
 * @Data allows the implementation of getter and setter
 */

@Data
@Entity
@Table(name = "transaction")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(
            nullable = false
    )

    private String holder;
    @Column(
            nullable = false
    )

    private Integer accountNumber;
    @Column(
            nullable = false
    )

    private Date date;
    @Column(
            nullable = false
    )

    private Integer code;
    @Column(
            nullable = false
    )

    private String nameTransaction;
    @Column(
            nullable = false
    )

    private float price;
    @Column(
            nullable = false
    )

    @OneToOne
    private KeyTransaction keyTransaction;

    @ManyToOne
    private User user;

}
