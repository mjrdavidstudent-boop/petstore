export type Pet = {
  id: number;
  name: string;
  species: string;
  breed: string | null;
  age: number;
  description: string;
  imageUrl: string;
  adoptionFee: number;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type PetFormValues = {
  name: string;
  species: string;
  breed: string;
  age: string;
  description: string;
  imageUrl: string;
  adoptionFee: string;
  available: boolean;
};

export type PetFormPayload = {
  name: string;
  species: string;
  breed: string | null;
  age: number;
  description: string;
  imageUrl: string;
  adoptionFee: number;
  available: boolean;
};

export type PetFilters = {
  search: string;
  species: string;
  availability: 'all' | 'available' | 'unavailable';
};

export const emptyPetForm: PetFormValues = {
  name: '',
  species: '',
  breed: '',
  age: '',
  description: '',
  imageUrl: '',
  adoptionFee: '',
  available: true,
};
