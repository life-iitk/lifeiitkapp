import React, { Component } from 'react';
import { Container } from 'native-base';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import AppFontLoader from './components/utils/appFontLoader';
import Sidebar from './components/shell/sidebar';
import Calendar from './views/calendar';
import Feed from './views/feed';
import Admin from './views/admin';

const pages = {
  Feed: { screen: Feed },
  Calendar: { screen: Calendar },
  Admin: { screen: Admin }
};

const Drawer = createDrawerNavigator(pages, {
  initialRouteName: 'Feed',
  contentOptions: {
    activeTintColor: '#e91e63'
  },
  contentComponent: props => <Sidebar {...props} />
});

const AppNavigator = createStackNavigator(
  { ...pages, Drawer: { screen: Drawer } },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  state = {
    loggedIn: false,
    details: {}
  };
  render() {
    return (
      <AppFontLoader>
        <Container>
          <AppContainer />
        </Container>
      </AppFontLoader>
    );
  }
}

export default App;
