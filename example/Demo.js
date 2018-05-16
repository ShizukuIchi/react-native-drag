import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Draggable from 'react-native-drag';

class Demo extends React.Component {
  state={
    squareBackgroundColor: {},
    text: 'OUT',
  }
  setRef = (r) => {
    console.log(r);
  }
  handlePressIn = () => {
    this.setState({
      text: 'IN',
      squareBackgroundColor: styles.pressedSquareBackground,
    });
  }
  handlePressOut = () => {
    this.setState({
      text: 'OUT',
      squareBackgroundColor: {},
    });
  }
  handleLongPress = () => {
    this.setState({
      text: 'LONG',
    });
  }

  render() {
    return (
      <View>
        <Draggable setRef={this.setRef} containerStyle={styles.draggable} longPressTimeout={500} onLongPress={this.handleLongPress} onDragStart={this.handlePressIn} onDragRelease={this.handlePressOut}>
          <View style={[styles.square, this.state.squareBackgroundColor]}>
            <Text style={styles.text}>Status</Text>
            <Text style={styles.text}>{this.state.text}</Text>
          </View>
        </Draggable>
        <Draggable>
          <View style={[styles.square]} />
        </Draggable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  draggable: {
    margin: 30,
    zIndex: 1, // so first draggable component can be on the top
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
  square: {
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    backgroundColor: 'green',
    shadowOpacity: 0.75,
    shadowRadius: 1.5,
    shadowColor: '#000',
    shadowOffset: { height: 3, width: 3 },
  },
  pressedSquareBackground: {
    backgroundColor: 'darkgreen',
  },
});

export default Demo;
