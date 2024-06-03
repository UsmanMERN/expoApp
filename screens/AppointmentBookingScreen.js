import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, FlatList, ActivityIndicator, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppointmentBookingScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [doctorName, setDoctorName] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [matchingDoctors, setMatchingDoctors] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [noDoctorsFound, setNoDoctorsFound] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(date || selectedDate);
  };

  const handleTimeChange = (event, time) => {
    setShowTimePicker(Platform.OS === 'ios');
    setSelectedTime(time || selectedTime);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  // console.log('userData.Id', userData._id)
  const handleDoctorNameChange = async (text) => {
    setDoctorName(text);
    if (text) {
      try {
        const response = await axios.get(`http://10.62.38.19:8000/api/doctor/search?name=${text}`);
        if (response.data.data.length > 0) {
          setMatchingDoctors(response.data.data.slice(0, 3)); // Show only first 3 matches
          setNoDoctorsFound(false);
        } else {
          setNoDoctorsFound(true);
        }
        setShowDropdown(true);
      } catch (error) {
        // console.error("Error fetching matching doctors:", error);
      }
    } else {
      setShowDropdown(false);
      setNoDoctorsFound(false);
    }
  };

  const handleDoctorSelect = (name) => {
    setDoctorName(name);
    setShowDropdown(false);
  };

  const handleConfirmAppointment = async () => {
    const appointmentDetails = {
      date: selectedDate.toDateString(), time: selectedTime.toLocaleTimeString(), doctorName, additionalInfo, patientId: userData._id
    };

    setLoading(true);

    try {
      const response = await axios.post('http://10.62.38.19:8000/api/appointment/addAppointment', appointmentDetails);
      setLoading(false);
      Alert.alert('Success', 'Your appointment has been confirmed!');
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'There was an error confirming your appointment. Please try again.');
      console.error("Error confirming appointment:", error);
    }
  };

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
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
              onChangeText={handleDoctorNameChange}
              value={doctorName}
            />
            {showDropdown && (
              <View style={styles.dropdown}>
                {noDoctorsFound ? (
                  <Text style={styles.noDoctorsText}>No doctors found</Text>
                ) : (
                  matchingDoctors.map((item) => (
                    <TouchableOpacity key={item._id} onPress={() => handleDoctorSelect(item.name)}>
                      <Text style={styles.dropdownItem}>{item.name}</Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            )}
            <Text style={styles.subtitle}>Additional Information:</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Enter any additional information"
              onChangeText={text => setAdditionalInfo(text)}
              value={additionalInfo}
              multiline
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={handleConfirmAppointment}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Confirm Appointment</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00b894',
  },
  content: {
    flex: 1,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    backgroundColor: '#00b894',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  datePickerText: {
    fontSize: 16,
    color: '#000',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  },
  dropdownItem: {
    padding: 12,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  noDoctorsText: {
    padding: 12,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default AppointmentBookingScreen;
