import { useEffect, useMemo, useState } from 'react';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import {
  Alert,
  Button,
  Chip,
  Container,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { createPet, deletePet, listPets, updatePet } from './api/pets';
import { FilterBar } from './components/FilterBar';
import { PetCard } from './components/PetCard';
import { PetFormDialog } from './components/PetFormDialog';
import type { Pet, PetFilters, PetFormPayload, PetFormValues } from './types';
import { emptyPetForm } from './types';
import { formatPeso } from './utils/currency';

const defaultFilters: PetFilters = {
  search: '',
  species: '',
  availability: 'all',
};

function toPayload(values: PetFormValues): PetFormPayload {
  const breed = values.breed.trim();

  return {
    name: values.name.trim(),
    species: values.species.trim(),
    breed: breed ? breed : null,
    age: Number(values.age),
    description: values.description.trim(),
    imageUrl: values.imageUrl.trim(),
    adoptionFee: Number(values.adoptionFee),
    available: values.available,
  };
}

function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filters, setFilters] = useState<PetFilters>(defaultFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [activePet, setActivePet] = useState<Pet | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadPets = async (nextFilters = filters) => {
    setLoading(true);
    setError(null);

    try {
      const result = await listPets(nextFilters);
      setPets(result);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Failed to load pets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const speciesOptions = useMemo(() => {
    return Array.from(new Set(pets.map((pet) => pet.species))).sort((left, right) => left.localeCompare(right));
  }, [pets]);

  const stats = useMemo(() => {
    const availableCount = pets.filter((pet) => pet.available).length;
    const totalFee = pets.reduce((sum, pet) => sum + pet.adoptionFee, 0);

    return {
      total: pets.length,
      available: availableCount,
      averageFee: pets.length ? totalFee / pets.length : 0,
    };
  }, [pets]);

  const openCreateDialog = () => {
    setActivePet(null);
    setDialogMode('create');
    setDialogOpen(true);
  };

  const openEditDialog = (pet: Pet) => {
    setActivePet(pet);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  const handleSubmit = async (values: PetFormValues) => {
    setSaving(true);
    setError(null);

    try {
      const payload = toPayload(values);
      if (dialogMode === 'create') {
        await createPet(payload);
      } else if (activePet) {
        await updatePet(activePet.id, payload);
      }

      setDialogOpen(false);
      await loadPets();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to save pet');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (pet: Pet) => {
    const shouldDelete = window.confirm(`Remove ${pet.name} from the catalog?`);
    if (!shouldDelete) {
      return;
    }

    setDeletingId(pet.id);
    setError(null);

    try {
      await deletePet(pet.id);
      await loadPets();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete pet');
    } finally {
      setDeletingId(null);
    }
  };

  const handleBuy = async (pet: Pet) => {
    if (!pet.available) {
      setError(`${pet.name} has already been purchased.`);
      return;
    }

    const shouldBuy = window.confirm(`Buy ${pet.name} for ${formatPeso(pet.adoptionFee)}?`);
    if (!shouldBuy) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await updatePet(pet.id, {
        name: pet.name,
        species: pet.species,
        breed: pet.breed,
        age: pet.age,
        description: pet.description,
        imageUrl: pet.imageUrl,
        adoptionFee: pet.adoptionFee,
        available: false,
      });
      await loadPets();
      window.alert(`${pet.name} has been purchased successfully.`);
    } catch (buyError) {
      setError(buyError instanceof Error ? buyError.message : 'Unable to complete purchase');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.28),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(45,212,191,0.24),_transparent_32%),linear-gradient(180deg,_#fffaf3_0%,_#f7f0e8_48%,_#f0e7da_100%)] text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[linear-gradient(135deg,rgba(15,23,42,0.08),rgba(15,118,110,0.04),rgba(234,88,12,0.06))] opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:38px_38px] opacity-[0.08]" />

      <Container maxWidth="xl" className="relative py-10 md:py-14">
        <header className="relative mb-10 overflow-hidden rounded-[2.5rem] border border-white/70 bg-slate-950 text-white shadow-glow">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(45,212,191,0.16),transparent_34%)]" />
          <div className="relative grid gap-8 px-6 py-8 md:px-10 md:py-10 xl:grid-cols-[1.5fr_0.9fr] xl:items-end">
            <div className="space-y-5">
              <Chip icon={<PetsRoundedIcon />} label="Petstore catalog" className="!bg-white/10 !text-white" />
              <div className="space-y-4">
                <Typography variant="h2" className="!font-display !text-4xl !font-bold !leading-tight md:!text-6xl">
                  A polished pet catalog with real CRUD behavior.
                </Typography>
                <Typography className="max-w-2xl !text-base !leading-7 !text-slate-200 md:!text-lg">
                  Browse pets, filter the gallery, and manage listings through a Spring Boot API backed by PostgreSQL.
                  The layout is deliberately editorial and more tactile than a standard demo screen.
                </Typography>
              </div>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                <Chip label={`${stats.total} pets`} className="!bg-white/10 !text-white" />
                <Chip label={`${stats.available} available`} className="!bg-white/10 !text-white" />
                <Chip label={`Average fee ${formatPeso(stats.averageFee)}`} className="!bg-white/10 !text-white" />
              </Stack>
            </div>

            <Paper className="rounded-[2rem] bg-white/10 p-6 text-white backdrop-blur-xl">
              <Stack spacing={3}>
                <div>
                  <Typography variant="overline" className="!tracking-[0.35em] !text-white/70">
                    Control Center
                  </Typography>
                  <Typography variant="h5" className="!font-display !font-bold">
                    Manage your catalog without leaving the page.
                  </Typography>
                </div>
                <Stack direction="row" spacing={2}>
                  <Button startIcon={<AddRoundedIcon />} variant="contained" color="secondary" onClick={openCreateDialog} fullWidth>
                    Add pet
                  </Button>
                  <Button startIcon={<RefreshRoundedIcon />} variant="outlined" color="inherit" onClick={() => loadPets()}>
                    Refresh
                  </Button>
                </Stack>
                <Typography className="!text-sm !leading-6 !text-white/75">
                  API base: {import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'}
                </Typography>
              </Stack>
            </Paper>
          </div>
        </header>

        <main className="space-y-6 pb-14">
          {error ? <Alert severity="error">{error}</Alert> : null}
          {loading ? <LinearProgress className="rounded-full" /> : null}

          <FilterBar filters={filters} speciesOptions={speciesOptions} onChange={setFilters} />

          <section className="grid gap-6 lg:grid-cols-[1fr_280px]">
            <div className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <Typography variant="h4" className="!font-display !font-bold">
                    Featured pets
                  </Typography>
                  <Typography className="!text-slate-600">
                    A gallery built to feel like a boutique adoption board.
                  </Typography>
                </div>
                <Button startIcon={<AddRoundedIcon />} variant="contained" onClick={openCreateDialog}>
                  New pet
                </Button>
              </div>

              {pets.length === 0 && !loading ? (
                <Paper className="rounded-[2rem] border border-dashed border-slate-300 bg-white/70 p-10 text-center">
                  <Typography variant="h5" className="!font-display !font-bold">
                    No pets matched your filters.
                  </Typography>
                  <Typography className="!mt-2 !text-slate-600">
                    Clear the filters or add a new pet to populate the gallery.
                  </Typography>
                </Paper>
              ) : null}

              <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                {pets.map((pet) => (
                  <PetCard
                    key={pet.id}
                    pet={pet}
                    onEdit={openEditDialog}
                    onDelete={handleDelete}
                    onBuy={handleBuy}
                  />
                ))}
              </div>
            </div>

            <aside className="space-y-4">
              <Paper className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-glow backdrop-blur-xl">
                <Typography variant="overline" className="!tracking-[0.35em] !text-slate-500">
                  Quick Stats
                </Typography>
                <div className="mt-4 space-y-4">
                  <div className="rounded-[1.5rem] bg-slate-950 px-5 py-4 text-white">
                    <Typography className="!text-sm !uppercase !tracking-[0.3em] !text-white/60">
                      Total listings
                    </Typography>
                    <Typography variant="h3" className="!font-display !font-bold">
                      {stats.total}
                    </Typography>
                  </div>
                  <div className="rounded-[1.5rem] bg-emerald-50 px-5 py-4">
                    <Typography className="!text-sm !uppercase !tracking-[0.3em] !text-emerald-700">
                      Ready to adopt
                    </Typography>
                    <Typography variant="h4" className="!font-display !font-bold !text-emerald-950">
                      {stats.available}
                    </Typography>
                  </div>
                  <div className="rounded-[1.5rem] bg-amber-50 px-5 py-4">
                    <Typography className="!text-sm !uppercase !tracking-[0.3em] !text-amber-700">
                      Average fee
                    </Typography>
                    <Typography variant="h4" className="!font-display !font-bold !text-amber-950">
                      {formatPeso(stats.averageFee)}
                    </Typography>
                  </div>
                </div>
              </Paper>
            </aside>
          </section>
        </main>
      </Container>

      <PetFormDialog
        open={dialogOpen}
        mode={dialogMode}
        pet={activePet}
        saving={saving || deletingId !== null}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
