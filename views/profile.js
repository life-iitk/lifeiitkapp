import React, { Component } from 'react';
import { Content, Spinner, Segment, Button, Text, Toast } from 'native-base';
import TopBar from '../components/shell/topbar';
import UserProfile from '../components/profile/userProfile';
import AcadInfo from '../components/profile/acadInfo';
import axios from 'axios';

const getAllCourses = set => {
  axios.get('https://lifeiitk.tk/api/acads/all/').then(response => {
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

const getAllTags = set => {
  axios
    .get('https://lifeiitk.tk/api/tags/all/')
    .then(res => set(res.data))
    .catch(err => {
      console.log(err);
      Toast.show({ text: 'An unexpected error occured.', duration: 3000 });
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
  state = { details: [], page: 0, allCourses: {}, allTags: [], loaded: false };

  componentDidMount = () => {
    this.sub = this.props.navigation.addListener('didFocus', () => {
      this.setState({ loaded: false });
      this.getProfile();
    });
    // GET ALL COURSES AND TAGS LIST
    getAllCourses(data => this.setState({ allCourses: data }));
    getAllTags(data => this.setState({ allTags: data }));
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

  componentWillUnmount = () => this.sub.remove();

  getProfile = () => {
    axios
      .get('https://lifeiitk.tk/api/users/profile/', { withCredentials: true })
      .then(res => this.setState({ details: res.data, loaded: true }))
      .catch(err => console.log(err));
  };

  updateLink = link => {
    this.setState({ loaded: false });
    axios({
      method: 'put',
      url: 'https://lifeiitk.tk/api/users/',
      data: { fblink: link },
      withCredentials: true
    })
      .then(() => {
        this.getProfile();
        Toast.show({ text: 'Updated successfully!', duration: 3000 });
      })
      .catch(err => {
        this.setState({ loaded: true });
        Toast.show({
          text: 'An error occured. Please try again later.',
          duration: 3000
        });
      });
  };

  addTag = tag => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: 'https://lifeiitk.tk/api/users/tags/',
        data: { name: tag.name },
        withCredentials: true
      })
        .then(res => {
          this.getProfile();
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  };

  deleteTag = tag => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: 'https://lifeiitk.tk/api/users/tags/delete/',
        data: { tag_id: tag.tag_id },
        withCredentials: true
      })
        .then(res => {
          this.getProfile();
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  };

  addCourse = (dept, code) => {
    // ADD HERE
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: 'https://lifeiitk.tk/api/users/acads/',
        data: { code: dept + code },
        withCredentials: true
      })
        .then(res => {
          this.setState({ loaded: false });
          this.getProfile();
          resolve(res);
        })
        .catch(err => reject(err));
    });
  };

  deleteCourse = course => {
    // DELETE HERE
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: 'https://lifeiitk.tk/api/users/course/delete/',
        data: { code: course.code },
        withCredentials: true
      })
        .then(res => {
          this.setState({ loaded: false });
          this.getProfile();
          resolve(res);
        })
        .catch(err => reject(err));
    });
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
            <UserProfile
              data={this.state.details}
              updateLink={this.updateLink}
              allTags={this.state.allTags}
              add={this.addTag}
              delete={this.deleteTag}
            />
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
