import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PowerIcon from './PowerIcon';
import { LightSourceData } from '../types/types';
import { useAppDispatch } from '../hooks/hooks';
import { updateLight } from '../store/lights/lightsSlice';
import { Colors } from '../utils/colors';
import LoadingOverlay from './LoadingOverlay';
import BrightnessSlider from './BrightnessSlider';

interface LightSourceShortProps {
    item: LightSourceData;
    onExpand: () => void;
}

export default function LightSourceShort({ item, onExpand }: LightSourceShortProps) {
    const dispatch = useAppDispatch();

    // TODO: Better way to do this?
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

    const onBrightnessChange = (value: number[]) => {
        dispatch(
            updateLight({
                id: item.id,
                changes: { enabled: true, brightness: value[0] }
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
                    </View>
                    <PowerIcon
                        enabled={item.enabled}
                        onToggle={toggleEnabled}
                    />
                </View>
                <BrightnessSlider item={item} onBrightnessChange={onBrightnessChange} />
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
  
    overlayContainer: {
        position: 'absolute',
        bottom: 0
    },
    disabled: {
        opacity: 0.2
    }
});
