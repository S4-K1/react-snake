import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Tetris from './components/Tetris';
import { StyleSheet, Text, View } from 'react-native';

const App = () => (
  <div className='App'>
    <Tetris />
  </div>
)

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
