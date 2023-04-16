import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../utils/colors';

interface HomeItemProps {
    name: string;
    onNavigation: () => void;
}

export default function HomeItem({ name, onNavigation }: HomeItemProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onNavigation}>
            <Text style={styles.title}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '45%',
        backgroundColor: Colors.BASE_BACKGROUND,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    title: {
        fontSize: 24,
        color: Colors.WHITE,
        fontFamily: 'sans-serif-thin'
    }
});
