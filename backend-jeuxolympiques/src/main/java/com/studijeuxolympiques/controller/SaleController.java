package com.studijeuxolympiques.controller;


import com.studijeuxolympiques.model.Sale;
import com.studijeuxolympiques.model.User;
import com.studijeuxolympiques.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * Build class OfferController
 * Receive the request and provide the response
 * @property OfferService
 * @requests Get, Post, and Put
 */

@RequestMapping("api/sales")
@RestController
public class SaleController {

    @Autowired
    private SaleService saleService;

    @PostMapping
    public void createOffer(@RequestBody Sale sale){

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        sale.setUser(user);
        this.saleService.createSale(sale);
    }

    @GetMapping({"/{nameOffer}"})
    public Sale getByNameOffer(@PathVariable String nameOffer){
        return this.saleService.getByNameOffer(nameOffer);
    }

}
