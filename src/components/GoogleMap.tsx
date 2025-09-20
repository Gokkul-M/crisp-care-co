import React, { useCallback, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Star } from 'lucide-react';

interface LaundererLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  rating: number;
  status: 'available' | 'busy' | 'offline';
  estimatedTime: string;
  services: string[];
}

interface MapComponentProps {
  center: { lat: number; lng: number };
  laundrers?: LaundererLocation[];
  showUserLocation?: boolean;
  onMapClick?: (event: google.maps.MapMouseEvent) => void;
  height?: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  clickableIcons: false,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
};

const MapComponent: React.FC<MapComponentProps> = ({
  center,
  laundrers = [],
  showUserLocation = true,
  onMapClick,
  height = '100vh',
}) => {
  const [selectedMarker, setSelectedMarker] = useState<LaundererLocation | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    // Optional: Store map instance if needed
  }, []);

  const onUnmount = useCallback(() => {
    // Cleanup if needed
  }, []);

  return (
    <div style={{ height }} className="relative">
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}
        loadingElement={
          <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center">
            <div className="text-muted-foreground">Loading map...</div>
          </div>
        }
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={onMapClick}
          options={mapOptions}
        >
          {/* User Location Marker */}
          {showUserLocation && (
            <Marker
              position={center}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#6366f1',
                fillOpacity: 1,
                strokeWeight: 3,
                strokeColor: '#ffffff',
              }}
              title="Your Location"
            />
          )}

          {/* Launderer Markers */}
          {laundrers.map((launderer) => (
            <Marker
              key={launderer.id}
              position={{ lat: launderer.lat, lng: launderer.lng }}
              onClick={() => setSelectedMarker(launderer)}
              icon={{
                path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                scale: 6,
                fillColor: launderer.status === 'available' ? '#10b981' : 
                          launderer.status === 'busy' ? '#f59e0b' : '#6b7280',
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: '#ffffff',
              }}
            />
          ))}

          {/* Info Window */}
          {selectedMarker && (
            <InfoWindow
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">{selectedMarker.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{selectedMarker.rating}</span>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${
                      selectedMarker.status === 'available' ? 'bg-green-500' : 
                      selectedMarker.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`} />
                    <span className="capitalize">{selectedMarker.status}</span>
                  </div>
                  <p>ETA: {selectedMarker.estimatedTime}</p>
                  <p className="text-xs text-gray-500">
                    Services: {selectedMarker.services.join(', ')}
                  </p>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;