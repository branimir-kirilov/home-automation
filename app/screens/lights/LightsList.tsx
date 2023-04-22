import { useEffect } from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import LightSourceShort from '../../components/LightSourceShort';
import { LightSource } from '../../types/types';
import { NavigationProp } from '@react-navigation/core';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchLightsData } from '../../store/lights/lightsThunks';
import { Colors } from '../../utils/colors';
import { lightSelectors } from '../../store/lights/lightsSlice';

interface LightsListProps {
    navigation: NavigationProp<any, any>;
}

export default function LightsList({ navigation }: LightsListProps) {
    const items = useAppSelector(lightSelectors.selectAll);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchLightsData());
    }, []);

    const onExpand = (item: LightSource) => {
        navigation.navigate('LightDetails', { id: item.id });
    };

    return (
        <>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <LightSourceShort item={item} onExpand={() => onExpand(item)} />
                )}
                keyExtractor={(item) => item.name}
                contentContainerStyle={styles.flatList}
                style={styles.container}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.BLACKISH
    },
    flatList: {
        width: '100%'
    }
});
