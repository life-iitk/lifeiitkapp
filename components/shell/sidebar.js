import React from 'react';
import {
  ListItem,
  Left,
  Icon,
  Text,
  Container,
  Content,
  List
} from 'native-base';
import { Image } from 'react-native';
import styles from './style';

const pages = [
  { name: 'Feed', icon: 'logo-rss', route: 'Feed' },
  { name: 'Calendar', icon: 'md-calendar', route: 'Calendar' },
  { name: 'Mess', icon: 'cutlery', type: 'FontAwesome', route: 'Mess' },
  { name: 'Map', icon: 'md-map', route: 'Map' },
  { name: 'Profile', icon: 'md-person', route: 'Profile' },
  { name: 'Admin', icon: 'ios-settings', route: 'Admin' }
];

const Sidebar = props => {
  return (
    <Container>
      <Content
        bounces={false}
        style={{ flex: 1, backgroundColor: '#fff', top: -1 }}
      >
        <Image
          source={{
            uri:
              'https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2019/04/08/Pictures/iit-kanpur-pics-fotobubbles-photographed-com-www_066436aa-5a15-11e9-bc51-70836f795c06.jpg'
          }}
          style={styles.drawerCover}
        />
        {/* <Image square style={styles.drawerImage} source={drawerImage} /> */}

        <List
          dataArray={pages}
          renderRow={page => (
            <ListItem
              button
              noBorder
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
          )}
        />
      </Content>
    </Container>
  );
};

export default Sidebar;
