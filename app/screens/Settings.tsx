import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useAppDispatch } from '../hooks/hooks';
import { signOutAsync } from '../store/auth/authThunks';

// TODO: Rename to profile section, handle log out and register
export default function Settings() {
    const dispatch = useAppDispatch();
    const handleSignOut = () => {
        dispatch(signOutAsync());
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.container} onPress={handleSignOut}>
                <Text style={styles.title}>Sign out</Text>
            </TouchableOpacity>
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
