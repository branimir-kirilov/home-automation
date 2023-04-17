import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { MaterialIcons } from '@expo/vector-icons';
import PowerIcon from './PowerIcon';
import { LightSourceData } from '../types/types';
import { useAppDispatch } from '../hooks/hooks';
import { updateLight } from '../store/lights/lightsSlice';
import { Colors } from '../utils/colors';
import LoadingOverlay from './LoadingOverlay';

interface LightSourceProps {
    item: LightSourceData;
    onExpand: () => void;
}

export default function LightSource({ item, onExpand }: LightSourceProps) {
    const dispatch = useAppDispatch();

    const toggleEnabled = async () => {
        if (item.enabled) {
            dispatch(
                updateLight({
                    id: item.id,
                    changes: { enabled: false, brightness: 0 }
                })
            );
            return;
        }

        dispatch(
            updateLight({
                id: item.id,
                changes: { enabled: true, brightness: 100 }
            })
        );
    };

    const changeBrightness = async (val: number[]) => {
        console.log('hey', item.id, val[0]);
        dispatch(
            updateLight({
                id: item.id,
                changes: { enabled: true, brightness: val[0] }
            })
        );
    };

    return (
        <View
            pointerEvents={
                item.notImplemented || item.status === 'loading'
                    ? 'none'
                    : 'auto'
            }
        >
            <TouchableOpacity
                style={{
                    ...styles.container,
                    ...(item.notImplemented && styles.disabled)
                }}
                onPress={onExpand}
            >
                <View style={styles.topContainer}>
                    <View style={styles.topContainerLeft}>
                        <Text style={{ ...styles.text, ...styles.heading }}>
                            {item.name}
                        </Text>
                        <Text style={{ ...styles.text, ...styles.heading }}>
                            {item.status}
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
                        color={item.enabled ? item.color : Colors.GRAY}
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
                            backgroundColor: item.enabled
                                ? item.color
                                : Colors.GRAY
                        }}
                    />
                    <Text style={styles.text}>
                        {Math.round(item.brightness || 0)}
                    </Text>
                </View>
                {item.status === 'loading' && <LoadingOverlay />}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.BASE_BACKGROUND,
        height: 150,
        marginBottom: 2,
        padding: 15,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    text: {
        color: Colors.WHITE,
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
        backgroundColor: Colors.GRAY,
        height: 25,
        borderRadius: 10
    },
    thumbStyle: {
        opacity: 0,
        width: 0
    },
    minimumTrackDisabled: {
        backgroundColor: Colors.GRAY_LIGHT
    },
    overlayContainer: {
        position: 'absolute',
        bottom: 0
    },
    disabled: {
        opacity: 0.2
    }
});
