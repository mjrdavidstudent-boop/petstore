package com.petstore;

import java.math.BigDecimal;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.petstore.model.Pet;
import com.petstore.repository.PetRepository;

@SpringBootApplication
public class PetstoreApplication {

  public static void main(String[] args) {
    SpringApplication.run(PetstoreApplication.class, args);
  }

  @Bean
  CommandLineRunner seedPets(PetRepository petRepository) {
    return args -> {
      if (petRepository.count() > 0) {
        return;
      }

      petRepository.save(new Pet(null, "Mochi", "Cat", "Ragdoll", 2,
          "Fluffy lap cat with a calm, affectionate personality.",
          "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=900&q=80",
          BigDecimal.valueOf(120.00), true));
      petRepository.save(new Pet(null, "Orbit", "Dog", "Corgi", 3,
          "Friendly, energetic, and always ready for a neighborhood walk.",
          "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
          BigDecimal.valueOf(180.00), true));
      petRepository.save(new Pet(null, "Juniper", "Rabbit", "Lop", 1,
          "Compact companion with a curious nose and soft ears.",
          "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=900&q=80",
          BigDecimal.valueOf(95.00), true));
      petRepository.save(new Pet(null, "Nimbus", "Bird", "Cockatiel", 4,
          "Bright, social bird that loves attention and gentle routines.",
          "https://images.unsplash.com/photo-1521651201144-634f700b36ef?auto=format&fit=crop&w=900&q=80",
          BigDecimal.valueOf(75.00), true));
      petRepository.save(new Pet(null, "Dune", "Dog", "Whippet", 2,
          "Graceful sprinter with a peaceful, low-key home vibe.",
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
          BigDecimal.valueOf(210.00), true));
      petRepository.save(new Pet(null, "Pebble", "Cat", "Tabby", 5,
          "Older cat with a confident personality and good manners.",
          "https://images.unsplash.com/photo-1472491235688-bdc81a63246e?auto=format&fit=crop&w=900&q=80",
          BigDecimal.valueOf(80.00), false));
    };
  }
}
