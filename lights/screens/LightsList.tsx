import { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import PopUpModal from '../components/PopUpModal';
import LightSource from '../components/LightSource';
import { ListData } from '../types/types';
import ExpandedLightSource from '../components/ExtendedLightSource';
import { lightsListData } from '../data/lightsData';

export default function List() {
    const [expanded, setExpanded] = useState(false);
    const [expandedItem, setExpandedItem] = useState<ListData | null>(null);

    const onExpand = (item: ListData) => {
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

    return (
        <>
            <FlatList
                data={lightsListData}
                renderItem={(item) => (
                    <LightSource
                        {...item.item}
                        onExpand={() => onExpand(item.item)}
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
