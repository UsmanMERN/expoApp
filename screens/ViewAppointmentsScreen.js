import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_ENDPOINT = `http://192.168.41.175:8000/api/appointment/getAppointmentsByPatientId`;

const ViewAppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      getAllAppointments();
    }
  }, [userData]);

  const fetchUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const { user } = await JSON.parse(userDataString);
        setUserData(user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getAllAppointments = async () => {
    try {
      const response = await axios.post(API_ENDPOINT, { patientId: userData._id });
      setAppointments(response.data.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderAppointmentItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardLeft}>
        <FontAwesome5 name="user-md" size={40} color="#00b894" />
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.doctorName}>{item.doctor}</Text>
        <Text style={styles.specialty}>{item.specialty}</Text>
        <Text style={styles.dateTime}>{`${item.date} at ${item.time}`}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#00b894" />
      </View>
    );
  }

  if (appointments.length === 0) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Text style={styles.emptyText}>No Appointments</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Appointments</Text>
      <FlatList
        data={appointments}
        renderItem={renderAppointmentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00b894',
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardLeft: {
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRight: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  specialty: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 16,
    color: '#555',
  },
  listContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
  },
});

export default ViewAppointmentsScreen;
