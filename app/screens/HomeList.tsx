import { StyleSheet, FlatList } from 'react-native';
import HomeItem from '../components/HomeItem';
import { NavigationProp } from '@react-navigation/native';

import { homeControlData } from '../data/homeData';
import { Colors } from '../utils/colors';

interface HomeListProps {
    navigation: NavigationProp<any, any>;
}

export default function HomeList({ navigation }: HomeListProps) {
    const onNavigation = (component: string) => {
        navigation.navigate(component);
    };

    return (
        <FlatList
            data={homeControlData}
            numColumns={2}
            horizontal={false}
            key={2}
            contentContainerStyle={styles.contentContainer}
            style={styles.container}
            columnWrapperStyle={{ justifyContent: 'space-evenly' }}
            renderItem={(item) => (
                <HomeItem
                    name={item.item.name}
                    onNavigation={() => onNavigation(item.item.component)}
                />
            )}
            keyExtractor={(item) => item.name}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.BLACKISH
    },
    contentContainer: {
        width: '100%'
    }
});
