package com.studijeuxolympiques.service.Impl;

import com.studijeuxolympiques.model.Sale;
import com.studijeuxolympiques.repository.SaleRepository;
import com.studijeuxolympiques.service.SaleService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Create class SaleServiceImpl
 * Execute business processing
 * Use the property SaleRepository
 */


@AllArgsConstructor
@Service
public class SaleServiceImpl implements SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Override
    public void createSale(Sale sale){
        this.saleRepository.save(sale);
    };

    @Override
    public Sale getByNameOffer(String nameOffer){
        return this.saleRepository.findByNameOffer(nameOffer);
    };

}
