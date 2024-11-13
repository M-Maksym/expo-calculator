import { StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1F2F3',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    buttons__panel: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
    expression: {
      fontSize: 40,
      marginTop: 0,
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
      flexDirection: 'column',
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
    buttonText__operation: {
      fontSize: 32,
      color:'#FFF'
    },
  });