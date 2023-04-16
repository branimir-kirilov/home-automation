import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { MaterialIcons } from '@expo/vector-icons';
import PowerIcon from './PowerIcon';
import { LightSourceData } from '../types/types';
import { useAppDispatch } from '../hooks/hooks';
import { changeLight } from '../store/lights/thunks';

interface LightSourceProps {
    item: LightSourceData;
    onExpand: () => void;
}

export default function LightSource({ item, onExpand }: LightSourceProps) {
    const dispatch = useAppDispatch();

    const toggleEnabled = async () => {
        if (item.enabled) {
            dispatch(
                changeLight({ ...item, enabled: !item.enabled, brightness: 0 })
            );
            return;
        }

        dispatch(
            changeLight({ ...item, enabled: !item.enabled, brightness: 100 })
        );
    };

    const changeBrightness = async (val: number[]) => {
        dispatch(changeLight({ ...item, brightness: val[0], enabled: true }));
    };

    return (
        <View pointerEvents={item.notImplemented ? 'none' : 'auto'}>
            <Text>{item.enabled}</Text>
            <TouchableOpacity
                style={{
                    ...styles.container,
                    ...(item.notImplemented ? styles.disabled : {})
                }}
                onPress={onExpand}
            >
                <View style={styles.topContainer}>
                    <View style={styles.topContainerLeft}>
                        <Text style={{ ...styles.text, ...styles.heading }}>
                            {item.name}
                        </Text>
                    </View>
                    <PowerIcon
                        enabled={item.enabled}
                        onToggle={toggleEnabled}
                    />
                </View>
                <View style={styles.brightnessContainer}>
                    <MaterialIcons
                        name="brightness-4"
                        size={24}
                        color={item.enabled ? item.color : '#999'}
                    />
                    <Slider
                        containerStyle={styles.sliderStyle}
                        value={item.brightness}
                        onSlidingComplete={changeBrightness}
                        step={1}
                        minimumValue={1}
                        maximumValue={100}
                        trackStyle={styles.trackStyle}
                        thumbStyle={styles.thumbStyle}
                        minimumTrackStyle={{
                            backgroundColor: item.enabled ? item.color : '#999'
                        }}
                    />
                    <Text style={styles.text}>
                        {Math.round(item.brightness || 0)}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(40,41,46)',
        height: 150,
        marginBottom: 2,
        padding: 15,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    text: {
        color: 'white',
        fontFamily: 'sans-serif-thin',
        fontSize: 18
    },
    heading: {
        marginRight: 5
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    topContainerLeft: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    brightnessContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: 0
    },
    sliderStyle: {
        width: '80%'
    },
    trackStyle: {
        backgroundColor: '#999',
        height: 25,
        borderRadius: 10
    },
    thumbStyle: {
        opacity: 0,
        width: 0
    },
    minimumTrackDisabled: {
        backgroundColor: '#ccc'
    },
    overlayContainer: {
        position: 'absolute',
        bottom: 0
    },
    disabled: {
        opacity: 0.2
    }
});
