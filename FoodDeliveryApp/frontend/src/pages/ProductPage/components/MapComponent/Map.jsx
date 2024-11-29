import styles from "./map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { displayImage } from "../../../../utility/imageProcess";
import useImage from "../../../../customHook/useImage";

// Custom Icon
const customIcon = L.icon({
  iconUrl: "https://res.cloudinary.com/dtu64orvo/image/upload/v1732863753/locationMarker_b2jqwk.png",
  iconSize: [300, 140], // Adjust size as needed
});

const Map = () => {

  const imageURLs = useImage("page", "map");

  const position = [-32.97981455399372, 27.901114506360578]; // Replace with actual McDonald's lat/lng if available.

  return (
    <div className={styles.mapContainer}>
      <div className = {styles.information}>
        <h1>McDonald’s
        </h1>
        <h2>South London</h2>
        <img 
        id="map-information-content-1"
        src={displayImage(imageURLs, "map-information-content-1")}
        alt="content" />
      </div>
      <MapContainer className = {styles.map}
        center={position}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={customIcon}>
          <Popup>McDonald's in London</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
