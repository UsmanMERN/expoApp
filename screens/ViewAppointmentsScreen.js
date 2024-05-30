import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const ViewAppointmentsScreen = () => {
  // Dummy data for appointments
  const appointments = [
    { id: '1', doctor: 'Dr. John Smith', date: 'May 31, 2024', time: '10:00 AM', specialty: 'Cardiologist' },
    { id: '2', doctor: 'Dr. Jane Doe', date: 'June 3, 2024', time: '2:30 PM', specialty: 'Dermatologist' },
    { id: '3', doctor: 'Dr. Alex Johnson', date: 'June 5, 2024', time: '11:15 AM', specialty: 'Neurologist' },
  ];

  // Render individual appointment item
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Appointments</Text>
      <FlatList
        data={appointments}
        renderItem={renderAppointmentItem}
        keyExtractor={item => item.id}
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
});

export default ViewAppointmentsScreen;
