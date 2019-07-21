import React, { Component } from 'react';
import { Container, Root, Toast } from 'native-base';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import Roboto from 'native-base/Fonts/Roboto.ttf';
import RobotoMedium from 'native-base/Fonts/Roboto_medium.ttf';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import AppContext from './components/utils/appContext';
import Sidebar from './components/shell/sidebar';
import Feed from './views/feed';
import Calendar from './views/calendar';
import Mess from './views/mess';
import Map from './views/map';
import Admin from './views/admin';
import Profile from './views/profile';
import { AppLoading } from 'expo';
import axios from 'axios';

const _loadFonts = () => {
  console.log('Called');
  return Font.loadAsync({
    Roboto: Roboto,
    Roboto_medium: RobotoMedium
  });
};

const _loadAssets = () => {
  return Asset.loadAsync([
    require('./assets/cover.jpg'),
    require('./assets/profile-pic.png')
  ]);
};

const pages = {
  Feed: { screen: Feed },
  Calendar: { screen: Calendar },
  Admin: { screen: Admin },
  Mess: { screen: Mess },
  Profile: { screen: Profile },
  Map: { screen: Map }
};

const Drawer = createDrawerNavigator(pages, {
  initialRouteName: 'Calendar',
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
    details: {},
    appIsReady: false
  };

  login = async (username, password) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'https://lifeiitk.tk/api/users/auth/login/',
        data: `username=${username}&password=${password}`,
        withCredentials: true
      })
        .then(res => {
          // GET PROFILE DETAILS
          axios({
            method: 'get',
            url: 'https://lifeiitk.tk/api/users/profile/',
            withCredentials: true
          })
            .then(res => this.setState({ details: res.data }))
            .catch(err => {
              Toast.show({
                text: 'An unexpected error occured.',
                duration: 3000
              });
              console.log(err);
            });
          // SET STATE TO LOGGED IN
          this.setState({ loggedIn: true });
          resolve(res);
        })
        .catch(err => reject(err));
    });
  };

  logout = async () => {
    return new Promise(resolve => {
      axios
        .get('https://lifeiitk.tk/api/users/auth/logout/', {
          withCredentials: true
        })
        .then(() => {
          this.setState({ loggedIn: false, details: {} });
          resolve();
        })
        .catch(() => reject());
    });
  };

  handleLog = async (username, password, mode) => {
    if (mode === 'logout') return this.logout();
    else return this.login(username, password);
  };

  checkIfLoggedIn = () => {
    return new Promise(resolve => {
      axios
        .get('https://lifeiitk.tk/api/users/profile/', {
          withCredentials: true
        })
        .then(res => this.setState({ loggedIn: true, details: res.data }))
        .catch(() => this.setState({ loggedIn: false, details: {} }))
        .finally(() => resolve());
    });
  };

  componentWillMount = () => {
    Promise.all([this.checkIfLoggedIn(), _loadAssets(), _loadFonts()])
      .then(() => this.setState({ appIsReady: true }))
      .catch(err => console.log(err));
  };

  render() {
    if (!this.state.appIsReady) return <AppLoading />;
    else {
      return (
        <Root>
          <Container>
            <AppContext.Provider
              value={{ state: { ...this.state }, log: this.handleLog }}
            >
              <AppContainer />
            </AppContext.Provider>
          </Container>
        </Root>
      );
    }
  }
}

export default App;
