import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

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
            style={{ ...styles.container, ...(enabled ? styles.enabled : {}) }}
            onPress={toggleEnabled}
        >
            {enabled ? (
                <MaterialCommunityIcons
                    name="lightbulb-on-outline"
                    size={18}
                    color={enabled ? 'white' : '#999'}
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
        borderColor: 'white',
        borderWidth: 0
    },
    enabled: {
        borderColor: 'white',
        borderWidth: 1
    }
});
