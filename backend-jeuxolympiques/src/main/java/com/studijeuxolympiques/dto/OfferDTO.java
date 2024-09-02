package com.studijeuxolympiques.dto;

/**
 * Create Record to recover two params of User
 * @param id
 * @param name
 * @param price
 * @param description
 * @param  quantity
 */

public record OfferDTO(

    Long id,
    String name,
    float price,
    String description,
    Integer quantity) {


}
