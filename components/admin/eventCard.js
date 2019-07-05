import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right
} from 'native-base';
import moment from 'moment';
import PostModal from '../feed/postModal';

const EventCard = props => {
  const [postOpen, setPostOpen] = React.useState(false);
  const post = props.post;
  const startTime = moment(post.start_time, 'HH:mm:ss');
  const endTime = moment(post.end_time, 'HH:mm:ss');
  const time = `${startTime.format('h:mm a')} - ${endTime.format('h:mm a')}`;
  const date = moment(post.date).format('ddd, MMM D');

  const onDelete = post => {
    Alert.alert(
      'Delete this event?',
      `Are you sure you want to delete the event '${
        post.title
      }'? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel', onPress: () => {} },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => props.delete(post)
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <React.Fragment>
      <Card>
        <CardItem bordered>
          <Left>
            <Thumbnail source={{ uri: 'https://picsum.photos/200' }} />
            <Body>
              <Text>{post.title}</Text>
              <Text note>{post.tags[0].name}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Text style={style.dtv} note>
            {time} | {date} | {post.venue}{' '}
          </Text>
        </CardItem>
        <CardItem>
          <Text>{post.summary}</Text>
        </CardItem>
        <CardItem>
          {post.hash_tags.map((tag, index) => (
            <Button key={index} small rounded bordered>
              <Text>#{tag}</Text>
            </Button>
          ))}
        </CardItem>
        <CardItem footer bordered>
          <Left>
            <Button small transparent onPress={() => setPostOpen(true)}>
              <Text>See More</Text>
            </Button>
          </Left>
          <Body />
          <Right>
            <Button small danger onPress={() => onDelete(post)}>
              <Text>Delete</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
      <PostModal
        open={postOpen}
        onClose={() => setPostOpen(false)}
        post={post}
        date={date}
        time={time}
      />
    </React.Fragment>
  );
};

export default EventCard;

const style = StyleSheet.create({
  dtv: {
    textTransform: 'uppercase',
    fontWeight: '100'
  }
});
