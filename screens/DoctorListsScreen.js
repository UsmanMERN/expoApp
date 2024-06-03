import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import DoctorCard from "../components/DoctorCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
// import { APIENDPOINT } from "../App";

const DoctorListsScreen = () => {
  const [searchText, setSearchText] = useState(""); // State for the search input
  const [selectedCategory, setSelectedCategory] = useState(""); // State for the selected category
  const [doctorsData, setDoctorsData] = useState([]);
  const API_ENDPOINT = `http://192.168.41.237:8000/api/doctor/getAllDoctors`;

  useEffect(() => {
    getAllDoctors();
  }, []);

  const getAllDoctors = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      // console.log('response', response.data.data)
      setDoctorsData(response.data.data);
    } catch (error) {
      console.error("Error fetching doctors data:", error);
    }
  };

  // Generate categories from the unique categories found in doctorsData
  const categories = Array.from(
    new Set(doctorsData.flatMap((doctor) => doctor.categories))
  );

  // Filter doctors based on search input and selected category
  const filteredDoctors = doctorsData.filter((doctor) =>
    (selectedCategory === "" || doctor.categories.includes(selectedCategory)) &&
    (doctor.name.toLowerCase().includes(searchText.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Search Input with Search Icon */}
        <View style={styles.searchInputContainer}>
          <Feather
            name="search"
            size={20}
            color="#00b894"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Doctors"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>

        {/* Category Menu (Horizontal Scroll) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryMenu}
        >
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === "" && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory("")}
          >
            <Text style={styles.categoryButtonText}>All</Text>
          </TouchableOpacity>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category} // Ensure each category has a unique key
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={styles.categoryButtonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.title}>All Doctors</Text>
        <ScrollView
          contentContainerStyle={styles.doctorList}
          showsVerticalScrollIndicator={false}
        >
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} /> // Use a unique identifier like doctor._id
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DoctorListsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  doctorList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchIcon: {
    paddingLeft: 10,
    paddingRight: 5,
  },
  searchInput: {
    flex: 1,
  },
  categoryMenu: {
    marginTop: 10,
    height: 60,
  },
  categoryButton: {
    backgroundColor: "#00b894",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    height: 40,
    justifyContent: "center",
  },
  selectedCategoryButton: {
    backgroundColor: "#006d55",
  },
  categoryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
