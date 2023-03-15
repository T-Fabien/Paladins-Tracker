import {
  Bar,
  BarChart,
  Cell,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  positiveValue: number;
  negativeValue: number;
  width: number;
};

function HorizontalBarChart({ positiveValue, negativeValue, width }: Props) {
  const data = [
    {
      name: "Ratio",
      positiveValue: ((positiveValue) / (positiveValue + negativeValue)),
      negativeValue: ((negativeValue) / (positiveValue + negativeValue)),
    },
  ];
  return (
          <BarChart
            layout="vertical"
            data={data}
            height={30} 
            width={width}
          >
            <XAxis hide type="number" />
            <YAxis
            hide
              type="category"
              dataKey="name"
            />
            <Bar legendType="none" dataKey="positiveValue" fill="#228B22" barSize={15} stackId="a">
                <Cell fill="#228B22" />
                <Cell fill="#ee4134" />
            </Bar>
            <Bar legendType="none" dataKey="negativeValue" fill="#ee4134" stackId="a">
            </Bar>
          </BarChart>
  );
}

export default HorizontalBarChart;
