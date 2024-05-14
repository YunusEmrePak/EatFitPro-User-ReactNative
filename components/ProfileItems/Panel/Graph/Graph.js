import { StyleSheet } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../../constants/constants";

import { LineChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Graph() {
  const userGraphs = useSelector(
    (state) => state.userCalorieGraph.userGraphs.consumedHistoriesDtoList
  );

  const [label, setLabel] = useState([]);
  const [dataSet, setDataSet] = useState([]);
  const [isEnded, setIsEnded] = useState(false);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // let label = [];
  // let dataSet = [];
  // let isEnded = false;

  useEffect(() => {
    if (userGraphs) {
      setLabel([]);
      setDataSet([]);
      setIsEnded(false);
      userGraphs.map((item) => {
        const date = new Date(item.date);
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const formattedDate = `${month} ${day}`;
        if (item.calories !== 0) {
          setLabel((prev) => [...prev, formattedDate]);
          setDataSet((prev) => [...prev, item.calories]);
        }
      });
      setIsEnded(true);
    }
  }, [userGraphs]);

  return (
    <LineChart
      data={{
        // labels: ["January", "February", "March", "April", "May", "June"],
        labels: isEnded ? label : ["None"],
        datasets: [
          {
            // data: [
            //   Math.random() * 100,
            //   Math.random() * 100,
            //   Math.random() * 100,
            //   Math.random() * 100,
            //   Math.random() * 100,
            //   Math.random() * 100,
            // ],
            data: isEnded ? dataSet : [Math.random() * 100],
          },
        ],
        legend: ["Consumed Graph"]
      }}
      width={DEVICE_WIDTH - 50} // from react-native
      height={300}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "5",
          strokeWidth: "3",
          stroke: "#ffa726",
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
      verticalLabelRotation={-45}
      // withScrollableDot
      xLabelsOffset={15}
      fromZero={true}
      yAxisInterval="1"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: DEVICE_HEIGHT / 5,
  },
  scrollView: {
    alignItems: "center",
  },
  pagerView: {
    width: DEVICE_WIDTH / 1.2,
    marginBottom: DEVICE_HEIGHT / 15,
  },
});
