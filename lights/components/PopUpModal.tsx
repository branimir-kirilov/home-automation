import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';

interface PopUpModalProps {
    children: JSX.Element;
    onCollapse: () => void;
}

export default function PopUpModal({ onCollapse, children }: PopUpModalProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.overlay} onPress={onCollapse} />
            <View style={styles.popUp}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%'
    },
    overlay: {
        height: '20%',
        backgroundColor: '#1d1d1d',
        opacity: 0.9
    },
    popUp: {
        backgroundColor: '#1d1d1d',
        opacity: 1,
        height: '100%'
    }
});
