import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import AppNavigation from "./components/AppNavigation";
import OnboardingNavigation from "./components/OnboardingNavigation";
import { AuthProvider } from "./AuthContext";

export default function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(true);

  // Function to update authentication state after successful login or signup
  const updateAuthentication = (authenticated) => {
    setUserAuthenticated(authenticated);
  };

  // console.log('userAuthenticated', userAuthenticated)
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          {!userAuthenticated ? (
            <OnboardingNavigation updateAuthentication={updateAuthentication} />
          ) : (
            <AppNavigation />
          )}
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
