// import React, { useState, useEffect, useContext } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   Modal,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Camera } from "expo-camera";
// import { AuthContext } from "../context/AuthContext";

// const ProfileScreen = () => {
//   const [image, setImage] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const navigation = useNavigation();
//   const { updateAuthentication } = useContext(AuthContext);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     // Fetch user data from AsyncStorage
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const userDataString = await AsyncStorage.getItem('userData');
//       if (userDataString) {
//         const { email } = JSON.parse(userDataString);
//         // Fetch user data based on email
//         const response = await axios.get(`your_api_endpoint/users/${email}`);
//         if (response.status === 200) {
//           setUserData(response.data); // Set user data in state
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       // Remove user data from AsyncStorage
//       await AsyncStorage.removeItem('userData');
//       // Navigate to the authentication screen (e.g., login)
//       // navigation.navigate('Authentication');
//       updateAuthentication(false);
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   const openModal = () => {
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   const pickImage = async () => {
//     let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (permissionResult.granted === false) {
//       alert("Permission to access camera roll is required!");
//       return;
//     }

//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//     setModalVisible(false);
//   };

//   const openCamera = async () => {
//     let permissionResult = await Camera.requestCameraPermissionsAsync();
//     if (permissionResult.granted === false) {
//       alert("Permission to access camera is required!");
//       return;
//     }

//     navigation.navigate('CameraScreen'); // Navigate to the camera screen
//     setModalVisible(false);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Ionicons name="ios-arrow-back" size={30} color="#555" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>My Profile</Text>
//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Text style={styles.logoutButtonText}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity onPress={openModal}>
//         <Image
//           source={image ? { uri: image } : require("../assets/avatar.jpg")}
//           style={styles.profileImage}
//         />
//       </TouchableOpacity>
//       <Text style={styles.profileName}>Your Name</Text>
//       <Text style={styles.profileEmail}>your.email@example.com</Text>
//       <View style={styles.infoContainer}>
//         <Text style={styles.infoText}>Location: Your Location</Text>
//         <Text style={styles.infoText}>Phone: +123 456 7890</Text>
//         <Text style={styles.infoText}>Date of Birth: 01-Jan-1990</Text>
//       </View>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={closeModal}
//       >
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>Choose an option:</Text>
//           <TouchableOpacity style={styles.modalOption} onPress={pickImage}>
//             <Text style={styles.modalOptionText}>Pick an image from the camera roll</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.modalOption} onPress={openCamera}>
//             <Text style={styles.modalOptionText}>Open Camera</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.modalOption} onPress={closeModal}>
//             <Text style={styles.modalOptionText}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   logoutButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//     backgroundColor: "#eb4d4b",
//   },
//   logoutButtonText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   profileImage: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     alignSelf: "center",
//     marginBottom: 10,
//   },
//   profileName: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   profileEmail: {
//     fontSize: 16,
//     color: "#555",
//     textAlign: "center",
//   },
//   infoContainer: {
//     marginTop: 20,
//   },
//   infoText: {
//     fontSize: 16,
//     color: "#333",
//     marginBottom: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#fff",
//   },
//   modalOption: {
//     backgroundColor: "#3498db",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   modalOptionText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#fff",
//   },
// });

// export default ProfileScreen;

import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const Colors = {
  PRIMARY: '#FFF',        // Primary color remains the same
  LIGHT_PRIMARY: '#00b894',  // Light primary color adjusted
  WHITE: "#FFF",             // White color remains the same
  BLACK: "#000",             // Black color remains the same
  GRAY: '#9A9393',           // Gray color adjusted
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
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('ViewAppointmentsScreen')}>
        <MaterialCommunityIcons name="calendar-check" color={Colors.PRIMARY} size={30} />
        <Text style={styles.menuButtonText}>View Appointments</Text>
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('BookAppointmentScreen')}>
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
