import React from "react";
import { View, Picker, Card, CardItem, Content, Body } from "native-base";
import MessContent from "./messContent";
import menuJSON from "./menu.json";
import moment from "moment";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const Mess = props => {
  const [day, setDay] = React.useState(moment().isoWeekday() - 1);
  const [hall, setHall] = React.useState(1);
  const menus = menuJSON["menus"];
  const numOfHalls = menus.length;
  return (
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
            {new Array(numOfHalls).fill(1).map((hall, index) => (
              <Picker.Item
                label={"Hall " + (index + 1)}
                value={index + 1}
                key={index}
              />
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
      <MessContent menu={menus[hall - 1][day]} />
    </Content>
  );
};

export default Mess;
