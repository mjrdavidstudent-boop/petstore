package com.petstore.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.petstore.dto.PetRequest;
import com.petstore.dto.PetResponse;
import com.petstore.service.PetService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/pets")
@Validated
public class PetController {

  private final PetService petService;

  public PetController(PetService petService) {
    this.petService = petService;
  }

  @GetMapping
  public List<PetResponse> getPets(
      @RequestParam(required = false) String search,
      @RequestParam(required = false) String species,
      @RequestParam(required = false) Boolean available) {
    return petService.findAll(search, species, available);
  }

  @GetMapping("/{id}")
  public PetResponse getPet(@PathVariable Long id) {
    return petService.findById(id);
  }

  @PostMapping
  public ResponseEntity<PetResponse> createPet(@Valid @RequestBody PetRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(petService.create(request));
  }

  @PutMapping("/{id}")
  public PetResponse updatePet(@PathVariable Long id, @Valid @RequestBody PetRequest request) {
    return petService.update(id, request);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletePet(@PathVariable Long id) {
    petService.delete(id);
    return ResponseEntity.noContent().build();
  }
}
