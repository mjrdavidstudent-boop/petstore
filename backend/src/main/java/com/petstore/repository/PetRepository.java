package com.petstore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petstore.model.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {
  List<Pet> findByNameContainingIgnoreCaseOrBreedContainingIgnoreCaseOrSpeciesContainingIgnoreCase(
      String name, String breed, String species);

  List<Pet> findBySpeciesIgnoreCase(String species);

  List<Pet> findByAvailable(boolean available);

  List<Pet> findBySpeciesIgnoreCaseAndAvailable(String species, boolean available);
}
