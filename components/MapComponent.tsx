"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default marker icon issue in Next.js/Webpack
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Mock Hospitals Data
const mockHospitals = [
  { id: 1, name: "든든 내과", type: "내과", lat: 37.5665, lng: 126.9780, waitTime: "15분" },
  { id: 2, name: "튼튼 동물병원", type: "동물병원", lat: 37.5655, lng: 126.9770, waitTime: "대기없음" },
  { id: 3, name: "24시 서울병원", type: "24시간", lat: 37.5675, lng: 126.9790, waitTime: "30분" },
];

function RecenterAutomatically({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
}

export default function MapComponent() {
  // Default to Seoul City Hall
  const [position, setPosition] = useState<[number, number]>([37.5665, 126.9780]);

  useEffect(() => {
    // Try to get actual user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        (error) => console.log("Geolocation error:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={position} 
        zoom={15} 
        scrollWheelZoom={false} 
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <RecenterAutomatically lat={position[0]} lng={position[1]} />

        {/* User Location */}
        <Marker position={position} icon={icon}>
          <Popup>
            <div className="text-center font-bold">현재 위치</div>
          </Popup>
        </Marker>

        {/* Hospitals */}
        {mockHospitals.map(hospital => (
          <Marker 
            key={hospital.id} 
            position={[hospital.lat, hospital.lng]} 
            icon={icon}
          >
            <Popup>
              <div className="min-w-[120px]">
                <h3 className="font-bold text-sm mb-1">{hospital.name}</h3>
                <span className="inline-block px-2 text-[10px] bg-gray-100 rounded text-gray-600 mb-2">
                  {hospital.type}
                </span>
                <p className="text-xs text-red-500 font-medium">대기: {hospital.waitTime}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Target button floating over map */}
      <button 
        className="absolute bottom-6 right-6 z-[400] w-12 h-12 bg-white rounded-full shadow-lg border border-[var(--color-border)] flex items-center justify-center text-xl text-gray-700 hover:text-black transition-colors"
        onClick={() => {
          if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(
               (pos) => setPosition([pos.coords.latitude, pos.coords.longitude])
             );
          }
        }}
      >
        🎯
      </button>
    </div>
  );
}
