import React, { Component } from 'react';
import { Animated, PanResponder } from 'react-native';
import PropTypes from 'prop-types';

class Draggable extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.ValueXY();
    this.prevPosition = { x: 0, y: 0 };
    this.listener = this.animatedValue.addListener(e => {
      this.prevPosition = { ...e };
    });
    const {
      longPressTimeout, onDragRelease, onDragStart, onLongPress,
    } = props;
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        onDragStart();
        this.onLongPressTimeout = setTimeout(onLongPress, longPressTimeout);
        this.animatedValue.setOffset({
          ...this.prevPosition,
        });
        this.animatedValue.setValue({
          x: 0,
          y: 0,
        });
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.animatedValue.x,
          dy: this.animatedValue.y,
        },
      ]),
      onPanResponderRelease: (_, { moveX, moveY }) => {
        clearTimeout(this.onLongPressTimeout);
        onDragRelease(moveX, moveY);
        this.animatedValue.flattenOffset();
      },
    });
  }
  componentDidMount() {
    this.props.setRef(this.ref);
  }
  componentWillUnmount() {
    clearTimeout(this.onLongPressTimeout);
    this.animatedValue.removeListener(this.listener);
  }
  render() {
    const panStyle = { transform: this.animatedValue.getTranslateTransform() };
    const { containerStyle } = this.props;
    return (
      <Animated.View
        {...this.props}
        ref={r => {
          this.ref = r;
        }}
        {...this.panResponder.panHandlers}
        style={[panStyle, containerStyle, { alignSelf: 'flex-start' }]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

Draggable.propTypes = {
  children: PropTypes.node,
  onDragStart: PropTypes.func,
  onDragRelease: PropTypes.func,
  onLongPress: PropTypes.func,
  longPressTimeout: PropTypes.number,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  setRef: PropTypes.func,
};
Draggable.defaultProps = {
  children: null,
  onDragRelease: () => {},
  onDragStart: () => {},
  onLongPress: () => {},
  longPressTimeout: 500,
  containerStyle: {},
  setRef: () => {},
};

export default Draggable;
