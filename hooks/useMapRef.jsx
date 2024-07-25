import { useRef, useCallback } from "react";

export const useMapRef = () => {
  const mapRef = useRef(null);

  const setMapRef = useCallback((ref) => {
    mapRef.current = ref;
  }, []);

  const animateToRegion = useCallback((region, duration = 1000) => {
    console.log("INTENTASTE CAMBIAR LA REGION");
    if (mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: region.latitude,
            longitude: region.longitude,
          },
          pitch: 2,
          heading: 20,
          altitude: 200,
          zoom: 15,
        },
        { duration }
      );
    }
  }, []);

  return { mapRef, setMapRef, animateToRegion };
};
