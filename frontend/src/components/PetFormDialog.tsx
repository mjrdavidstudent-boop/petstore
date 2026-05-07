import { useEffect, useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, Switch, TextField } from '@mui/material';

import type { Pet, PetFormValues } from '../types';
import { emptyPetForm } from '../types';

type PetFormDialogProps = {
  open: boolean;
  mode: 'create' | 'edit';
  pet: Pet | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (values: PetFormValues) => void;
};

export function PetFormDialog({ open, mode, pet, saving, onClose, onSubmit }: PetFormDialogProps) {
  const [values, setValues] = useState<PetFormValues>(emptyPetForm);

  useEffect(() => {
    if (open && pet) {
      setValues({
        name: pet.name,
        species: pet.species,
        breed: pet.breed ?? '',
        age: String(pet.age),
        description: pet.description,
        imageUrl: pet.imageUrl,
        adoptionFee: String(pet.adoptionFee),
        available: pet.available,
      });
      return;
    }

    if (open) {
      setValues(emptyPetForm);
    }
  }, [open, pet]);

  const updateField = <K extends keyof PetFormValues>(field: K, value: PetFormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  return (
    <Dialog open={open} onClose={saving ? undefined : onClose} fullWidth maxWidth="md">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(values);
        }}
      >
        <DialogTitle className="!font-display !text-2xl !font-bold">
          {mode === 'create' ? 'Add a new pet' : 'Update pet profile'}
        </DialogTitle>
        <DialogContent className="space-y-4 !pt-2">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="Name" value={values.name} onChange={(event) => updateField('name', event.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="Species" value={values.species} onChange={(event) => updateField('species', event.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Breed" value={values.breed} onChange={(event) => updateField('breed', event.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="Age"
                inputProps={{ min: 0 }}
                value={values.age}
                onChange={(event) => updateField('age', event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="Adoption fee"
                inputProps={{ min: 0, step: 0.01 }}
                value={values.adoptionFee}
                onChange={(event) => updateField('adoptionFee', event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch checked={values.available} onChange={(event) => updateField('available', event.target.checked)} />}
                label="Available for adoption"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Image URL"
                value={values.imageUrl}
                onChange={(event) => updateField('imageUrl', event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                multiline
                minRows={4}
                label="Description"
                value={values.description}
                onChange={(event) => updateField('description', event.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="px-6 pb-6">
          <Button onClick={onClose} color="inherit" variant="outlined" disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? 'Saving...' : mode === 'create' ? 'Create pet' : 'Save changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
