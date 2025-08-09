"use client";

import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { Droplet } from 'lucide-react';
import Image from 'next/image';

const locations = [
  { lat: 29.9511, lng: -90.0715, name: 'Mississippi River', level: 'high' },
  { lat: 30.0687, lng: -89.9314, name: 'Lake Pontchartrain', level: 'elevated' },
  { lat: 29.9245, lng: -90.0673, name: 'Algiers Point', level: 'normal' },
  { lat: 29.3019, lng: -89.9638, name: 'Barataria Bay', level: 'elevated' },
];

const levelColors = {
  normal: 'green',
  elevated: 'orange',
  high: 'red',
};

type Location = typeof locations[0];

export const MapComponent = () => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY';
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  if (!API_KEY || API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY') {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted text-center p-4">
        <div className="text-center">
          <p className="mb-2">Map Unavailable</p>
          <p className="text-xs text-muted-foreground">
            To enable the map, please provide your Google Maps API key in a
            <code className="mx-1 rounded bg-muted-foreground/20 px-1 py-0.5 text-xs">
              .env.local
            </code>
            file:
          </p>
          <pre className="mt-2 rounded-md bg-muted-foreground/20 p-2 text-left text-xs">
            <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY</code>
          </pre>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        mapId="flood-risk-map"
        defaultCenter={{ lat: 29.9511, lng: -90.0715 }}
        defaultZoom={10}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        className="w-full h-full rounded-lg"
      >
        {locations.map((loc, index) => (
          <AdvancedMarker
            key={index}
            position={loc}
            onClick={() => setSelectedLocation(loc)}
          >
            <Droplet className="w-8 h-8" style={{ color: levelColors[loc.level as keyof typeof levelColors] }} />
          </AdvancedMarker>
        ))}
        {selectedLocation && (
          <InfoWindow
            position={selectedLocation}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h3 className="font-bold">{selectedLocation.name}</h3>
              <p>Water Level: <span className="capitalize font-semibold" style={{ color: levelColors[selectedLocation.level as keyof typeof levelColors] }}>{selectedLocation.level}</span></p>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
};
