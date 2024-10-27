import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getApps, initializeApp } from "firebase/app";
import { getAuth, initializeAuth, onAuthStateChanged, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { firebaseConfig } from './firebaseConfigProd';
import AuthScreen from './screens/AuthScreen';
import MainScreen from './screens/MainScreen';

export default function App() {
  const [user, setUser] = useState({ loggedIn: false });

  let auth;
  
  if (getApps().length < 1) {
    const app = initializeApp(firebaseConfig);
    auth = initializeAuth( app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  })
    console.log("Firebase On!");
    // Initialize other firebase products here
  } else {
    auth = getAuth()
  };

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
