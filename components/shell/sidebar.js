import React from 'react';
import {
  ListItem,
  Left,
  Icon,
  Text,
  Content,
  List,
  Thumbnail,
  Body,
  CardItem,
  Separator
} from 'native-base';
import { Image } from 'react-native';
import AppContext from '../utils/appContext';
import styles from './style';

const AVATAR_PIC = require('../../assets/profile-pic.png');
const COVER_PIC = require('../../assets/cover.jpg');

const pages = [
  { name: 'Feed', icon: 'logo-rss', route: 'Feed', loginReq: false },
  { name: 'Calendar', icon: 'md-calendar', route: 'Calendar', loginReq: false },
  {
    name: 'Mess',
    icon: 'cutlery',
    type: 'FontAwesome',
    route: 'Mess',
    loginReq: false
  },
  { name: 'Map', icon: 'md-map', route: 'Map', loginReq: false }
];

const Sidebar = props => {
  return (
    <AppContext.Consumer>
      {state => (
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: '#fff', top: -1 }}
        >
          <Image source={COVER_PIC} style={styles.drawerCover} />
          {/* <Image square style={styles.drawerImage} source={drawerImage} /> */}
          <CardItem
            button
            onPress={() =>
              !!state.state.details.roll && props.navigation.navigate('Profile')
            }
            bordered
          >
            <Left>
              <Thumbnail
                source={
                  state.state.details.image
                    ? { uri: state.state.details.image }
                    : AVATAR_PIC
                }
                style={{ marginRight: 10 }}
              />
              <Body>
                <Text>
                  {!state.state.details.name
                    ? 'Not logged in'
                    : state.state.details.name}
                </Text>
                {!!state.state.details.roll && (
                  <Text note>{state.state.details.roll}</Text>
                )}
              </Body>
            </Left>
          </CardItem>
          <List>
            {pages.map(
              (page, index) =>
                (state.state.loggedIn || !page.loginReq) && (
                  <ListItem
                    button
                    noBorder
                    key={index}
                    onPress={() => props.navigation.navigate(page.route)}
                  >
                    <Left>
                      <Icon
                        active
                        name={page.icon}
                        type={page.type}
                        style={{ color: '#777', fontSize: 26, width: 30 }}
                      />
                      <Text style={styles.text}>{page.name}</Text>
                    </Left>
                  </ListItem>
                )
            )}
          </List>
          {!!state.state.details.roll &&
            state.state.details.owned.length !== 0 && (
              <React.Fragment>
                <Separator bordered>
                  <Text>Admin</Text>
                </Separator>
                <List>
                  {state.state.details.owned.map(tag => (
                    <ListItem
                      button
                      noBorder
                      key={tag.tag_id}
                      onPress={() =>
                        props.navigation.navigate('Admin', { tag: tag })
                      }
                    >
                      <Left>
                        <Icon
                          active
                          name="ios-settings"
                          style={{ color: '#777', fontSize: 26, width: 30 }}
                        />
                        <Text style={styles.text}>{tag.name}</Text>
                      </Left>
                    </ListItem>
                  ))}
                </List>
              </React.Fragment>
            )}
        </Content>
      )}
    </AppContext.Consumer>
  );
};

export default Sidebar;
