import { MaterialIcons } from '@expo/vector-icons';
import { Slider } from '@miblanchard/react-native-slider';
import { StyleSheet, View, Text } from 'react-native';
import { LightSource } from '../types/types';
import { Colors } from '../utils/colors';

interface BrightnessSliderProps {
    onBrightnessChange: (value: number[]) => void;
    item: LightSource;
}

export default function BrightnessSlider({
    item,
    onBrightnessChange
}: BrightnessSliderProps) {
    return (
        <View style={styles.brightnessContainer}>
            <MaterialIcons
                name="brightness-4"
                size={24}
                color={item.enabled ? item.color : Colors.GRAY}
            />
            <Slider
                containerStyle={styles.sliderStyle}
                value={item.brightness}
                onSlidingComplete={onBrightnessChange}
                step={1}
                minimumValue={1}
                maximumValue={100}
                trackStyle={styles.trackStyle}
                thumbStyle={styles.thumbStyle}
                minimumTrackStyle={{
                    backgroundColor: item.enabled ? item.color : Colors.GRAY
                }}
            />
            <Text style={styles.text}>{Math.round(item.brightness || 0)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
    // TODO: Extract generic styles
    text: {
        color: Colors.WHITE,
        fontFamily: 'sans-serif-thin',
        fontSize: 18
    }
});
