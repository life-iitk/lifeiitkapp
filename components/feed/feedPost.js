import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, CardItem, Text, Button, Left, Body, Right } from 'native-base';
import UserAvatar from 'react-native-user-avatar';
import moment from 'moment';
import PostModal from './postModal';

const FeedPost = props => {
  const [open, setOpen] = React.useState(false);
  const post = props.post;
  const startTime = moment(post.start_time, 'HH:mm:ss');
  const endTime = moment(post.end_time, 'HH:mm:ss');
  const time = `${startTime.format('h:mm a')} - ${endTime.format('h:mm a')}`;
  const date = moment(post.date).format('ddd, MMM D');
  return (
    <View>
      <Card>
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
            {time} | {date} | {post.venue}{' '}
          </Text>
        </CardItem>
        <CardItem>
          <Text>{post.summary}</Text>
        </CardItem>
        <CardItem>
          {post.hash_tags.map((tag, index) => (
            <Button key={index} small rounded bordered>
              <Text>{tag}</Text>
            </Button>
          ))}
        </CardItem>
        <CardItem footer bordered>
          <Body />
          <Right>
            <Button small onPress={() => setOpen(true)}>
              <Text>See More</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
      <PostModal
        open={open}
        onClose={() => setOpen(false)}
        post={post}
        date={date}
        time={time}
      />
    </View>
  );
};

export default FeedPost;

const style = StyleSheet.create({
  dtv: {
    textTransform: 'uppercase',
    fontWeight: '100'
  }
});
