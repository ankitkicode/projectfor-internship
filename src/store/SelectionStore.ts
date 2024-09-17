import {create }from 'zustand';
import { Artwork } from '../types/Artwork';

type SelectionState = {
  selectedArtworks: Artwork[];
  setSelectedArtworks: (artworks: Artwork[]) => void;
};

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedArtworks: [],
  setSelectedArtworks: (artworks) => set({ selectedArtworks: artworks }),
}));
