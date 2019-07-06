import React, { Component } from 'react';
import { Spinner, Content, Text } from 'native-base';
import EventCard from '../components/admin/eventCard';
import { ScrollView } from 'react-native-gesture-handler';
import TopBar from '../components/shell/topbar';
import UserProfile from '../components/profile/userProfile';

class Profile extends Component {
  
  render() {
    return (
      <React.Fragment>
        <TopBar pgName="Profile" navigation={this.props.navigation} />
        <UserProfile />
      </React.Fragment>
    );
  }
}

export default Profile;
