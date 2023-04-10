import { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import PopUpModal from '../components/PopUpModal';
import LightSource from '../components/LightSource';
import { LightListData } from '../types/types';
import ExpandedLightSource from '../components/ExpandedLightSource';
import { lightsListData } from '../data/lightsData';

export default function List() {
    const [expanded, setExpanded] = useState(false);
    const [expandedItem, setExpandedItem] = useState<LightListData | null>(
        null
    );

    const onExpand = (item: LightListData) => {
        setExpanded(true);
        setExpandedItem(item);
    };

    const onCollapse = () => {
        setExpanded(false);
        setExpandedItem(null);
    };

    const onColorChange = (name: string, color: string) => {
        const el = lightsListData.find((el) => el.name === name);
        if (el) {
            el.color = color;
        }
    };

    const onBrightnessChange = (name: string, brightness: number) => {
        const el = lightsListData.find((el) => el.name === name);
        if (el) {
            el.brightness = brightness;
        }
    };

    return (
        <>
            <FlatList
                data={lightsListData}
                renderItem={(item) => (
                    <LightSource
                        {...item.item}
                        onExpand={() => onExpand(item.item)}
                        onBrightnessChange={onBrightnessChange}
                    />
                )}
                keyExtractor={(item) => item.name}
                contentContainerStyle={styles.flatList}
                style={styles.container}
            />
            {expanded && expandedItem && (
                <PopUpModal onCollapse={onCollapse}>
                    <ExpandedLightSource
                        {...expandedItem}
                        onCollapse={onCollapse}
                        onColorChange={onColorChange}
                    />
                </PopUpModal>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    flatList: {
        width: '100%'
    },
    container: {
        backgroundColor: '#1d1d1d'
    }
});
