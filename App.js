import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
// import FeedPost from './components/feed/feedPost';
import AppFontLoader from './components/utils/appFontLoader';

class App extends Component {
  render() {
    return (
      <AppFontLoader>
        <View style={styles.container}>
          {/* <FeedPost post={require('./assets/fetchedPost.json')} /> */}
        </View>
      </AppFontLoader>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
