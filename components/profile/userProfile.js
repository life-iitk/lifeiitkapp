import React from 'react';
import { StyleSheet, Image } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import {
  Card,
  CardItem,
  Text,
  Button,
  Left,
  Content,
  Body,
  Right,
  Icon,
  Grid,
  Row
} from 'native-base';
import AddTag from './addTag';

const UserProfile = props => {
  const [fbOpen, setFbOpen] = React.useState(false);
  const [tagOpen, setTagOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Card>
        <CardItem>
          <Left />
          <Body>
            <Image
              style={{ width: 80, height: 80 }}
              source={{ uri: props.data.image }}
            />
          </Body>
          <Right />
        </CardItem>
        <CardItem>
          <Grid>
            <Row style={{ padding: 5 }}>
              <Left>
                <Icon name="md-person" style={{ fontSize: 26, width: 30 }} />
                <Text style={{ padding: 5 }}>Name</Text>
              </Left>
              <Content>
                <Text style={{ padding: 5 }}>{props.data.name}</Text>
              </Content>
            </Row>
            <Row style={{ padding: 5 }}>
              <Left>
                <Icon
                  type="AntDesign"
                  name="idcard"
                  style={{ fontSize: 26, width: 30 }}
                />
                <Text style={{ padding: 5 }}>Roll Number</Text>
              </Left>
              <Content>
                <Text style={{ padding: 5 }}>{props.data.roll}</Text>
              </Content>
            </Row>
            <Row style={{ padding: 5 }}>
              <Left>
                <Icon
                  type="FontAwesome"
                  name="university"
                  style={{ fontSize: 26, width: 30 }}
                />
                <Text style={{ padding: 5 }}>Program</Text>
              </Left>
              <Content>
                <Text style={{ padding: 5 }}>{props.data.program}</Text>
              </Content>
            </Row>
            <Row style={{ padding: 5 }}>
              <Left>
                <Icon
                  type="MaterialCommunityIcons"
                  name="office-building"
                  style={{ fontSize: 26, width: 30 }}
                />
                <Text style={{ padding: 5 }}>Department</Text>
              </Left>
              <Content>
                <Text style={{ padding: 5 }}>{props.data.dept}</Text>
              </Content>
            </Row>
            <Row style={{ padding: 5 }}>
              <Left>
                <Icon
                  type="Entypo"
                  name="home"
                  style={{ fontSize: 26, width: 30 }}
                />
                <Text style={{ padding: 5 }}>Address</Text>
              </Left>
              <Content>
                <Text style={{ padding: 5 }}>
                  {props.data.room}, {props.data.hall}
                </Text>
              </Content>
            </Row>
            <Row style={{ padding: 5 }}>
              <Left>
                <Icon
                  type="MaterialCommunityIcons"
                  name="home-city-outline"
                  style={{ fontSize: 26, width: 30 }}
                />
                <Text style={{ padding: 5 }}>Hometown</Text>
              </Left>
              <Content>
                <Text style={{ padding: 5 }}>{props.data.hometown}</Text>
              </Content>
            </Row>
            <Row style={{ padding: 5 }}>
              <Left>
                <Icon
                  type="Entypo"
                  name="mail"
                  style={{ fontSize: 26, width: 30 }}
                />
                <Text style={{ padding: 5 }}>Email</Text>
              </Left>
              <Content>
                <Text style={{ padding: 5 }}>
                  {props.data.username}@iitk.ac.in
                </Text>
              </Content>
            </Row>
            <Row style={{ padding: 5 }}>
              <Left>
                <Icon
                  type="Entypo"
                  active
                  name="facebook"
                  style={{ fontSize: 26, width: 30 }}
                />
                <Text style={{ padding: 5 }}>Facebook</Text>
              </Left>
              <Right>
                <Button transparent onPress={() => setFbOpen(true)}>
                  <Icon type="Entypo" name="edit" style={{ color: '#888' }} />
                </Button>
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
            {Object.keys(props.data.por).map((club, index) => (
              <Row style={{ padding: 5 }} key={index}>
                <Icon active type="MaterialIcons" name="stars" />
                <Text style={{ paddingTop: 2 }}>
                  {props.data.por[club]}, {club}
                </Text>
              </Row>
            ))}
          </Grid>
        </CardItem>
      </Card>
      <Card>
        <CardItem header>
          <Left>
            <Text>Subscribed Tags</Text>
          </Left>
          <Right>
            <Button transparent onPress={() => setTagOpen(true)}>
              <Icon type="Entypo" name="edit" style={{ color: '#888' }} />
            </Button>
          </Right>
        </CardItem>
        <CardItem>
          <Body style={style.chipWrap}>
            {props.data.tags.map(tag => (
              <Button
                small
                rounded
                bordered
                key={tag.tag_id}
                style={style.button}
              >
                <Text>{tag.name}</Text>
              </Button>
            ))}
          </Body>
        </CardItem>
      </Card>
      <DialogInput
        isDialogVisible={fbOpen}
        title={'Facebook Link'}
        message={'Enter your facebook profile link below'}
        hintInput={'Link'}
        submitInput={props.updateLink}
        closeDialog={() => setFbOpen(false)}
      />
      <AddTag
        tags={props.data.tags}
        allTags={props.allTags}
        open={tagOpen}
        onClose={() => setTagOpen(false)}
        add={props.add}
        delete={props.delete}
      />
    </React.Fragment>
  );
};

export default UserProfile;

const style = StyleSheet.create({
  chipWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  button: {
    margin: 4
  }
});
