import React from 'react';
import { Card, Picker, Left, CardItem, Button, Icon } from 'native-base';

const AddCourse = props => {
  const [dept, setDept] = React.useState(Object.keys(props.courses)[0]);
  const [code, setCode] = React.useState(props.courses[dept][0]);

  const changeDept = dept => {
    setDept(dept);
    setCode(props.courses[dept][0]);
  };

  return (
    <Card>
      <CardItem>
        <Left>
          <Picker
            style={{ width: 120 }}
            selectedValue={dept}
            onValueChange={changeDept}
          >
            {Object.keys(props.courses).map(dept => (
              <Picker.Item label={dept} value={dept} key={dept} />
            ))}
          </Picker>
          <Picker
            style={{ width: 120 }}
            selectedValue={code}
            onValueChange={code => setCode(code)}
          >
            {props.courses[dept].map(code => (
              <Picker.Item label={code} value={code} key={code} />
            ))}
          </Picker>
          <Button outline primary onPress={() => props.add(dept, code)}>
            <Icon name="ios-add" />
          </Button>
        </Left>
      </CardItem>
    </Card>
  );
};

export default AddCourse;
