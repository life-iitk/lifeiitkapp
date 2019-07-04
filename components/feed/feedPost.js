import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from 'native-base';
import PostModal from './postModal';

// // Later on in your component

const FeedPost = props => {
  const [open, setOpen] = React.useState(false);
  const post = props.post;
  const time = `${post.start_time.slice(0, 5)} - ${post.end_time.slice(0, 5)}`;
  let dtIndexes = post.date.split('-');
  let date = new Date(...dtIndexes).toString();
  date = date.slice(0, date.indexOf(':') - 8);
  return (
    <Container>
      <Header />
      <Content>
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
      </Content>
    </Container>
  );
};

export default FeedPost;

const style = StyleSheet.create({
  dtv: {
    textTransform: 'uppercase',
    fontWeight: '100'
  }
});
