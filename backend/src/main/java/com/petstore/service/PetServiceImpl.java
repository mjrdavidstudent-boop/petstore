package com.petstore.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.petstore.dto.PetRequest;
import com.petstore.dto.PetResponse;
import com.petstore.exception.PetNotFoundException;
import com.petstore.model.Pet;
import com.petstore.repository.PetRepository;

@Service
@Transactional
public class PetServiceImpl implements PetService {

  private final PetRepository petRepository;

  public PetServiceImpl(PetRepository petRepository) {
    this.petRepository = petRepository;
  }

  @Override
  @Transactional(readOnly = true)
  public List<PetResponse> findAll(String search, String species, Boolean available) {
    String normalizedSearch = search == null ? "" : search.trim().toLowerCase();
    String normalizedSpecies = species == null ? "" : species.trim().toLowerCase();

    return petRepository.findAll().stream()
        .filter(pet -> normalizedSearch.isEmpty()
            || contains(pet.getName(), normalizedSearch)
            || contains(pet.getBreed(), normalizedSearch)
            || contains(pet.getSpecies(), normalizedSearch))
        .filter(pet -> normalizedSpecies.isEmpty() || pet.getSpecies().equalsIgnoreCase(normalizedSpecies))
        .filter(pet -> available == null || pet.isAvailable() == available)
        .map(this::toResponse)
        .toList();
  }

  @Override
  @Transactional(readOnly = true)
  public PetResponse findById(Long id) {
    return toResponse(getPet(id));
  }

  @Override
  public PetResponse create(PetRequest request) {
    Pet pet = new Pet();
    applyRequest(pet, request);
    pet.setId(null);
    return toResponse(petRepository.save(pet));
  }

  @Override
  public PetResponse update(Long id, PetRequest request) {
    Pet pet = getPet(id);
    applyRequest(pet, request);
    return toResponse(petRepository.save(pet));
  }

  @Override
  public void delete(Long id) {
    Pet pet = getPet(id);
    petRepository.delete(pet);
  }

  private Pet getPet(Long id) {
    return petRepository.findById(id).orElseThrow(() -> new PetNotFoundException(id));
  }

  private void applyRequest(Pet pet, PetRequest request) {
    pet.setName(request.name().trim());
    pet.setSpecies(request.species().trim());
    pet.setBreed(request.breed() == null ? null : request.breed().trim());
    pet.setAge(request.age());
    pet.setDescription(request.description().trim());
    pet.setImageUrl(request.imageUrl().trim());
    pet.setAdoptionFee(request.adoptionFee());
    pet.setAvailable(request.available() == null || request.available());
  }

  private PetResponse toResponse(Pet pet) {
    return new PetResponse(pet.getId(), pet.getName(), pet.getSpecies(), pet.getBreed(), pet.getAge(),
        pet.getDescription(), pet.getImageUrl(), pet.getAdoptionFee(), pet.isAvailable(), pet.getCreatedAt(),
        pet.getUpdatedAt());
  }

  private boolean contains(String value, String query) {
    return value != null && value.toLowerCase().contains(query);
  }
}
