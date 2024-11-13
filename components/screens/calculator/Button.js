import React, { Component } from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default class Button extends Component {
    render() {
      const { onPress, label, style, textStyle } = this.props;
      return (
        <TouchableOpacity style={style} onPress={onPress}>
          <Text style={textStyle}>{label}</Text>
        </TouchableOpacity>
      );
    }
  }