import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from '../components/map/mapView'
import campusMap from '../assets/campusMap.jpg'
import academicMap from '../assets/academicAreaMap.jpg'
import locations from '../assets/locations.json'

const { width, height } = Dimensions.get('window');


class Map extends React.Component {
	state = {
		selectedView: 0,
		campus: {
			map: campusMap,
			locations: locations.campusLocations,
			height: 2932,
			width: 2524
		},
		acadsArea: {
			map: academicMap,
			locations: locations.acadsAreaLocations,
			height: 842,
			width: 1280
		}
	}

  render() {
	  const view = this.state.selectedView ? this.state.acadsArea : this.state.campus;
    return (
        <MapView
            style={styles.image}
            source={ view.map }
            imageHeight={ view.height }
            imageWidth={ view.width }
            markers={ view.locations }
        />
    );
  }
}

const styles = StyleSheet.create({
    image: {
        height,
        width
    }
});

export default Map;
