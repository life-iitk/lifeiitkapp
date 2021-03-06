import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Spinner, Content, Toast } from 'native-base';
import TopBar from '../components/shell/topbar';
import FeedPost from '../components/feed/feedPost';
import axios from 'axios';

class Feed extends Component {
  state = { events: [], evLoaded: false, refreshing: false };

  componentDidMount = () => {
    this.sub = this.props.navigation.addListener('didFocus', () => {
      this.setState({ evLoaded: false });
      this.getItems();
    });
    // FETCH POSTS HERE
    this.getItems();
    // OR USE HARDCODED EVENTS
    // const events = new Array(4).fill(require('../assets/fetchedPost.json'));
    // setTimeout(() => {
    //   this.setState({ events: events, evLoaded: true, refreshing: false });
    // }, 2000);
  };

  componentWillUnmount = () => {
    this.sub.remove();
  };

  getItems = () => {
    axios
      .get('https://lifeiitk.tk/api/events/feed/', { withCredentials: true })
      .then(res =>
        this.setState({ events: res.data, evLoaded: true, refreshing: false })
      )
      .catch(err => {
        console.log(err);
        this.setState({ evLoaded: true, refreshing: false });
        Toast.show({
          text: 'An error occured while getting your feed. Try again later.',
          duration: 3000
        });
      });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getItems();
  };

  render() {
    return (
      <React.Fragment>
        <TopBar pgName="Feed" navigation={this.props.navigation} />
        <Content
          padder
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              enabled={this.state.evLoaded}
              colors={['blue']}
            />
          }
        >
          {!this.state.evLoaded ? (
            <Spinner color="blue" />
          ) : (
            <React.Fragment>
              {this.state.events.map(event => (
                <FeedPost post={event} key={event.event_id} />
              ))}
            </React.Fragment>
          )}
        </Content>
      </React.Fragment>
    );
  }
}

export default Feed;
