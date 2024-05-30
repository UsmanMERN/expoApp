import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import AppNavigation from "./components/AppNavigation";
import OnboardingNavigation from "./components/OnboardingNavigation";
import { AuthProvider, AuthContext } from "./context/AuthContext";

const AppContent = () => {
  const { userAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!userAuthenticated ? <OnboardingNavigation /> : <AppNavigation />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
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
