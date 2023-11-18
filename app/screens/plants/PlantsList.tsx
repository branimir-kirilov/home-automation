import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, useWindowDimensions, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/core';
import { useAppSelector } from '../../hooks/hooks';
import { selectUser } from '../../store/auth/authSlice';
import { get, limitToLast, query, ref } from 'firebase/database';
import { db } from '../../config/firebaseConfig';
import { LineChart } from 'react-native-chart-kit';

const LIMIT = 30;

interface PlantsListProps {
    navigation: NavigationProp<any, any>;
}

type Reading = {
    moisture: number;
    sensor: number;
    timestamp: number;
};

type UserData = {
    [key: string]: Reading;
};

export default function PlantsList({ navigation }: PlantsListProps) {
    const [userReadings, setUserReadings] = useState<UserData | null>(null);

    const user = useAppSelector(selectUser);
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        const dataRef = query(
            ref(db, `UsersData/${user?.uid}/readings`),
            limitToLast(LIMIT)
        );

        get(dataRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setUserReadings(data);
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error('Error reading data:', error);
            });
    }, []);

    const getData = () => {
        const timestamps = Object.keys(userReadings || {});
        const readings: number[] = [];

        if (userReadings) {
            timestamps.forEach((timestamp) => {
                if (userReadings[timestamp]) {
                    readings.push(userReadings[timestamp].moisture);
                }
            });
        }

        return { timestamps, readings };
    };

    const lastReading = useMemo(() => {
        const timestamps = Object.keys(userReadings || {});
        const lastTimestamp = timestamps[timestamps.length - 1];
        return userReadings?.[lastTimestamp] || null;
    }, [userReadings]);

    const data = {
        labels: [],
        datasets: [
            {
                data: getData().readings,
                color: () => 'blue',
                withDots: false,
                strokeWidth: 5
            }
        ]
    };

    return (
        <View style={styles.container}>
            {userReadings && user?.uid && (
                <LineChart
                    data={data}
                    width={width}
                    height={450}
                    yAxisLabel="%"
                    fromZero={true}
                    fromNumber={100}
                    yAxisInterval={5}
                    yAxisSuffix=""
                    chartConfig={{
                        backgroundGradientFrom: '#000000',
                        backgroundGradientFromOpacity: 0.5,
                        backgroundGradientTo: '#000000',
                        backgroundGradientToOpacity: 1,
                        color: () => `white`,
                        useShadowColorFromDataset: true,
                        decimalPlaces: 0,
                        scrollableDotStrokeWidth: 150
                    }}
                    withInnerLines={false}
                    withOuterLines={true}
                    withDots={false}
                    withShadow={true}
                    withScrollableDot={true}
                    withVerticalLabels={true}
                    withHorizontalLines={true}
                    verticalLabelRotation={0}
                    withHorizontalLabels={true}
                    bezier
                />
            )}
            <View
                style={{
                    flexDirection: 'column',
                    backgroundColor: '#000',
                    width: '100%',
                    height: '100%'
                }}
            >
                <Text style={styles.text}>Last measurement: </Text>
                <Text style={styles.text}>
                    {new Date(
                        (lastReading?.timestamp || 0) * 1000
                    ).toLocaleString('en-US', { timeZone: 'Europe/Sofia' })}
                </Text>
                <Text style={styles.text}>
                    moisture: {lastReading?.moisture}%, sensor:{' '}
                    {lastReading?.sensor}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    text: {
        color: 'white'
    }
});
