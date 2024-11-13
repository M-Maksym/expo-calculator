import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem('calculatorHistory');
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.log('error with reading:', error);
      }
    };
    loadHistory();
  }, []);
  const selectExpression = async (expression, result) => {
    try {
      await AsyncStorage.setItem('selectedExpression', JSON.stringify({exp:expression, res:result}));
      router.navigate('/');
    } catch (error) {
      console.error('Problem with saving expression:', error);
    }
  };

  return (
    <View style={styles.container}>
        <View>
            <Link href="/" style={styles.backText}>
            <AntDesign name="left" size={24} color="#4B5EFC" style={{marginRight:"10px"}}/>
            Back
            </Link>
            <Text style={styles.title}>History of expressions</Text>    
        </View>
     
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>selectExpression(item.expression, item.result)}>
                <View style={styles.historyItem}>
                    <Text style={styles.historyItem__text}>{item.expression} = {item.result}</Text>
                </View>
            </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1F2F3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:15
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#4B5EFC',
  },
  historyItem__text:{
    fontSize:20
  },
  backText:{
    fontSize:20,
    color:"#4B5EFC",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    textAlign:"left"
  }
});
