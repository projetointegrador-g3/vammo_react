import { useState } from "react";
import mapboxgl from "mapbox-gl";

// Token do Mapbox
mapboxgl.accessToken = "pk.eyJ1IjoiZ3J1cG8wMy1qczA2IiwiYSI6ImNtN3htaW11YTAwb3Qya29md3pwNzJrd2MifQ.uB4DxvtKsao_3O9FPIYTFQ";

// Busca de endereços usando a API do Mapbox.
const useAddressSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchAddress = async (address: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${mapboxgl.accessToken}`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar endereço");
      }

      const data = await response.json();
      const location = data.features[0]?.center || null;
      
      return location;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { searchAddress, loading, error };
};

export default useAddressSearch;
