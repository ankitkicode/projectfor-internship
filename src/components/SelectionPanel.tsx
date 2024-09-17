import React from 'react';
import { useSelectionStore } from '../store/SelectionStore';

const SelectionPanel: React.FC = () => {
  const { selectedArtworks } = useSelectionStore();

  return (
    <div className="selection-panel">
      <h3>Selected Artworks</h3>
      <ul>
        {selectedArtworks.map((art) => (
          <li key={art.id}>{art.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SelectionPanel;
