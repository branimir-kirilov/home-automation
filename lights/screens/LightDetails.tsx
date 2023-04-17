import { StyleSheet, Text, View } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { updateLight } from '../store/lights/lightsSlice';
import { Colors } from '../utils/colors';
import { useCallback, useMemo } from 'react';
import LoadingOverlay from '../components/LoadingOverlay';
import { selectLightById } from '../store/lights/lightsSlice';

interface LightDetailsProps
    extends NativeStackScreenProps<HomeStackParamList, 'LightDetails'> {}

export default function LightDetails({ route }: LightDetailsProps) {
    const id = route.params.id;
    const dispatch = useAppDispatch();
    const item = useAppSelector((state) => selectLightById(state, id));

    const onColorChangeComplete = useCallback((color: string) => {
        if (item && item.status === 'idle') {
            dispatch(updateLight({ id: item.id, changes: { color } }));
        }
    }, [item, dispatch, updateLight]);

    const memoizedColorPicker = useMemo(
        () => (
            <ColorPicker
                onColorChangeComplete={onColorChangeComplete}
                color={item?.color}
            />
        ),
        []
    );

    return (
        <View style={styles.container}>
            {item && (
                <>
                    {item.status === 'loading' && <LoadingOverlay />}
                    <View style={styles.header}>
                        <Text style={styles.title}>{item.name}</Text>
                    </View>
                    <View style={styles.colorPickerContainer}>
                        {memoizedColorPicker}
                        {/* TODO: add custom color input */}
                    </View>
                </>
            )}
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
