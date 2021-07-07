import React, { useState } from 'react';
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const Map = compose(
    withProps({
      /**
       * Note: create and replace your own key in the Google console.
       * https://console.developers.google.com/apis/dashboard
       * The key "" can be ONLY used in this sandbox (no forked).
       */
      googleMapURL:
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
  )(props => {
      const [marker, setMarker] = useState(props.data);

      const handleSetMarker = (data) => {
        setMarker(data);
      }

      if(props.data === null) {
          return (
            <GoogleMap defaultZoom={8}  defaultCenter={{ lat: -34.397 , lng: 150.644}} >
            </GoogleMap>
          )
      }
      console.log("props>>>>>", marker)

      const {latlng} = props?.data;
      return (
        <GoogleMap defaultZoom={2}  center={{ lat: latlng ? latlng[0] : -34.397 , lng: latlng ? latlng[1] :  150.644}} >
            <Marker position={{ lat: latlng?.[0], lng: latlng?.[1] }} onClick={()=>handleSetMarker(props.data)}>
            {marker ?
                <InfoWindow onCloseClick={()=>setMarker(null)}>
                    <div>
                        <p><b>Region:</b>{marker.subregion}</p>
                        <p><b>Country:</b>{marker.name}</p>
                        <p><b>Population:</b>{marker.population}</p>
                    </div>
                </InfoWindow>
                :
                (
                    null
                )
            }
            </Marker>
        </GoogleMap>
  )
});

export default Map;