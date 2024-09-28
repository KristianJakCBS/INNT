import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { Button } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { getDatabase, ref, get } from "firebase/database"; 

export default function MainScreen() {
    const auth = getAuth();
    

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            Alert.alert("Logged out", "You have been logged out successfully.");
            console.log("logged out successfully")
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    const [userData, setUserData] = useState(null);
    const [user, setUser] = useState(null);

    
    useEffect(() => {
        setUser(auth.currentUser);
        const fetchUserData = async () => {
            try {
                const db = getDatabase();
                const usersRef = ref(db, "Users");
                const snapshot = await get(usersRef);
                if (snapshot.exists()) {
                    const usersData = snapshot.val();
                    const userData = Object.values(usersData).find(user => user.email === user.email);
                    if (userData) {
                        setUserData(userData);
                    } else {
                        console.log("No user found with the given email.");
                    }
                } else {
                    console.log("No data available.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    if (user && userData) {        
        return (
            <View style={styles.overlay}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>🦺</Text>
                    <Text style={styles.header}>Velkommen til Washmate, {user.displayName}!</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Navn: {user.displayName}</Text>
                    <Text style={styles.infoText}>Email: {user.email}</Text>
                    <Text style={styles.infoText}>Du er medarbejdertype: {userData.userType}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button mode="contained" onPress={handleLogOut} style={styles.logOutButton}>
                        Log out
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20, // Added padding on the sides
    },
    headerContainer: {
        marginTop: 100,
        marginBottom: 20,
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    infoContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 18,
        marginBottom: 10,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        width: '80%',
        alignItems: 'center',
    },
    logOutButton: {
        width: '100%',
    }
});