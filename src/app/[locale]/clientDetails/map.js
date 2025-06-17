'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// Fix Leaflet's marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x.src,
    iconUrl: markerIcon.src,
    shadowUrl: markerShadow.src,
});
// Component to handle map clicks
function LocationMarker({ onSelect, defaultPos = null }) {
    const [position, setPosition] = useState(defaultPos);

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
                {/* Lat: {position[0].toFixed(5)}, Lng: {position[1].toFixed(5)} */}
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

export default function MapView({ setUserPosition, currentPos = null }) {
    const [position, setPosition] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    useEffect(() => {
        if (!navigator.geolocation) {
            console.warn('Geolocation not supported');
            return;
        }
        if (!currentPos) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const coords = [pos.coords.latitude, pos.coords.longitude];
                    setPosition(coords);
                },
                (err) => {
                    console.warn('Geolocation error:', err);
                }
            );
        }
        else {
            const coords = [currentPos[0], currentPos[1]];

            setSelectedLocation(coords);
            setPosition(coords);
        }
    }, []);
    return (
        <div>
            <MapContainer center={position || [51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%', zIndex: '3' }}>
                <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker defaultPos={currentPos} onSelect={(coords) => {
                    setSelectedLocation(coords);
                    setUserPosition(coords);
                }} />
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
