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
  ListItem,
  Grid,
  Row,
  Col
} from "native-base";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";

const UserProfile = props => {
  return (
    <Content padder>
      <ScrollView>
        <Card>
          <CardItem>
            <Left />
            <Body>
              <Image
                style={{ width: 80, height: 80 }}
                source={{
                  uri:
                    "https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png"
                }}
              />
            </Body>
            <Right />
          </CardItem>
          <CardItem>
            <Grid>
              <Row style = {{padding: 5}}>     
                <Left>
                <Icon name="md-person" style={{fontSize: 26, width: 30 }}/>
                <Text style={{padding: 5}}>Name</Text>
                </Left>           
                <Content>
                  <Text style={{padding: 5}}>Tanvi</Text>
                </Content>                    
              </Row>
              <Row style = {{padding: 5}}>     
                <Left>
                <Icon type="AntDesign" name="idcard" style={{fontSize: 26, width: 30 }}/>
                <Text style={{padding: 5}}>Roll Number</Text>
                </Left>           
                <Content>
                  <Text style={{padding: 5}}>180819</Text>
                </Content>                    
              </Row>
              <Row style = {{padding: 5}}>     
                <Left>
                <Icon type="FontAwesome" name="university" style={{fontSize: 26, width: 30 }}/>
                <Text style={{padding: 5}}>Program</Text>
                </Left>           
                <Content>
                  <Text style={{padding: 5}}>B.Tech</Text>
                </Content>                    
              </Row>
              <Row style = {{padding: 5}}>     
                <Left>
                <Icon type="MaterialCommunityIcons" name="office-building" style={{fontSize: 26, width: 30 }}/>
                <Text style={{padding: 5}}>Department</Text>
                </Left>           
                <Content>
                  <Text style={{padding: 5}}>EE</Text>
                </Content>                    
              </Row>
              <Row style = {{padding: 5}}>     
                <Left>
                <Icon type="Entypo" name="home" style={{fontSize: 26, width: 30 }}/>
                <Text style={{padding: 5}}>Address</Text>
                </Left>           
                <Content>
                  <Text style={{padding: 5}}>B-404, Hall 6</Text>
                </Content>                    
              </Row>
              <Row style = {{padding: 5}}>     
                <Left>
                <Icon type="MaterialCommunityIcons" name="home-city-outline" style={{fontSize: 26, width: 30 }}/>
                <Text style={{padding: 5}}>Hometown</Text>
                </Left>           
                <Content>
                  <Text style={{padding: 5}}>Bengaluru, Karnataka</Text>
                </Content>                    
              </Row>
              <Row style = {{padding: 5}}>     
                <Left>
                <Icon type="Entypo" name="mail" style={{fontSize: 26, width: 30 }}/>
                <Text style={{padding: 5}}>Email</Text>
                </Left>           
                <Content>
                  <Text style={{padding: 5}}>tanvin@iitk.ac.in</Text>
                </Content>                    
              </Row>
              <Row style = {{padding: 5}}>     
                <Left>
                <Icon type="Entypo" active name="facebook" style={{fontSize: 26, width: 30 }}/>
                <Text style={{padding: 5}}>Facebook</Text>
                </Left>
                  <Right>
                    <Icon type="Entypo" name="edit" />
                  </Right>
              </Row>
            </Grid>
            </CardItem>
        </Card>
        <Card>
          <CardItem header>
            <Text>Positions of Responsibility</Text>
          </CardItem>
          <CardItem>
            <Grid>
              <Row style={{padding: 5}}>                
                  <Icon active type="MaterialIcons" name="stars" />                
                  <Text style={{paddingTop: 2}}>Secretary, Programming Club</Text>                
              </Row>
              <Row style={{padding: 5}}>                
                  <Icon active type="MaterialIcons" name="stars" />                
                  <Text style={{paddingTop: 2}}>Secretary, English Literary Society</Text>                
              </Row>
              <Row style={{padding: 5}}>                
                  <Icon active type="MaterialIcons" name="stars" />                
                  <Text style={{paddingTop: 2}}>Secretary, Quiz Club</Text>                
              </Row>
            </Grid>
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
