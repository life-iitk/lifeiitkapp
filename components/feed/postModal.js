import React from 'react';
import { StyleSheet } from 'react-native';
import { CardItem, Text, Button, Left, Body, Right } from 'native-base';
import { Modal } from 'react-native';
import UserAvatar from 'react-native-user-avatar';

const PostModal = props => {
  const post = props.post;
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.open}
      onRequestClose={props.onClose}
    >
      <CardItem bordered>
        <Left>
          {/* <Thumbnail source={EVENT_ICON} /> */}
          <UserAvatar size={50} name={post.tags[0].name} color="#334393" />
          <Body>
            <Text>{post.title}</Text>
            <Text note>{post.tags[0].name}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <Text style={style.dtv} note>
          {props.time} | {props.date} | {post.venue}{' '}
        </Text>
      </CardItem>
      <CardItem>
        {post.hash_tags.map((tag, index) => (
          <Button key={index} small rounded bordered>
            <Text>{tag}</Text>
          </Button>
        ))}
      </CardItem>
      <CardItem>
        <Text>{post.description}</Text>
      </CardItem>
      <CardItem footer>
        <Left />
        <Right>
          <Button onPress={props.onClose}>
            <Text>Back</Text>
          </Button>
        </Right>
      </CardItem>
    </Modal>
  );
};

export default PostModal;

const style = StyleSheet.create({
  dtv: {
    textTransform: 'uppercase',
    fontWeight: '100'
  }
});
