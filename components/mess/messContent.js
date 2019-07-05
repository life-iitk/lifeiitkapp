import React from 'react';
import { View, List, ListItem, CardItem, Body, Card, Text, Grid, Col } from 'native-base';

const MessContent = props => {
    return (
        <View>
        {["Breakfast", "Lunch", "Dinner"].map(meal => {
            const [mains, extras] = props.menu[meal.toLowerCase()];
            return(
                <Card>
                    <CardItem header>
                        <Text>
                            {meal}
                        </Text>
                                                
                    </CardItem>
                    <CardItem>
                        <Grid>
                            <Col>
                            {mains.map((dish, index) => (
                                <Text key={index}>{dish}</Text>
                            ))}
                            </Col>
                            <Col>
                                <Text>
                                    No extras
                                </Text>
                            </Col>
                        </Grid>
                    </CardItem>
                </Card>
            );
    })}
    </View>
    );
};

export default MessContent;