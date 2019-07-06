import React from 'react';
import { Modal } from 'react-native';
import {
  Header,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Button,
  Title,
  CheckBox
} from 'native-base';

const FilterModal = props => {
  const [tags, setTags] = React.useState(props.tags);

  const handlePress = i => {
    const newTags = [...tags];
    newTags[i].selected = !newTags[i].selected;
    setTags(newTags);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.open}
      onRequestClose={() => props.onClose(tags)}
    >
      <Header>
        <Left>
          <Button onPress={() => props.onClose(tags)}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Filter By Tags</Title>
        </Body>
      </Header>
      <List>
        {tags.map((tag, index) => (
          <ListItem onPress={() => handlePress(index)}>
            <CheckBox
              checked={tag.selected}
              onPress={() => handlePress(index)}
            />
            <Body>
              <Text>{tag.name}</Text>
            </Body>
          </ListItem>
        ))}
      </List>
    </Modal>
  );
};

export default FilterModal;
