import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Roboto from '../../node_modules/native-base/Fonts/Roboto.ttf';
import RobotoMedium from '../../node_modules/native-base/Fonts/Roboto_medium.ttf';

class AppFontLoader extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentWillMount() {
    try {
      await Font.loadAsync({
        Roboto: Roboto,
        Roboto_medium: RobotoMedium
      });

      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log('error loading fonts', error);
    }
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }

    return this.props.children;
  }
}

export default AppFontLoader;
