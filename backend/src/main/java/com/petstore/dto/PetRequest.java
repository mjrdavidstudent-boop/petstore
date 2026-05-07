package com.petstore.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PetRequest(
    @NotBlank @Size(max = 120) String name,
    @NotBlank @Size(max = 60) String species,
    @Size(max = 80) String breed,
    @NotNull @Min(0) Integer age,
    @NotBlank @Size(max = 1200) String description,
    @NotBlank @Size(max = 1000) String imageUrl,
    @NotNull @DecimalMin(value = "0.0", inclusive = true) BigDecimal adoptionFee,
    Boolean available) {
}
