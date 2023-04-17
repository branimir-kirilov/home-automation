import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from '../utils/colors';

export default function LoadingOverlay() {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        backgroundColor: Colors.BLACKISH,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.9,
        zIndex: 1
    }
});
