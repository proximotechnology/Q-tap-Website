'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    iconUrl: '/leaflet/marker-icon.png',
    shadowUrl: '/leaflet/marker-shadow.png',
});

// Component to handle map clicks
function LocationMarker({ onSelect }) {
    const [position, setPosition] = useState(null);

    useMapEvents({
        click(e) {
            const coords = [e.latlng.lat, e.latlng.lng];
            setPosition(coords);
            onSelect(coords);
        },
    });

    return position ? (
        <Marker position={position}>
            <Popup>
                You selected this location: <br />
                Lat: {position[0].toFixed(5)}, Lng: {position[1].toFixed(5)}
            </Popup>
        </Marker>
    ) : null;
}

function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 15); // 15 is a good zoom level for user location
    }
  }, [position, map]);
  return null;
}

export default function MapView({setUserPosition}) {
    const [position, setPosition] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    useEffect(() => {
        if (!navigator.geolocation) {
            console.warn('Geolocation not supported');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const coords = [pos.coords.latitude, pos.coords.longitude];
                setPosition(coords);
            },
            (err) => {
                console.warn('Geolocation error:', err);
            }
        );
    }, []);
    return (
        <div>
            <MapContainer center={position ||[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%', zIndex: '3' }}>
                <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker onSelect={(coords) => {setSelectedLocation(coords); setUserPosition(coords) }} />
                <RecenterMap position={position} />
            </MapContainer>

            {selectedLocation && (
                <div className="mt-4 text-sm">
                    📍 Selected Coordinates: <br />
                    <strong>Latitude:</strong> {selectedLocation[0]} <br />
                    <strong>Longitude:</strong> {selectedLocation[1]}
                </div>
            )}
        </div>
    );
}
