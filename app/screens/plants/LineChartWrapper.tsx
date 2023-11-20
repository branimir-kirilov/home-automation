import { StyleSheet, View, useWindowDimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export interface LineChartProps {
    data: {
        labels: [];
        datasets: {
            data: number[];
            color: () => string;
        }[];
    };
    yAxisLabel?: string;
}

export default function LineChartWrapper({
    data,
    yAxisLabel = '%'
}: LineChartProps) {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.container}>
            <LineChart
                data={data}
                width={width}
                height={450}
                yAxisLabel={yAxisLabel}
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
                withOuterLines={true}
                withDots={false}
                withShadow={true}
                withVerticalLabels={true}
                withHorizontalLines={true}
                verticalLabelRotation={0}
                withHorizontalLabels={true}
                bezier
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    text: {
        color: 'white'
    }
});
