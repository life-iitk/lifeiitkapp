import React, { Component } from 'react';
import { Content, Spinner, Segment, Button, Text } from 'native-base';
import TopBar from '../components/shell/topbar';
import UserProfile from '../components/profile/userProfile';
import AcadInfo from '../components/profile/acadInfo';

getAllCourses = set => {
  axios.get('http://localhost:8000/acads/all/').then(response => {
    const courseData = {};
    response.data.forEach(e => {
      const i = e.code.search(/[\d]+/g);
      const dept = e.code.substring(0, i);
      const code = e.code.substring(i);
      if (!courseData[dept]) courseData[dept] = [code];
      else courseData[dept].push(code);
    });
    set(courseData);
  });
};

const pgSwitcher = (set, page) => {
  return (
    <Segment>
      <Button first active={!page} onPress={() => set(0)}>
        <Text>Profile</Text>
      </Button>
      <Button last active={!!page} onPress={() => set(1)}>
        <Text>Courses</Text>
      </Button>
    </Segment>
  );
};

class Profile extends Component {
  state = { details: [], page: 0, allCourses: {}, loaded: false };

  componentDidMount = () => {
    // GET ALL COURSES LIST
    getAllCourses(data => this.setState({ allCourses: data }));
    // FETCH USER DETAILS HERE
    this.getProfile();
    // OR USE HARDCODED USER DETAILS
    // setTimeout(() => {
    //   this.setState({
    //     details: require('../assets/userInfo.json'),
    //     allCourses: require('../assets/courses.json'),
    //     loaded: true
    //   });
    // }, 1000);
  };

  getProfile = () => {
    axios
      .get('http://localhost:8000/users/profile', { withCredentials: true })
      .then(res => this.setState({ details: res.data, loaded: true }))
      .catch(err => console.log(err));
  };

  addCourse = (dept, code) => {
    // ADD HERE
    if (this.state.details.acads.find(c => c.code === dept + code)) return true;
    else {
      axios({
        method: 'put',
        url: 'http://localhost:8000/users/acads/',
        data: { code: dept + code },
        withCredentials: true
      })
        .then(getCourses)
        .catch(err => console.log(err));
      return false;
    }
  };

  deleteCourse = course => {
    // DELETE HERE
    axios({
      method: 'delete',
      url: 'http://localhost:8000/users/course/delete/',
      data: { code: course.code },
      withCredentials: true
    })
      .then(getCourses)
      .catch(err => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <TopBar
          pgName="Profile"
          navigation={this.props.navigation}
          segment={pgSwitcher(p => this.setState({ page: p }), this.state.page)}
        />
        <Content padder>
          {!this.state.loaded ? (
            <Spinner color="blue" />
          ) : !this.state.page ? (
            <UserProfile data={this.state.details} />
          ) : (
            <AcadInfo
              add={this.addCourse}
              delete={this.deleteCourse}
              acads={this.state.details.acads}
              courses={this.state.allCourses}
            />
          )}
        </Content>
      </React.Fragment>
    );
  }
}

export default Profile;
