import { View, Text, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function Settings() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings (TODO)</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.BLACKISH
    },
    title: {
        color: Colors.WHITE
    }
});
