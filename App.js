import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';
import AuthScreen from './screens/AuthScreen';
import MainScreen from './screens/MainScreen';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp07UZ5xGigHmSix2_-pM2cnDnbTsvcS0",
  authDomain: "fir-auth-b0269.firebaseapp.com",
  databaseURL: "https://fir-auth-b0269-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-auth-b0269",
  storageBucket: "fir-auth-b0269.appspot.com",
  messagingSenderId: "531068124015",
  appId: "1:531068124015:web:dedb41dcb29fa96879c69a"
};

export default function App() {
  const [user, setUser] = useState({ loggedIn: false });
  
  if (getApps().length < 1) {
    initializeApp(firebaseConfig);
    console.log("Firebase On!");
    // Initialize other firebase products here
  };

  const auth = getAuth();

  useEffect(() => {
    // Aktivér vores lytter, der observerer ændringer i brugerens autentificeringsstatus
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser({ loggedIn: !!user });
    });
    // Returner en funktion for at afmelde lytteren, når komponenten afmonteres
    return () => {
      unsubscribe();
    };
}, []);

  return (
      user.loggedIn ? <MainScreen style={styles.container}/> : <AuthScreen style={styles.container}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
