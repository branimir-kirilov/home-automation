import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { changeLight } from '../store/lights/thunks';
import { Colors } from '../utils/colors';
import { selectLightSourceByName } from '../store/lights/lightsSlice';
import { useCallback, useMemo, useState } from 'react';

interface LightDetailsProps
    extends NativeStackScreenProps<HomeStackParamList, 'LightDetails'> {}

export default function LightDetails({ route }: LightDetailsProps) {
    const name = route.params.name;
    const dispatch = useAppDispatch();
    const item = useAppSelector(selectLightSourceByName(name));

    const onColorChangeComplete = useCallback(
        (color: string) => {
            if (item && item.status === 'idle') {
                dispatch(changeLight({ ...item, color }));
            }
        },
        [item, dispatch, changeLight]
    );

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
                    <Text>{item.status}</Text>
                    {item.status === 'loading' && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size={'large'} />
                        </View>
                    )}
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
    },
    loadingContainer: {
        position: 'absolute',
        backgroundColor: Colors.BLACKISH,
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
