import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AppointmentBookingScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [doctorName, setDoctorName] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(selectedDate || selectedDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    setSelectedTime(selectedTime || selectedTime);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const handleConfirmAppointment = () => {
    // Add logic to confirm the appointment
    console.log('Appointment confirmed!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book an Appointment</Text>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Select Date:</Text>
        <TouchableOpacity style={styles.datePickerButton} onPress={toggleDatePicker}>
          <Text style={styles.datePickerText}>{selectedDate.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            onChange={handleDateChange}
          />
        )}
        <Text style={styles.subtitle}>Select Time:</Text>
        <TouchableOpacity style={styles.datePickerButton} onPress={toggleTimePicker}>
          <Text style={styles.datePickerText}>{selectedTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="spinner"
            onChange={handleTimeChange}
          />
        )}
        <Text style={styles.subtitle}>Choose a Doctor:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter doctor's name"
          onChangeText={text => setDoctorName(text)}
          value={doctorName}
        />
        <Text style={styles.subtitle}>Additional Information:</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Enter any additional information"
          onChangeText={text => setAdditionalInfo(text)}
          value={additionalInfo}
          multiline
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleConfirmAppointment}>
          <Text style={styles.buttonText}>Confirm Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00b894',
  },
  content: {
    flex: 1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: '#00b894',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  datePickerText: {
    fontSize: 16,
    color: '#000',
  },
});

export default AppointmentBookingScreen;
