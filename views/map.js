import React from 'react';
import { Segment, Button, Text, Content } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from '../components/map/mapView';
import TopBar from '../components/shell/topbar';
import campusMap from '../assets/campusMap.jpg';
import academicMap from '../assets/academicAreaMap.jpg';
import locations from '../assets/locations.json';

const { width, height } = Dimensions.get('window');

const pgSwitcher = (set, page) => (
  <Segment>
    <Button first active={!page} onPress={() => set(0)}>
      <Text>Campus Map</Text>
    </Button>
    <Button last active={!!page} onPress={() => set(1)}>
      <Text>Academic Area</Text>
    </Button>
  </Segment>
);

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
      height: 2588,
      width: 2759
    }
  };

  render() {
    const view = this.state.selectedView
      ? this.state.acadsArea
      : this.state.campus;
    return (
      <React.Fragment>
        <TopBar
          pgName="Map"
          navigation={this.props.navigation}
          segment={pgSwitcher(
            pg => this.setState({ selectedView: pg }),
            this.state.selectedView
          )}
        />
        <Content>
          <MapView
            style={styles.image}
            source={view.map}
            imageHeight={view.height}
            imageWidth={view.width}
            markers={view.locations}
          />
        </Content>
      </React.Fragment>
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
