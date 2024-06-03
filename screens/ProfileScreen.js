import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const Colors = {
  PRIMARY: '#FFF',
  LIGHT_PRIMARY: '#00b894',
  WHITE: "#FFF",
  BLACK: "#000",
  GRAY: '#9A9393',
  SECONDARY: '#03A9FF',      // Secondary color adjusted
  GREEN: '#4CBF57',          // Green color adjusted
}


const ProfileScreen = ({ navigation }) => {
  const { updateAuthentication } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const { user } = JSON.parse(userDataString);
        setUserData(user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      updateAuthentication(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" color={Colors.WHITE} style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Profile</Text>
      </View>
      <View style={styles.profileInfo}>
        <Image source={require('../assets/avatar.jpg')} style={styles.avatar} />
        <Text style={styles.userName}>{userData ? userData.name : 'Guest'}</Text>
        <Text style={styles.userEmail}>{userData ? userData.email : ''}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Location: {userData ? userData.location : 'Unknown'}</Text>
        <Text style={styles.infoText}>Phone: {userData ? userData.phone : '+123 456 7890'}</Text>
        <Text style={styles.infoText}>Date of Birth: {userData ? userData.dob : '01-Jan-1990'}</Text>
      </View>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('My Appointments')}>
        <MaterialCommunityIcons name="calendar-check" color={Colors.PRIMARY} size={30} />
        <Text style={styles.menuButtonText}>View Appointments</Text>
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Appointment Booking')}>
        <MaterialCommunityIcons name="calendar-plus" color={Colors.PRIMARY} size={30} />
        <Text style={styles.menuButtonText}>Book Appointment</Text>
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
      <TouchableOpacity style={styles.menuButton} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" color={Colors.PRIMARY} size={30} />
        <Text style={styles.menuButtonText}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  topBar: {
    height: 160,
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    flexDirection: 'row',
    paddingTop: 40,
    marginBottom: -50,
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 30,
    marginRight: 20,
  },
  profileTitle: {
    fontSize: 24,
    color: Colors.WHITE,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  userName: {
    fontSize: 24,
    color: Colors.BLACK,
    marginTop: 10,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.GRAY,
  },
  infoContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 16,
    color: Colors.BLACK,
    marginBottom: 10,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    paddingVertical: 15,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  menuButtonText: {
    fontSize: 18,
    color: Colors.PRIMARY,
    marginLeft: 10,
  },
  horizontalLine: {
    borderBottomColor: Colors.GRAY,
    borderBottomWidth: 1,
    marginTop: 20,
    width: '85%',
    alignSelf: 'center',
  },
});

export default ProfileScreen;
