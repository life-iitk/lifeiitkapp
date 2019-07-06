import React from 'react';
import { StyleSheet } from 'react-native';
import {
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Input,
  Right,
  Item
} from 'native-base';
import { Modal } from 'react-native';

const LoginModal = props => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.open}
      onRequestClose={props.onClose}
      style={style.modal}
    >
      <CardItem bordered>
        <Text>
            Login
        </Text>
      </CardItem>      
      <CardItem>
        <Item regular>
          <Input placeholder='Username' />
        </Item>
      </CardItem>
      <CardItem>
        <Item regular>
          <Input placeholder='Password' />
        </Item>
      </CardItem>
      <CardItem footer>
        <Left />
        <Right>
          <Button onPress={props.onClose}>
            <Text>Login</Text>
          </Button>
        </Right>
      </CardItem>
    </Modal>
  );
};

export default LoginModal;

const style = StyleSheet.create({
  dtv: {
    textTransform: 'uppercase',
    fontWeight: '100'
  },
  modal: {
    backgroundColor: '#111'
  }
});
