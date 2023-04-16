import { StyleSheet, Text, View } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { useAppDispatch } from '../hooks/hooks';
import { changeLight } from '../store/lights/thunks';
import { Colors } from '../utils/colors';

interface LightDetailsProps
    extends NativeStackScreenProps<HomeStackParamList, 'LightDetails'> {}

export default function LightDetails({ route }: LightDetailsProps) {
    const item = route.params;
    const dispatch = useAppDispatch();

    const onColorChangeComplete = (color: string) => {
        dispatch(changeLight({ ...item, color }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{item.name}</Text>
            </View>
            <View style={styles.colorPickerContainer}>
                <ColorPicker
                    onColorChangeComplete={onColorChangeComplete}
                    color={item.color}
                />
                {/* TODO: add custom color input */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.BASE_BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        flexDirection: 'column'
    },
    header: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        padding: 15
    },
    title: {
        fontSize: 30,
        color: Colors.WHITE,
        fontFamily: 'sans-serif-thin'
    },
    colorPickerContainer: {
        paddingBottom: 90,
        paddingHorizontal: 15,
        height: '75%',
        width: '100%'
    }
});
