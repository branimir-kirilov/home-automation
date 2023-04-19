import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors } from '../utils/colors';

export interface PowerIconProps {
    onToggle: () => void;
    enabled: boolean;
}

export default function PowerIcon({ onToggle, enabled }: PowerIconProps) {
    const toggleEnabled = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        onToggle();
    };

    return (
        <TouchableOpacity
            style={{ ...styles.container, ...(enabled && styles.enabled) }}
            onPress={toggleEnabled}
        >
            {enabled ? (
                <MaterialCommunityIcons
                    name="lightbulb-on-outline"
                    size={18}
                    color={enabled ? Colors.WHITE : Colors.GRAY}
                />
            ) : (
                <MaterialCommunityIcons
                    name="lightbulb-off-outline"
                    size={18}
                    color="#999"
                />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        borderRadius: 50,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.WHITE,
        borderWidth: 0
    },
    enabled: {
        borderColor: Colors.WHITE,
        borderWidth: 1
    }
});
