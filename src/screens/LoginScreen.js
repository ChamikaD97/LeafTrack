import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const clearInputs = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <ImageBackground
      source={require('../assets/bg.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>LeafTrack Login</Text>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.row}> <TouchableOpacity
          style={[styles.button, styles.clearButton, styles.halfButton]}
          onPress={clearInputs}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton, styles.halfButton]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>


        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    margin: 20,
    borderRadius: 15
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white',
    marginBottom: 12,
    paddingHorizontal: 10,
     borderRadius: 10
  },
  button: {
    backgroundColor: '#228B22',
    padding: 12,
    borderRadius: 8,
    marginTop: 10
  },
    secondaryButton: {
    backgroundColor: 'rgba(23, 41, 206, 0.8)',
  },
  clearButton: {
    backgroundColor: 'rgba(170, 15, 15, 0.66)',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  halfButton: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 5
  }
});
