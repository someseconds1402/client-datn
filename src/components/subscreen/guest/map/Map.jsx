import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  const defaultCenter = {
    lat: 40.712776,
    lng: -74.005974,
  };

  return (
    <LoadScript googleMapsApiKey="mapStyles" libraries={['places']} loadingElement={<div>Loading...</div>} >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

// import React, {useEffect, useState} from 'react';
// import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

// const Map = () => {
//   const mapStyles = {
//     height: '400px',
//     width: '100%',
//   };

//   const defaultCenter = {
//     lat: 21.0285,
//     lng: 105.8542, // Tọa độ Hà Nội
//   };

//   const destination = {
//     lat: 20.8449,
//     lng: 106.6881, // Tọa độ Hải Phòng
//   };

//   const [directions, setDirections] = useState(null);

//   useEffect(() => {
//     const directionsService = new window.google.maps.DirectionsService();
//     directionsService.route(
//       {
//         origin: defaultCenter,
//         destination: destination,
//         travelMode: 'DRIVING',
//       },
//       (result, status) => {
//         if (status === 'OK') {
//           setDirections(result);
//         } else {
//           console.error('Directions request failed:', status);
//         }
//       }
//     );
//   }, []);

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8" libraries={['places']} loadingElement={<div>Loading...</div>} >
//       <GoogleMap mapContainerStyle={mapStyles} zoom={8} center={defaultCenter}>
//         {directions && <DirectionsRenderer directions={directions} />}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default Map;
