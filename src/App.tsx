import React from 'react';
import ArtTable from './components/ArtTable';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>Artworks Table</h1>
      <ArtTable />
      {/* <SelectionPanel /> */}
    </div>
  );
};

export default App;
