import React from 'react';

interface MapComponentProps {
  center: { lat: number; lng: number };
  laundrers: any[]; // Use a more specific type in a real app
  showUserLocation: boolean;
  height: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ height }) => {
  return (
    <div style={{ height, width: '100%', backgroundColor: '#e0e0e0' }}>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Google Map Placeholder</p>
      </div>
    </div>
  );
};

export default MapComponent;