package com.petstore.service;

import java.util.List;

import com.petstore.dto.PetRequest;
import com.petstore.dto.PetResponse;

public interface PetService {
  List<PetResponse> findAll(String search, String species, Boolean available);

  PetResponse findById(Long id);

  PetResponse create(PetRequest request);

  PetResponse update(Long id, PetRequest request);

  void delete(Long id);
}
