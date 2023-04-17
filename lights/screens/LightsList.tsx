import { useEffect } from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import LightSource from '../components/LightSource';
import { LightSourceData } from '../types/types';
import { NavigationProp } from '@react-navigation/core';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchLightsData } from '../store/lights/thunks';
import { Colors } from '../utils/colors';
import { selectAllLights } from '../store/lights/lightsSlice';

interface HomeListProps {
    navigation: NavigationProp<any, any>;
}

export default function List({ navigation }: HomeListProps) {
    const items = useAppSelector(selectAllLights);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchLightsData());
    }, []);

    const onExpand = (item: LightSourceData) => {
        navigation.navigate('LightDetails', { id: item.id });
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
