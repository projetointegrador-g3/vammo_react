import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -23.55052,
  lng: -46.633308,
};

export default function MyMap() {
  return (
    <LoadScript googleMapsApiKey="SUA_CHAVE_API">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} />
    </LoadScript>
  );
}
