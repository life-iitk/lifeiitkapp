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
  Toast
} from 'native-base';
import AddCourse from './picker';

const AcadInfo = props => {
  const [loaded, setLoaded] = React.useState(
    !!Object.keys(props.courses).length
  );

  const add = (dept, code) => {
    const exists = props.add(dept, code);
    if (exists)
      Toast.show({
        text: 'Course already added.',
        duration: 3000
      });
    else {
      setLoaded(false);
      props.add(dept, code);
    }
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
              <Button transparent onPress={() => props.delete(course)}>
                <Icon type="AntDesign" name="delete" style={{ color: 'red' }} />
              </Button>
            </Right>
          </ListItem>
        ))}
      </List>
      {loaded && <AddCourse courses={props.courses} add={add} />}
    </React.Fragment>
  );
};

export default AcadInfo;
