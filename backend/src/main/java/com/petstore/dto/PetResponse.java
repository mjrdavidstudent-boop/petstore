package com.petstore.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record PetResponse(
    Long id,
    String name,
    String species,
    String breed,
    Integer age,
    String description,
    String imageUrl,
    BigDecimal adoptionFee,
    boolean available,
    Instant createdAt,
    Instant updatedAt) {
}
