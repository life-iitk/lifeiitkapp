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

const AVATAR_PIC =
  'https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png';
const COVER_PIC = 'http://home.iitk.ac.in/~nishankm/lib.jpg';

const pages = [
  { name: 'Feed', icon: 'logo-rss', route: 'Feed', loginReq: true },
  { name: 'Calendar', icon: 'md-calendar', route: 'Calendar', loginReq: false },
  {
    name: 'Mess',
    icon: 'cutlery',
    type: 'FontAwesome',
    route: 'Mess',
    loginReq: false
  },
  { name: 'Map', icon: 'md-map', route: 'Map', loginReq: false }
  // { name: 'Admin', icon: 'ios-settings', route: 'Admin' }
];

const adminPages = [];

const Sidebar = props => {
  return (
    <AppContext.Consumer>
      {state => (
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: '#fff', top: -1 }}
        >
          <Image source={{ uri: COVER_PIC }} style={styles.drawerCover} />
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
                source={{
                  uri: state.state.details.image
                    ? state.state.details.image
                    : AVATAR_PIC
                }}
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

          <List
            dataArray={pages}
            renderRow={(page, index) =>
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
            }
          />
          {state.state.details.owned && (
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
