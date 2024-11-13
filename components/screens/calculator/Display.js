import React, { Component } from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles'

export default class Display extends Component {
    render() {
      const { expression, result } = this.props;
      return (
        <View style={{width:"100%"}}>
          <Text style={styles.expression}>{expression}</Text>
          <Text style={styles.result}>{result}</Text>
        </View>
      );
    }
  }