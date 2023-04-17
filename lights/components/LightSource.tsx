import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { MaterialIcons } from '@expo/vector-icons';
import PowerIcon from './PowerIcon';
import { LightSourceData } from '../types/types';
import { useAppDispatch } from '../hooks/hooks';
import { changeLight } from '../store/lights/thunks';
import { Colors } from '../utils/colors';

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
                {/* TODO: generic activity indicator */}
                {item.status === 'loading' && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size={'large'} />
                    </View>
                )}
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
        opacity: 0.9
    }
});
