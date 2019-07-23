import React from 'react';
import moment from 'moment';
import { Picker, Card, CardItem, Content } from 'native-base';
import MessContent from '../components/mess/messContent';
import TopBar from '../components/shell/topbar';
import messMenus from '../assets/messMenus.json';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const Mess = props => {
  const halls = Object.keys(messMenus);
  const [day, setDay] = React.useState(moment().isoWeekday() - 1);
  const [hall, setHall] = React.useState(halls[0]);
  // const menus = menuJSON['menus'];
  // const numOfHalls = menus.length;
  return (
    <React.Fragment>
      <TopBar pgName="Mess" navigation={props.navigation} />
      <Content padder>
        <Card>
          <CardItem
            bordered
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 10,
              paddingBottom: 10,
              minWidth: 120
            }}
          >
            <Picker
              mode="dropdown"
              selectedValue={hall}
              onValueChange={value => setHall(value)}
              style={{
                marginLeft: 10,
                marginRight: 10
              }}
            >
              {halls.map(hall => (
                <Picker.Item label={hall} value={hall} key={hall} />
              ))}
            </Picker>
          </CardItem>
          <CardItem
            bordered
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 10,
              paddingBottom: 10,
              minWidth: 120
            }}
          >
            <Picker
              mode="dropdown"
              selectedValue={day}
              onValueChange={value => setDay(value)}
              style={{
                marginLeft: 10,
                marginRight: 10
              }}
            >
              {days.map((day, index) => (
                <Picker.Item label={day} value={index} key={index} />
              ))}
            </Picker>
          </CardItem>
        </Card>
        <MessContent menu={messMenus[hall][day]} />
      </Content>
    </React.Fragment>
  );
};

export default Mess;
