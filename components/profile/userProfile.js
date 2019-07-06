import React from "react";
import { StyleSheet, Image } from "react-native";
import {
  Card,
  CardItem,
  Text,
  Button,
  Left,
  Content,
  Body,
  Right,
  Header,
  Icon,
  List,
  ListItem
} from "native-base";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";

const UserProfile = props => {
  return (
    <Content>
      {/* <Header /> */}
      <ScrollView>
        <Card>
          <CardItem>
            <Left />
            <Body>
              <Image
                style={{ width: 80, height: 80 }}
                source={{
                  uri:
                    "https://facebook.github.io/react-native/docs/assets/favicon.png"
                }}
              />
            </Body>
            <Right />
          </CardItem>
          <CardItem>
            <Left>
              <Icon name="md-person" />
              <Text>Name:</Text>
            </Left>
            <Body>
              <Text>Chinmay</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Icon type="AntDesign" name="idcard" />
              <Text>Roll Number:</Text>
            </Left>
            <Body>
              <Text>180206</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Icon type="FontAwesome" name="university" />
              <Text>Program:</Text>
            </Left>
            <Body>
              <Text>B.Tech</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Icon type="MaterialCommunityIcons" name="office-building" />
              <Text>Department:</Text>
            </Left>
            <Body>
              <Text>CSE</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Icon type="Entypo" name="home" />
              <Text>Room:</Text>
            </Left>
            <Body>
              <Text>B320,Hall2</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Icon type="MaterialCommunityIcons" name="home-city-outline" />
              <Text>Hometown:</Text>
            </Left>
            <Body>
              <Text>Jaipur</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Icon type="Entypo" name="mail" />
              <Text>Email:</Text>
            </Left>
            <Body>
              <Text>chinmayg@iitk.ac.in</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Icon type="Entypo" active name="facebook" />
            <Text>Facebook</Text>
            <Right>
              <Icon type="Entypo" name="edit" />
            </Right>
          </CardItem>
        </Card>
        <Card>
          <CardItem header>
            <Text>Position of Responsibilities</Text>
          </CardItem>
          <CardItem>
            <List>
              <ListItem>
                <Text>Simon Mignolet</Text>
              </ListItem>
              <ListItem>
                <Text>Nathaniel Clyne</Text>
              </ListItem>
              <ListItem>
                <Text>Dejan Lovren</Text>
              </ListItem>
            </List>
          </CardItem>
        </Card>
        <Card>
          <CardItem header>
            <Text>Subscribed Tags</Text>
          </CardItem>
          <CardItem>
            <Body
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                flexWrap: "wrap"
              }}
            >
              <Button small rounded bordered style={style.button}>
                <Text>Hello</Text>
              </Button>
              <Button small rounded bordered style={style.button}>
                <Text>Hello</Text>
              </Button>
              <Button small rounded bordered style={style.button}>
                <Text>Hello</Text>
              </Button>
              <Button small rounded bordered style={style.button}>
                <Text>Hello</Text>
              </Button>
              <Button small rounded bordered style={style.button}>
                <Text>Hello</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </ScrollView>
    </Content>
  );
};

export default UserProfile;

const style = StyleSheet.create({
  dtv: {
    textTransform: "uppercase",
    fontWeight: "100"
  },
  button: {
    margin: 4
  }
});
