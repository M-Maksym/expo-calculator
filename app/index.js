import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Display from '../components/screens/calculator/Display';
import { Link } from 'expo-router';
import Button from '../components/screens/calculator/Button';

export default function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(0);

  useEffect(() => {
    const loadExpression = async () => {
        try {
          const storedExpression = await AsyncStorage.getItem('selectedExpression');
          if (storedExpression) {
            const savedData = JSON.parse(storedExpression)
            setExpression(savedData.exp)
            setResult(savedData.res)
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      loadExpression();
  }, []);

  const saveToHistory = async (expression, result) => {
    try {
      const newEntry = { expression, result };
      const existingHistory = await AsyncStorage.getItem('calculatorHistory');
      const updatedHistory = existingHistory ? JSON.parse(existingHistory) : [];
      updatedHistory.push(newEntry);
      await AsyncStorage.setItem('calculatorHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Problem with saving history:', error);
    }
  };

  const handleOperation = useCallback((operation) => {
    if (operation === '=') {
      try {
        const evalResult = eval(expression);
        setResult(evalResult);
        setExpression(`${evalResult}`);
        saveToHistory(expression, evalResult);
      } catch (error) {
        setResult('Error');
      }
    } else if (operation === 'C') {
      setExpression('');
      setResult(0);
    }else if (operation === '!') {
        const factorial = (n) => {
          if (n < 0) setResult('Error');
          if (n === 0 || n === 1) return 1;
          return n * factorial(n - 1);
        };
        const num = parseFloat(expression);
        const factorialResult = factorial(num);
        setResult(factorialResult);
        setExpression(`${factorialResult}`);
      } 
    else if (operation === '⌫') {
      setExpression((prevExpression) => prevExpression.slice(0, -1));
    } else if (operation === '%') {
      const percentResult = parseFloat(expression) / 100;
      setResult(percentResult);
      setExpression(`${percentResult}`);
    } else if (operation === 'sin') {
      const sinResult = Math.sin(parseFloat(expression)).toFixed(4);
      setResult(sinResult);
      setExpression(`${sinResult}`);
    } else if (operation === 'cos') {
      const cosResult = Math.cos(parseFloat(expression)).toFixed(4);
      setResult(cosResult);
      setExpression(`${cosResult}`);
    } else if (operation === 'tan') {
      const tanResult = Math.tan(parseFloat(expression)).toFixed(4);
      setResult(tanResult);
      setExpression(`${tanResult}`);
    } else if (operation === 'cot') {
      const tanValue = Math.tan(parseFloat(expression)).toFixed(4);
      if (tanValue !== 0) {
        const cotResult = 1 / tanValue;
        setResult(cotResult);
        setExpression(`${cotResult}`);
      } else {
        setResult('Error');
        setExpression('Error');
      }
    } else if (operation === '√') {
      const sqrtResult = Math.sqrt(parseFloat(expression)).toFixed(4);
      setResult(sqrtResult);
      setExpression(`${sqrtResult}`);
    } else if (operation === '^') {
      setExpression((prevExpression) => `${prevExpression}**`).toFixed(4);
    } else {
      setExpression((prevExpression) => `${prevExpression}${operation}`);
    }
  }, [expression]);

  const handleNumber = useCallback((number) => {
    setExpression((prevExpression) => `${prevExpression}${number}`);
  }, []);

  const operations = [ '%', '!', '÷', '×', '-', '+', '='];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const notMainOperations = ['C', 'sin', 'cos', 'tan', 'cot', '^', '√', '(', ')'];
  const bottomNumbers = ['.', 0, '⌫']

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => handleOperation(elem)} style={styles.historyTextContainer}>
            <Link href="/history" style={styles.historyText}>History</Link>
      </TouchableOpacity>
      <Display expression={expression} result={result}/>
        <View style={styles.buttons}>
          <View style={styles.buttons__first}>
            {notMainOperations.map((elem, i) => (
              <TouchableOpacity style={styles.buttons__first__operations} key={i} onPress={() => handleOperation(elem)}>
                <Text style={styles.buttonText}>{elem}</Text>
              </TouchableOpacity>
            ))}
            {numbers.map((elem, i) => (
              <TouchableOpacity style={styles.buttons__first__number} key={i} onPress={() => handleNumber(elem)}>
                <Text style={styles.buttonText}>{elem}</Text>
              </TouchableOpacity>
            ))}
            {bottomNumbers.map((elem, i) => (
              <TouchableOpacity style={styles.buttons__first__number} key={i} onPress={() => handleOperation(elem)}>
                <Text style={styles.buttonText}>{elem}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.buttons__second}>
            
            {operations.map((label, i) => (
          <Button
            key={i}
            label={label}
            onPress={() => handleOperation(label === '÷' ? '/' : label === '×' ? '*' : label)}
            style={styles.buttons__second__operation}
            textStyle={styles.buttonText__operation}
          />
        ))}
          </View>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2F3',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  expression: {
    fontSize: 40,
    marginTop: 55,
    color:"#4E505F",
    textAlign:'right',
    width:"100%",
    paddingRight:20,
    fontWeight:'300'
  },
  result: {
    fontSize: 96,
    marginVertical: 10,
    textAlign:'right',
    width:"100%",
    paddingRight:20,
    fontWeight:'300'
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
  },
  buttons__first: {
    flex: 3,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttons__second: {
    justifyContent: 'start',
    alignItems: 'center',
    flexDirection: 'column',
    width:"25%"
  },
  buttons__first__number: {
    width: '25%',
    margin: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 24,
    backgroundColor: '#FFF',
    padding: 12,
    height:72
  },
  buttons__first__operations: {
    width: '30%',
    margin: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 24,
    backgroundColor: '#D2D3DA',
    padding: 12,
  },
  buttons__second__operation: {
    width: '100%',
    margin: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 24,
    backgroundColor: '#4B5EFC',
    padding: 12,
    color:'#FFF',
    height:72
  },
  buttonText: {
    fontSize: 32,
  },
  historyText:{
    fontSize:25,
    textAlign:"right",
    color:"#4B5EFC"
  },
  historyTextContainer:{
    textAlign:"right",
    width:"100%",
    paddingRight:20
  },
  buttonText__operation: {
    fontSize: 32,
    color:'#FFF'
  },
});
