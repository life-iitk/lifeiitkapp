import React from 'react';
import {
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Icon,
  Button,
  Toast,
  Spinner
} from 'native-base';
import AddCourse from './picker';

const AcadInfo = props => {
  const [loaded, setLoaded] = React.useState(
    !!Object.keys(props.courses).length
  );

  const add = async (dept, code) => {
    if (props.acads.find(c => c.code === dept + code))
      Toast.show({
        text: 'Course already added.',
        duration: 3000
      });
    else {
      try {
        setLoaded(false);
        await props.add(dept, code);
        Toast.show({ text: 'Course added successfully!', duration: 3000 });
      } catch (err) {
        Toast.show({
          text: 'An error occured. Try again later.',
          duration: 3000
        });
      }
      setLoaded(true);
    }
  };

  const deleteCourse = async course => {
    try {
      setLoaded(false);
      await props.delete(course);
      Toast.show({ text: 'Course removed successfully!', duration: 3000 });
    } catch (err) {
      Toast.show({
        text: 'An error occured. Try again later.',
        duration: 3000
      });
    }
    setLoaded(true);
  };

  return (
    <React.Fragment>
      <List>
        {props.acads.map(course => (
          <ListItem key={course.course_id}>
            <Left>
              <Icon type="Entypo" name="chevron-thin-right" />
              <Body>
                <Text>{course.name}</Text>
                <Text note>{course.code}</Text>
              </Body>
            </Left>
            <Right>
              <Button transparent onPress={() => deleteCourse(course)}>
                <Icon type="AntDesign" name="delete" style={{ color: 'red' }} />
              </Button>
            </Right>
          </ListItem>
        ))}
      </List>
      {!loaded ? (
        <Spinner color="blue" />
      ) : (
        <AddCourse courses={props.courses} add={add} />
      )}
    </React.Fragment>
  );
};

export default AcadInfo;
