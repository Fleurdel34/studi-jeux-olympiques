package com.studijeuxolympiques.service.Impl;


import com.studijeuxolympiques.dto.PaymentDTO;
import com.studijeuxolympiques.model.Payment;
import com.studijeuxolympiques.model.User;
import com.studijeuxolympiques.repository.PaymentRepository;
import com.studijeuxolympiques.service.PaymentService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import java.util.UUID;
import java.util.stream.Stream;


/**
 * Create class PaymentServiceImpl
 * Execute business processing
 * Use the property PaymentRepository
 */



@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }


    @Override
    public Long createPayment(Payment payment) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        payment.setUser(user);
        String keyTransaction = String.valueOf(UUID.randomUUID());
        payment.setKeyTransaction(keyTransaction);
        Long accountNumberHash = (long) payment.getAccountNumber().hashCode();
        payment.setAccountNumber(accountNumberHash);
        this.paymentRepository.save(payment);
        return payment.getId();
    }

    @Override
    public Stream<PaymentDTO> getAllPayments() {
        return this.paymentRepository.findAll()
                .stream().map(payment -> new PaymentDTO(payment.getId(), payment.getNameTransaction(), payment.getPrice(), payment.getKeyTransaction()));
    }

    @Override
    public Stream<PaymentDTO> getPaymentById(Long id) {
        return this.paymentRepository.findById(id).stream().map(payment -> new PaymentDTO(payment.getId(), payment.getNameTransaction(), payment.getPrice(), payment.getKeyTransaction()));
    }


}
