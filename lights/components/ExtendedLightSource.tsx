import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ListData } from '../types/types';
import ColorPicker from 'react-native-wheel-color-picker';
import LightService from '../services/LightService';

interface ExpandedLightSource extends ListData {
    onCollapse: () => void;
    onColorChange: (name: string, color: string) => void;
}

export default function ExpandedLightSource({
    name,
    color,
    onCollapse,
    onColorChange
}: ExpandedLightSource) {
    const onColorChangeComplete = async (color: string) => {
        onColorChange(name, color);
        await LightService.changeRGB(name, color);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{name}</Text>
                <MaterialIcons
                    name="close"
                    size={30}
                    color="white"
                    onPress={onCollapse}
                />
            </View>
            <View style={styles.colorPickerContainer}>
                <ColorPicker
                    onColorChangeComplete={onColorChangeComplete}
                    color={color}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(40,41,46)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        flexDirection: 'column',
        borderRadius: 10,
        borderWidth: 1,
        borderTopColor: 'white'
    },
    header: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        padding: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'sans-serif-thin'
    },
    colorPickerContainer: {
        paddingBottom: 90,
        paddingHorizontal: 15,
        height: '75%',
        width: '100%'
    }
});
