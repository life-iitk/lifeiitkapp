import React, { Component } from 'react';
import { Spinner, Content } from 'native-base';
import TopBar from '../components/shell/topbar';
import FeedPost from '../components/feed/feedPost';

class Feed extends Component {
  state = { events: [], evLoaded: false };

  componentDidMount = () => {
    // FETCH POSTS HERE
    // this.getItems();
    // OR USE HARDCODED EVENTS
    const events = new Array(4).fill(require('../assets/fetchedPost.json'));
    setTimeout(() => {
      this.setState({ events: events, evLoaded: true });
    }, 2000);
  };

  getItems() {
    axios
      .get('http://localhost:8000/events/feed', { withCredentials: true })
      .then(res => this.setState({ events: res.data, evLoaded: true }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <TopBar pgName="Feed" navigation={this.props.navigation} />
        <Content>
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
