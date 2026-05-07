import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { FormControl, InputAdornment, MenuItem, Select, TextField } from '@mui/material';

import type { PetFilters } from '../types';

type FilterBarProps = {
  filters: PetFilters;
  speciesOptions: string[];
  onChange: (next: PetFilters) => void;
};

export function FilterBar({ filters, speciesOptions, onChange }: FilterBarProps) {
  return (
    <section className="grid gap-4 rounded-[2rem] border border-white/60 bg-white/80 p-4 shadow-glow backdrop-blur-xl lg:grid-cols-[1.5fr_1fr_1fr]">
      <TextField
        value={filters.search}
        onChange={(event) => onChange({ ...filters, search: event.target.value })}
        placeholder="Search by name, breed, or species"
        fullWidth
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      <FormControl fullWidth size="small">
        <Select
          value={filters.species}
          onChange={(event) => onChange({ ...filters, species: event.target.value })}
          displayEmpty
        >
          <MenuItem value="">All species</MenuItem>
          {speciesOptions.map((species) => (
            <MenuItem key={species} value={species}>
              {species}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <Select
          value={filters.availability}
          onChange={(event) =>
            onChange({
              ...filters,
              availability: event.target.value as PetFilters['availability'],
            })
          }
        >
          <MenuItem value="all">All availability</MenuItem>
          <MenuItem value="available">Available</MenuItem>
          <MenuItem value="unavailable">Unavailable</MenuItem>
        </Select>
      </FormControl>
    </section>
  );
}
