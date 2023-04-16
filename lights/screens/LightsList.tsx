import { useEffect } from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import LightSource from '../components/LightSource';
import { LightSourceData } from '../types/types';
import { NavigationProp } from '@react-navigation/core';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { selectLightSources } from '../store/lights/lightsSlice';
import { fetchLightsData } from '../store/lights/thunks';

interface HomeListProps {
    navigation: NavigationProp<any, any>;
}

export default function List({ navigation }: HomeListProps) {
    const { items, status } = useAppSelector(selectLightSources);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchLightsData());
    }, []);

    const onExpand = (item: LightSourceData) => {
        navigation.navigate('LightDetails', item);
    };

    return (
        <>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <LightSource item={item} onExpand={() => onExpand(item)} />
                )}
                keyExtractor={(item) => item.name}
                contentContainerStyle={styles.flatList}
                style={styles.container}
                refreshing={status === 'loading'}
            />
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
