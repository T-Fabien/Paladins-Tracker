import {
  Legend,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

type Props = {
  positiveValue: number;
  negativeValue: number;
};

function RadialChart({ positiveValue, negativeValue }: Props) {
  const data = [
    {
      name: "positiveValue",
      value: positiveValue,
      fill: "#228B22",
    },
  ];

  return (
    <div className="radialchart">
      <h3>{((positiveValue / (positiveValue + negativeValue))*100).toFixed(2)} % </h3>
        <RadialBarChart
          width={240}
          height={120}
          cx={120}
          cy={60}
          innerRadius={45}
          outerRadius={55}
          barSize={8}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, positiveValue + negativeValue]}
            tick={false}
          />
          <RadialBar
            background={{ fill: "#ee4134" }}
            dataKey="value"
            fill="#42a046"
          />
        </RadialBarChart>
    </div>
  );
}

export default RadialChart;
