import React from 'react';
import { Modal } from 'react-native';
import {
  Header,
  Left,
  Body,
  Right,
  Content,
  Form,
  Textarea,
  Item,
  Input,
  Title,
  Text,
  DatePicker,
  CheckBox,
  ListItem,
  Button,
  Icon,
  CardItem
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

const NewEvent = props => {
  const [error, showError] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [startVis, setStartVis] = React.useState(false);
  const [startTime, setStartTime] = React.useState(new Date());
  const [endVis, setEndVis] = React.useState(false);
  const [endTime, setEndTime] = React.useState(new Date());
  const [tags, setTags] = React.useState(['pclub', 'git', 'bash']);
  const [dayLong, setDayLong] = React.useState(false);
  const [hashtag, setHashtag] = React.useState('');
  const [textData, setTextData] = React.useState({
    title: '',
    description: '',
    summary: '',
    venue: ''
  });

  const addEvent = () => {
    showError(false);
    isValid = true;
    Object.keys(textData).forEach(field => {
      if (textData[field] === '') isValid = false;
    });
    if (!isValid) return showError(true);
    props.add({
      ...textData,
      date: moment(date).format('YYYY-MM-DD'),
      start_time: moment(startTime).format('HH:mm:ss'),
      end_time: moment(endTime).format('HH:mm:ss'),
      day_long: dayLong,
      hash_tags: tags
    });
  };

  const deleteTag = tag => {
    const newTags = [...tags];
    const index = newTags.findIndex(t => t === tag);
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const addTag = () => {
    const newTags = [...tags];
    if (newTags.find(t => t.toUpperCase() === hashtag.toUpperCase())) return;
    newTags.push(hashtag);
    setTags(newTags);
  };

  setFormData = (e, field) => {
    const newData = { ...textData };
    newData[field] = e.nativeEvent.text;
    setTextData(newData);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.open}
      onRequestClose={props.onClose}
    >
      <Header>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" onPress={props.onClose} />
          </Button>
        </Left>
        <Body>
          <Title>Create New Event</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form>
          <Item>
            <Input
              placeholder="Title"
              onChange={e => setFormData(e, ['title'])}
            />
          </Item>
          <Item>
            <Input
              placeholder="Venue"
              onChange={e => setFormData(e, ['venue'])}
            />
          </Item>
          <Textarea
            rowSpan={3}
            bordered
            placeholder="Summary"
            onChange={e => setFormData(e, ['summary'])}
          />
          <Textarea
            rowSpan={5}
            bordered
            placeholder="Description"
            onChange={e => setFormData(e, ['description'])}
          />
          <ListItem onPress={() => setDayLong(!dayLong)}>
            {/* <Left> */}
            <CheckBox checked={dayLong} onPress={() => setDayLong(!dayLong)} />
            <Body>
              <Text>All day event</Text>
            </Body>
            {/* </Left> */}
          </ListItem>
          <Item>
            <DatePicker
              defaultDate={date}
              locale={'in'}
              animationType={'fade'}
              placeHolderText="Select event date"
              placeHolderTextStyle={{ color: '#334393' }}
              onDateChange={setDate}
            />
          </Item>
          <Item>
            <Button transparent onPress={() => setStartVis(true)}>
              <Text>SET START TIME: {moment(startTime).format('h:mm A')}</Text>
            </Button>
            <DateTimePicker
              mode={'time'}
              is24Hour={false}
              isVisible={startVis}
              onConfirm={setStartTime}
              onCancel={() => setStartVis(false)}
            />
          </Item>
          <Item>
            <Button transparent onPress={() => setEndVis(true)}>
              <Text>SET END TIME: {moment(endTime).format('h:mm A')}</Text>
            </Button>
            <DateTimePicker
              mode={'time'}
              is24Hour={false}
              isVisible={endVis}
              onConfirm={setEndTime}
              onCancel={() => setEndVis(false)}
            />
          </Item>
          <CardItem>
            <Left style={{ flexWrap: 'wrap' }}>
              {tags.map(tag => (
                <Button iconLeft small rounded bordered>
                  <Icon
                    type="Entypo"
                    name="cross"
                    onPress={() => deleteTag(tag)}
                  />
                  <Text>{tag}</Text>
                </Button>
              ))}
            </Left>
          </CardItem>
          <Item>
            <Input
              placeholder="Add hashtags"
              onChange={e => setHashtag(e.nativeEvent.text)}
            />
            <Button transparent onPress={addTag}>
              <Icon name="ios-add" />
            </Button>
          </Item>
          {error && (
            <Text style={{ color: 'red' }}>
              Invalid: Title, Venue, Description and Summary are required.
            </Text>
          )}
          <Button onPress={addEvent}>
            <Text>Add Event</Text>
          </Button>
        </Form>
      </Content>
    </Modal>
  );
};

export default NewEvent;
