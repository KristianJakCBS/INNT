import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import image from '../assets/graph.png'; // Import the image

export default function IndkøbsansvarligScreen({ params }) {
    const user = params.user;
    const userData = params.userData;
    const handleLogOut = params.handleLogOut;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Indkøbsansvarlig-Screen</Text>
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
                <View style={styles.imageContainer}>
                    <Image 
                        source={image} // Use the imported image
                        style={styles.profilePicture} 
                    />
                </View>
            </View>
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
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    profilePicture: {
        width: 300,
        height: 300,
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
});
