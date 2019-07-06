import React from 'react';
import {
  ListItem,
  Left,
  Icon,
  Text,
  Container,
  Content,
  List,
  Thumbnail,
  Body,
  CardItem,
} from 'native-base';
import { Image } from 'react-native';
import styles from './style';

const pages = [
  { name: 'Feed', icon: 'logo-rss', route: 'Feed' },
  { name: 'Calendar', icon: 'md-calendar', route: 'Calendar' },
  { name: 'Mess', icon: 'cutlery', type: 'FontAwesome', route: 'Mess' },
  { name: 'Map', icon: 'md-map', route: 'Map' },
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
        <CardItem button onPress={() => props.navigation.navigate("Profile")} bordered>
          <Left>
          <Thumbnail 
            source={{uri: "https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png"}}
            style={{marginRight: 10}}
          />         
            <Body>
              <Text>
                Name
              </Text>
              <Text note>
                180000
              </Text>
            </Body>            
        </Left>
        </CardItem>
        
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
