import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';

export default function HomeScreen({ navigation }) {
  const username = 'Chamika'; // Replace with actual logged-in username from context or props

  const handleLogout = () => {
    Alert.alert('Logged out', 'You have been logged out.');
    navigation.replace('Login');
  };

  return (
    <ImageBackground
      source={require('../assets/bg.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <Text style={styles.username}>👤 {username}</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logout}>Logout ⎋</Text>
          </TouchableOpacity>
        </View>

        {/* Card Styled Body */}
        <View style={styles.card}>
          <Text style={styles.title}>Welcome to LeafTrack</Text>

          <TouchableOpacity
            style={styles.section}
            onPress={() => navigation.navigate('DailyEntry')}
          >
            <Text style={styles.sectionText}>🌿 Daily Leaf Count</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.section}
            onPress={() => navigation.navigate('PastRecords')}
          >
            <Text style={styles.sectionText}>📄 Past Records</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    flex: 1
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  logout: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
    color: 'white'
  },
  section: {
    backgroundColor: '#228B22',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10
  },
  sectionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  }
});
