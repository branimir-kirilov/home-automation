import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import PowerIcon from './PowerIcon';
import { LightListData } from '../types/types';
import LightService from '../services/LightService';

interface LightSourceProps extends LightListData {
    onExpand: () => void;
    onBrightnessChange: (name: string, brightness: number) => void;
}

export default function LightSource({
    name,
    color,
    path,
    brightness,
    disabled,
    onExpand,
    onBrightnessChange
}: LightSourceProps) {
    const [enabled, setEnabled] = useState(false);

    const toggleEnabled = async () => {
        setEnabled(!enabled);
        if (!enabled) {
            await LightService.changeRGB(path, color, brightness);
            return;
        }

        await LightService.changeRGB(path, color, 0);
    };

    const handleBrightnessChange = async (val: number[]) => {
        if (!enabled) {
            setEnabled(true);
        }
        onBrightnessChange(name, val[0]);
    };

    const changeBrightness = async (val: number[]) => {
        await LightService.changeRGB(path, color, val[0]);
    };

    return (
        <View pointerEvents={disabled ? 'none' : 'auto'}>
            <TouchableOpacity
                style={{
                    ...styles.container,
                    ...(disabled ? styles.disabled : {})
                }}
                onPress={onExpand}
            >
                <View style={styles.topContainer}>
                    <View style={styles.topContainerLeft}>
                        <Text style={{ ...styles.text, ...styles.heading }}>
                            {name} {disabled && disabled.toString()}
                        </Text>
                    </View>
                    <PowerIcon enabled={enabled} onToggle={toggleEnabled} />
                </View>
                <View style={styles.brightnessContainer}>
                    <MaterialIcons
                        name="brightness-4"
                        size={24}
                        color={enabled ? color : '#999'}
                    />
                    <Slider
                        containerStyle={styles.sliderStyle}
                        value={brightness}
                        onValueChange={handleBrightnessChange}
                        onSlidingComplete={changeBrightness}
                        step={1}
                        minimumValue={1}
                        maximumValue={100}
                        trackStyle={styles.trackStyle}
                        thumbStyle={styles.thumbStyle}
                        minimumTrackStyle={{
                            backgroundColor: enabled ? color : '#999'
                        }}
                    />
                    <Text style={styles.text}>
                        {Math.round(brightness || 0)}
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
