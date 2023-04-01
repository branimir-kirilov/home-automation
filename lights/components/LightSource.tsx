import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import PowerIcon from './PowerIcon';
import { ListData } from '../types/types';
import LightService from '../services/LightService';

interface LightSourceProps extends ListData {
    onExpand: () => void;
}

export default function LightSource({
    name,
    color,
    onExpand
}: LightSourceProps) {
    const [brightness, setBrightness] = useState([1]);
    const [enabled, setEnabled] = useState(false);

    const toggleEnabled = async () => {
        setEnabled(!enabled);
        await LightService.turnOff(name);
    };

    const onBrightnessChange = (val: number[]) => {
        if (!enabled) {
            setEnabled(true);
        }
        setBrightness(val);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onExpand}>
            <View style={styles.topContainer}>
                <View style={styles.topContainerLeft}>
                    <Text style={{ ...styles.text, ...styles.heading }}>
                        {name}
                    </Text>
                    {/* <MaterialIcons name="color-lens" size={20} color={color ? color : 'white'} /> */}
                </View>
                <PowerIcon
                    enabled={enabled}
                    onToggle={toggleEnabled}
                />
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
                    onValueChange={onBrightnessChange}
                    step={1}
                    minimumValue={1}
                    maximumValue={100}
                    trackStyle={styles.trackStyle}
                    thumbStyle={styles.thumbStyle}
                    minimumTrackStyle={{
                        backgroundColor: enabled ? color : '#999'
                    }}
                />
                <Text style={styles.text}>{Math.round(brightness[0])}</Text>
            </View>
        </TouchableOpacity>
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
    }
});
