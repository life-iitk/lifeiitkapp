import React, { Component } from 'react';
import { Container } from 'native-base';
import AppFontLoader from './components/utils/appFontLoader';

class App extends Component {
  render() {
    return (
      <AppFontLoader>
        <Container>{/* <Calendar /> */}</Container>
      </AppFontLoader>
    );
  }
}

export default App;
