import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Um() {
    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <View style={styles.topLeft}></View>
                <View style={styles.topRight}>
                    <View style={styles.topRightTop}></View>
                    <View style={styles.topRightBottom}></View>
                </View>
            </View>
            <View style={styles.bottomSection}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        flexDirection: 'column',
    },
    topSection: {
        flex: 0.5,
        backgroundColor: 'crimson',
        flexDirection: 'row'
    },
    topLeft: {
        flex: 0.5,
        backgroundColor: 'lime'
    },
    topRight: {
        flex: 0.5,
        backgroundColor: 'aquamarine',
        flexDirection: 'column'
    },
    topRightTop: {
        flex: 0.5,
        backgroundColor: 'teal'
    },
    topRightBottom: {
        flex: 0.5,
        backgroundColor: 'skyblue'
    },
    bottomSection: {
        flex: 0.5,
        backgroundColor: 'salmon'
    },
})