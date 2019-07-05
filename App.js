import React, { Component } from 'react';
import { Container, Header } from 'native-base';
import AppFontLoader from './components/utils/appFontLoader';

class App extends Component {
  render() {
    return (
      <AppFontLoader>
        <Container>{/* Add component for testing here */}</Container>
      </AppFontLoader>
    );
  }
}

export default App;
