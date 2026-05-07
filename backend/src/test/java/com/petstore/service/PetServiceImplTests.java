package com.petstore.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.petstore.dto.PetRequest;
import com.petstore.exception.PetNotFoundException;
import com.petstore.model.Pet;
import com.petstore.repository.PetRepository;

@ExtendWith(MockitoExtension.class)
class PetServiceImplTests {

  @Mock
  private PetRepository petRepository;

  @InjectMocks
  private PetServiceImpl petService;

  @Test
  void createStoresPet() {
    PetRequest request = new PetRequest("Luna", "Cat", "Siamese", 2, "Playful cat", "https://example.com/luna.jpg",
        new BigDecimal("99.00"), true);

    when(petRepository.save(org.mockito.ArgumentMatchers.any(Pet.class)))
        .thenAnswer(invocation -> invocation.getArgument(0));

    var response = petService.create(request);

    assertThat(response.name()).isEqualTo("Luna");
    verify(petRepository).save(org.mockito.ArgumentMatchers.any(Pet.class));
  }

  @Test
  void findByIdThrowsWhenMissing() {
    when(petRepository.findById(42L)).thenReturn(Optional.empty());

    org.junit.jupiter.api.Assertions.assertThrows(PetNotFoundException.class, () -> petService.findById(42L));
  }
}
