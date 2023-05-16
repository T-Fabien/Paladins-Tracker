import {
  Bar,
  BarChart,
  Cell,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  kill: number;
  assist: number;
  death:number
  width: number;
};

function HorizontalBarChart({ kill, assist,death, width }: Props) {
  const total = kill + (0.5 * assist) + death
  const data = [
    {
      name: "Ratio",
      kill: ((kill) / total),
      assist : ((0.5* assist) / total),
      death: ((death) / total),
    },
  ];
  return (
          <BarChart
            layout="vertical"
            data={data}
            height={25} 
            width={width}
          >
            <XAxis hide type="number" />
            <YAxis
            hide
              type="category"
              dataKey="name"
            />
            <Bar legendType="none" dataKey="kill" fill="#228B22" barSize={15} stackId="a">
            </Bar>
            <Bar legendType="none" dataKey="assist" fill="#fff" stackId="a">
            </Bar>
            <Bar legendType="none" dataKey="death" fill="#ee4134" stackId="a">
            </Bar>
          </BarChart>
  );
}

export default HorizontalBarChart;
