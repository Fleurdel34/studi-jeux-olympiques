package com.studijeuxolympiques.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


/**Build Class Payment
 * Set up properties (id, n, holder, accountNumber, date, code, nameOffer and priceOffer)
 * Implement constructor
 * @Data allows the implementation of getter and setter
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
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

    private Long accountNumber;
    @Column(
            nullable = false
    )

    @JsonFormat(pattern="MM-yyyy")
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

    private String keyTransaction;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Payment(String holder, Long accountNumber, Integer code, String nameTransaction, float price, Date date) {
        this.holder = holder;
        this.accountNumber = accountNumber;
        this.date = date;
        this.code = code;
        this.nameTransaction = nameTransaction;
        this.price = price;
    }
}
