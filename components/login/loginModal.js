import React from 'react';
import { StyleSheet } from 'react-native';
import {
  CardItem,
  Text,
  Button,
  Left,
  Input,
  Right,
  Item,
  Spinner,
  Toast,
  Header,
  Body,
  Title,
  Icon
} from 'native-base';
import { Modal } from 'react-native';

const LoginModal = props => {
  const [id, setId] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      await props.login(username, password);
      props.onClose();
    } catch (err) {
      setLoading(false);
      Toast.show({
        text: 'Incorrect username/password',
        duration: 3000
      });
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.open}
      onRequestClose={props.onClose}
      style={style.modal}
    >
      <Header>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" onPress={props.onClose} />
          </Button>
        </Left>
        <Body>
          <Title>Login</Title>
        </Body>
        <Right />
      </Header>
      <CardItem>
        <Item regular>
          <Input
            placeholder="Username"
            onChange={e => setId(e.nativeEvent.text)}
          />
        </Item>
      </CardItem>
      <CardItem>
        <Item regular>
          <Input
            placeholder="Password"
            secureTextEntry={true}
            onChange={e => setPwd(e.nativeEvent.text)}
          />
        </Item>
      </CardItem>
      <CardItem footer>
        <Left />
        <Right>
          {loading ? (
            <Spinner color="blue" />
          ) : (
            <Button onPress={() => login(id, pwd)}>
              <Text>Login</Text>
            </Button>
          )}
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
