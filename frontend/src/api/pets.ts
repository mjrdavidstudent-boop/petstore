import type { Pet, PetFilters, PetFormPayload } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const text = await response.text();
    let message = text || response.statusText;

    try {
      const payload = JSON.parse(text) as { message?: string };
      message = payload.message ?? message;
    } catch {
      // keep plain text response
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function listPets(filters: PetFilters): Promise<Pet[]> {
  const params = new URLSearchParams();

  if (filters.search.trim()) {
    params.set('search', filters.search.trim());
  }

  if (filters.species.trim()) {
    params.set('species', filters.species.trim());
  }

  if (filters.availability === 'available') {
    params.set('available', 'true');
  }

  if (filters.availability === 'unavailable') {
    params.set('available', 'false');
  }

  const query = params.toString();
  return request<Pet[]>(`/api/pets${query ? `?${query}` : ''}`);
}

export function createPet(payload: PetFormPayload): Promise<Pet> {
  return request<Pet>('/api/pets', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updatePet(id: number, payload: PetFormPayload): Promise<Pet> {
  return request<Pet>(`/api/pets/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deletePet(id: number): Promise<void> {
  return request<void>(`/api/pets/${id}`, {
    method: 'DELETE',
  });
}
