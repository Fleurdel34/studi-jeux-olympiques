package com.studijeuxolympiques;


import com.studijeuxolympiques.model.Offer;
import com.studijeuxolympiques.repository.OfferRepository;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.Assert.assertEquals;

/**
 * Implements test for the OfferRepository class
 * implements test to create and update offer
 * implements test to find all offers and to delete all offers
 */


@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)
@DataJpaTest
public class OfferRepositoryTest {

    @Mock
    private OfferRepository offerRepository;

    @Test
    public void testCreateOffer(){
        Offer offer = new Offer();
        offer.setName("Offre Solo");
        offer.setDescription("Offre réservée aux étudiants");
        offer.setPrice(260.55F);
        offer.setQuantity(1);
        this.offerRepository.save(offer);

        assertEquals("Offre Solo", offer.getName());
        assertEquals("Offre réservée aux étudiants", offer.getDescription());

       Offer offer1 = new Offer();
       offer1.setName("Offre Etudiante");

       offer.setName(offer1.getName());

       this.offerRepository.save(offer);
       assertEquals("Offre Etudiante", offer.getName());

       offerRepository.findAll();
       assertThat(offerRepository.findAll()).isNotNull();

        offerRepository.deleteAll();
        assertThat(offerRepository.findAll().isEmpty());

    }

}
