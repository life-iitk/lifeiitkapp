import React, { Component } from 'react';
import { Spinner, Content, Fab, Icon } from 'native-base';
import EventCard from '../components/admin/eventCard';
import TopBar from '../components/shell/topbar';
import axios from 'axios';
import NewEvent from '../components/admin/newEvent';

class Admin extends Component {
  state = {
    events: [],
    evLoaded: false,
    boxOpen: false,
    tag: this.props.navigation.getParam('tag', {})
  };

  componentDidMount = () => {
    // FETCH EVENTS HERE
    this.getEvents();
    // OR USE HARDCODED EVENTS
    // const events = new Array(3).fill(require('../assets/fetchedPost.json'));
    // setTimeout(() => {
    //   this.setState({ events: events, evLoaded: true });
    // });
  };

  componentDidUpdate = prevProps => {
    if (prevProps.navigation.getParam('tag', {}) === this.state.tag) return;
    this.setState({ evLoaded: true });
    this.getEvents();
  };

  getEvents = () => {
    axios
      .get(
        'http://localhost:8000/events/view/tagged_events/?tag_name=' +
          this.state.tag,
        { withCredentials: true }
      )
      .then(res => this.setState({ events: res.data, evLoaded: true }))
      .catch(err => console.log(err));
  };

  addEvent = data => {
    this.setState({ boxOpen: false, evLoaded: false });
    axios({
      method: 'post',
      url: 'http://localhost:8000/events/create/',
      data: { ...data, tag: this.state.tag },
      withCredentials: true
    })
      .then(this.getEvents)
      .catch(err => console.log(err));
  };

  handleDelete = post => {
    this.setState({ evLoaded: false });
    // Send delete request
    axios({
      method: 'delete',
      url: 'http://localhost:8000/events/delete/',
      data: { event_id: post.event_id },
      withCredentials: true
    })
      .then(this.getEvents())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <TopBar pgName="Admin" navigation={this.props.navigation} />
        <Content>
          {!this.state.evLoaded ? (
            <Spinner color="blue" />
          ) : (
            <React.Fragment>
              {this.state.events.map(event => (
                <EventCard
                  post={event}
                  delete={this.handleDelete}
                  key={event.event_id}
                />
              ))}
            </React.Fragment>
          )}
        </Content>
        {this.state.evLoaded && (
          <Fab
            style={{ backgroundColor: '#334393' }}
            onPress={() => this.setState({ boxOpen: true })}
            position="bottomRight"
          >
            <Icon name="ios-add" />
          </Fab>
        )}
        <NewEvent
          open={this.state.boxOpen}
          onClose={() => this.setState({ boxOpen: false })}
          add={this.addEvent}
        />
      </React.Fragment>
    );
  }
}

export default Admin;
