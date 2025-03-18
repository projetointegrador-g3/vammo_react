import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const GoogleMaps = () => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDZfwkfAwqIuSqptD4P4grrdwWFwc6rRKk',
    });

    const position = {
      lat: -23.541546, 
      lng: -46.626646,
    }


    return (
    <div className='map'>
    {isLoaded ? (
      <GoogleMap
        mapContainerStyle={{width: '100%', height: '80%'}}
        center={position}
        zoom={15}
      >
        <Marker position={position} options={{
          label: {
            text: 'Posição inicial',
            fontSize: '16px',
            fontWeight: 'bold',
            className: 'map-marker',
          }
          
        }}/>
      </GoogleMap>
    ) : (
      <></>
    )}
    </div>
    )
  }

export default GoogleMaps
