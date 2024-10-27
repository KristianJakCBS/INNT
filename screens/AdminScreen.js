import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Alert, TextInput } from 'react-native';

export default function AdminScreen({ params }) {
    const user = params.user;
    const userData = params.userData;
    const handleLogOut = params.handleLogOut;

    const handleScan = () => {
        Alert.prompt(
            'Indtast varenr, som skal tildeles til chip',
            null,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                },
            ],
            'plain-text'
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Admin-Screen</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{userData.displayName}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{userData.email}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Medarbejder Type:</Text>
                    <Text style={styles.value}>{userData.userType}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
                <Text style={styles.scanButtonText}>Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogOut}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    header: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#555',
    },
    value: {
        fontSize: 18,
        fontWeight: '400',
        color: '#777',
        marginLeft: 10,
    },
    button: {
        justifyContent: 'flex-end',
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    scanButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#28a745',
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 20,
        alignSelf: 'center',
    },
    scanButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
