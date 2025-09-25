import React from 'react';

interface MapComponentProps {
  center: { lat: number; lng: number };
  laundrers?: { lat: number; lng: number }[];
  customerLocation?: { lat: number; lng: number };
  showUserLocation?: boolean;
  height: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ center, laundrers, customerLocation, height }) => {
  // Construct the URL for Google Maps embed
  let mapSrc = `https://maps.google.com/maps?q=${center.lat},${center.lng}&z=14&output=embed`;

  if (laundrers && laundrers.length > 0) {
    const markers = laundrers.map(l => `&markers=color:blue%7Clabel:L%7C${l.lat},${l.lng}`).join('');
    mapSrc += markers;
  }

  if (customerLocation) {
    mapSrc += `&markers=color:red%7Clabel:C%7C${customerLocation.lat},${customerLocation.lng}`;
  }

  return (
    <iframe
      title="Google Map"
      src={mapSrc}
      width="100%"
      height={height}
      style={{ border: 0 }}
      allowFullScreen={false}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default MapComponent;
