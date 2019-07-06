import React, { Component } from 'react';
import { Spinner, Content } from 'native-base';
import EventCard from '../components/admin/eventCard';
import TopBar from '../components/shell/topbar';
import axios from 'axios';

class Admin extends Component {
  state = { events: [], evLoaded: false };

  componentDidMount = () => {
    // FETCH EVENTS HERE
    // this.getEvents();
    // OR USE HARDCODED EVENTS
    const events = new Array(3).fill(require('../assets/fetchedPost.json'));
    setTimeout(() => {
      this.setState({ events: events, evLoaded: true });
    });
  };

  getEvents = () => {
    axios
      .get(
        'http://localhost:8000/events/view/tagged_events/?tag_name=' +
          this.props.name,
        { withCredentials: true }
      )
      .then(res => this.setState({ events: res.data, evLoaded: true }))
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
      </React.Fragment>
    );
  }
}

export default Admin;
