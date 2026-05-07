import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import { Avatar, Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';

import type { Pet } from '../types';
import { formatPeso } from '../utils/currency';

type PetCardProps = {
  pet: Pet;
  onEdit: (pet: Pet) => void;
  onDelete: (pet: Pet) => void;
  onBuy: (pet: Pet) => void;
};

const speciesTones: Record<string, string> = {
  Dog: 'from-amber-400 via-orange-400 to-rose-400',
  Cat: 'from-sky-400 via-cyan-400 to-emerald-400',
  Rabbit: 'from-pink-400 via-fuchsia-400 to-violet-400',
  Bird: 'from-emerald-400 via-lime-400 to-yellow-400',
};

export function PetCard({ pet, onEdit, onDelete, onBuy }: PetCardProps) {
  const gradient = speciesTones[pet.species] ?? 'from-slate-400 via-stone-400 to-neutral-400';

  return (
    <Card className="group overflow-hidden rounded-[1.75rem] border border-white/60 bg-[#fffdf8]/95 shadow-[0_24px_60px_rgba(15,23,42,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
      <div className={`relative h-56 overflow-hidden bg-gradient-to-br ${gradient}`}>
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="h-full w-full object-cover opacity-92 transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <Chip
            icon={<PetsRoundedIcon />}
            label={pet.species}
            size="small"
            className="bg-white/90 font-medium"
          />
          <Chip
            icon={<FavoriteRoundedIcon />}
            label={pet.available ? 'Ready' : 'Adopted'}
            size="small"
            className={pet.available ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-200 text-slate-700'}
          />
        </div>
      </div>

      <CardContent className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Typography variant="h5" className="!font-display !text-2xl !font-bold !text-slate-900">
              {pet.name}
            </Typography>
            <Typography variant="body2" className="!mt-1 !text-slate-600">
              {pet.breed || 'Mixed lineage'} • {pet.age} years old
            </Typography>
          </div>
          <Avatar className="!h-12 !w-12 !bg-slate-900 !text-white">{pet.name.charAt(0)}</Avatar>
        </div>

        <Typography variant="body2" className="!leading-6 !text-slate-700">
          {pet.description}
        </Typography>

        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <Chip label={`Adoption fee ${formatPeso(pet.adoptionFee)}`} className="bg-slate-100" />
          <Chip label={`#${pet.id}`} className="bg-amber-50 text-amber-900" />
        </Stack>
      </CardContent>

      <CardActions className="flex flex-wrap items-center justify-between gap-2 px-6 pb-6 pt-0">
        <div className="flex flex-wrap gap-2">
          <Button startIcon={<EditRoundedIcon />} onClick={() => onEdit(pet)} variant="contained">
            Edit
          </Button>
          <Button
            startIcon={<DeleteRoundedIcon />}
            onClick={() => onDelete(pet)}
            color="inherit"
            variant="outlined"
          >
            Remove
          </Button>
        </div>
        <Button
          startIcon={<FavoriteRoundedIcon />}
          onClick={() => onBuy(pet)}
          variant="contained"
          color="secondary"
          disabled={!pet.available}
        >
          {pet.available ? 'Buy now' : 'Purchased'}
        </Button>
      </CardActions>
    </Card>
  );
}
