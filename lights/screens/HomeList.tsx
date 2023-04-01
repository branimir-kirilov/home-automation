import { StyleSheet, FlatList } from 'react-native';
import HomeItem from '../components/HomeItem';
import { NavigationProp } from '@react-navigation/native';

import { homeControlData } from '../data/homeData';

interface HomeListProps {
    navigation: NavigationProp<any, any>;
}

export default function HomeList({ navigation }: HomeListProps) {
    const onNavigation = (path: string) => {
        navigation.navigate(path);
    };

    return (
        <FlatList
            data={homeControlData}
            numColumns={2}
            horizontal={false}
            key={2}
            contentContainerStyle={styles.flatList}
            columnWrapperStyle={{ justifyContent: 'space-evenly' }}
            style={styles.container}
            renderItem={(item) => (
                <HomeItem
                    name={item.item.name}
                    onNavigation={() => onNavigation(item.item.path)}
                />
            )}
            keyExtractor={(item) => item.name}
        />
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
