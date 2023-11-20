import { useEffect, useMemo, useState } from 'react';
import {
    StyleSheet,
    View,
    useWindowDimensions,
    Text,
    ScrollView
} from 'react-native';
import { useAppSelector } from '../../hooks/hooks';
import { selectUser } from '../../store/auth/authSlice';
import { get, limitToLast, query, ref } from 'firebase/database';
import { db } from '../../config/firebaseConfig';
import LineChartWrapper from './LineChartWrapper';

const LIMIT = 30;

type Reading = {
    moisture: number;
    sensor: number;
    temperature: number;
    humidity: number;
    pressure: number;
};

type UserData = {
    [key: string]: Reading;
};

export default function PlantsList() {
    const [userReadings, setUserReadings] = useState<UserData | null>(null);

    const user = useAppSelector(selectUser);
    const { width } = useWindowDimensions();

    useEffect(() => {
        const dataRef = query(
            ref(
                db,
                `UsersData/${user?.uid}/144256e8-0726-4344-82db-d67c79d4e6c4/readings`
            ),
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
        const moistures: number[] = [];
        const temps: number[] = [];
        const pressures: number[] = [];
        const humidities: number[] = [];

        if (userReadings) {
            timestamps.forEach((timestamp) => {
                if (userReadings[timestamp]) {
                    moistures.push(userReadings[timestamp].moisture);
                    temps.push(userReadings[timestamp].temperature);
                    pressures.push(userReadings[timestamp].pressure);
                    humidities.push(userReadings[timestamp].humidity);
                }
            });
        }

        return [
            { key: 'Moisture', dataset: moistures, label: '%' },
            { key: 'Temperature', dataset: temps, label: 'C' },
            { key: 'Humidity', dataset: humidities, label: '%' },
            { key: 'Pressure', dataset: pressures, label: 'hPa' }
        ];
    };

    const lastTimestamp = useMemo(() => {
        const timestamps = Object.keys(userReadings || {});
        return Number(timestamps[timestamps.length - 1]);
    }, [userReadings]);

    return (
        <ScrollView style={styles.container}>
            {userReadings &&
                user?.uid &&
                lastTimestamp &&
                getData().map((data) => {
                    return (
                        <>
                            <Text style={styles.text}>{data.key}</Text>
                            <LineChartWrapper
                                key={data.key}
                                data={{
                                    labels: [],
                                    datasets: [
                                        {
                                            data: data.dataset,
                                            color: () => 'blue'
                                        }
                                    ]
                                }}
                                yAxisLabel={data.label}
                            />
                        </>
                    );
                })}
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
                    {new Date(lastTimestamp * 1000).toLocaleString('en-US', {
                        timeZone: 'Europe/Sofia'
                    })}
                </Text>

                {Object.keys(userReadings?.[lastTimestamp] || []).map((key) => (
                    <Text style={styles.text}>
                        {/* @ts-ignore TODO */}
                        {key} - {userReadings?.[lastTimestamp][key]}
                    </Text>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'black'
    },
    text: {
        color: 'white',
        textAlign: 'center'
    },
    heading: {
        color: 'white',
        textAlign: 'center',
        marginTop: 45
    }
});
