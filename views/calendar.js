import React, { Component } from 'react';
import Strip from '../components/calendar/strip';
import FeedPost from '../components/feed/feedPost';
import TopBar from '../components/shell/topbar';
import moment from 'moment';
import axios from 'axios';
import { Spinner, Fab, Icon, Content } from 'native-base';
import FilterModal from '../components/calendar/filterModal';

class Calendar extends Component {
  state = {
    selectedDate: moment(),
    allEvents: [],
    filteredEvents: [],
    dots: [],
    tags: [],
    evLoaded: false,
    fOpen: false
  };

  componentDidMount = () => {
    // FETCH EVENTS
    this.getEvents();
    // OR USE HARDCODED EVENTS
    // const events = new Array(2).fill(require('../assets/fetchedPost.json'));
    // setTimeout(() => {
    //   this.setState({
    //     filteredEvents: events,
    //     allEvents: events,
    //     evLoaded: true,
    //     tags: this.getTags(events).map(t => ({ ...t, selected: true }))
    //   });
    //   this.renderDots(this.state.filteredEvents);
    // }, 2000);
  };

  getEvents = () => {
    this.setState({ evLoaded: false });
    const dt = this.state.selectedDate;
    let url = 'http://localhost:8000/events/view/month/';
    url += `?month=${dt.month() + 1}&year=${dt.year()}`;
    axios
      .get(url, { withCredentials: true })
      .then(events => {
        const filteredEvents = filterTags(events);
        this.renderDots(filteredEvents);
        this.setState({
          filteredEvents: filteredEvents,
          allEvents: events,
          evLoaded: true,
          tags: this.getTags(events).map(t => ({ ...t, selected: true }))
        });
      })
      .catch(err => console.log(err));
  };

  getTags = events => {
    const tags = [];
    events.forEach(ev => {
      const tag = ev.tags[0];
      if (!tags.includes(tag)) tags.push(tag);
    });
    return tags;
  };

  // Update date, fetch new events if month changes
  handleDateChange = newDate => {
    const oldDate = moment(this.state.selectedDate);
    this.setState({ selectedDate: newDate });
    if (oldDate.isSame(newDate, 'month')) return;
    this.getEvents();
  };

  // Filter given events by given tags
  filterTags = (events, tags) => {
    tags = tags.filter(tag => tag.selected);
    const filteredEvents = events.filter(event => {
      const evTag = event.tags[0];
      const index = tags.findIndex(tag => tag.tag_id === evTag.tag_id);
      return index > -1;
    });
    return filteredEvents;
  };

  // Get selectedDate week's events
  filterWeekly = events => {
    const filteredEvents = events.filter(event => {
      return moment(event.date).isSame(this.state.selectedDate, 'day');
    });
    return filteredEvents;
  };

  // Handle tag filter change
  filterHandler = tags => {
    this.setState({ fOpen: !this.state.fOpen });
    const filteredEvents = this.filterTags(this.state.allEvents, tags);
    this.renderDots(filteredEvents);
    this.setState({ filteredEvents: filteredEvents, tags: tags });
  };

  renderDots = events => {
    const dot = i => ({ key: i, color: '#fff', selectedDotColor: '#000' });
    const dots = [];
    events.forEach(event => {
      const evDate = moment(event.date);
      const isDot = dots.find(dot => dot.date.isSame(evDate, 'day'));
      if (!isDot) dots.push({ date: evDate, dots: [dot(event.event_id)] });
      else isDot.dots.push(dot(event.event_id));
    });
    this.setState({ dots: dots });
  };

  render() {
    return (
      <React.Fragment>
        <TopBar pgName="Calendar" navigation={this.props.navigation} />
        <Strip
          date={this.state.selectedDate}
          onChange={this.handleDateChange}
          dots={this.state.dots}
        />
        <Content padder>
          {!this.state.evLoaded ? (
            <Spinner color="#7743CE" />
          ) : (
            this.filterWeekly(this.state.filteredEvents).map((ev, index) => (
              <FeedPost post={ev} key={index} />
            ))
          )}
        </Content>
        {this.state.evLoaded && (
          <React.Fragment>
            <Fab
              style={{ backgroundColor: '#d40000' }}
              onPress={() => this.setState({ fOpen: true })}
              position="bottomRight"
            >
              <Icon type="FontAwesome" name="filter" />
            </Fab>
            <FilterModal
              open={this.state.fOpen}
              onClose={this.filterHandler}
              tags={this.state.tags}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Calendar;
