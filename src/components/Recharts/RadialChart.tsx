import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

type Props = {
  positiveValue: number;
  negativeValue: number;
};

function RadialChart({ positiveValue, negativeValue }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: any) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const data = [
    {
      name: "Victoires",
      value: positiveValue,
      fill: "#228B22",
    },
    {
      name: "Défaites",
      value: negativeValue,
      fill: "#EE4134",
    },
  ];

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      value,
      name,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 5) * sin;
    const mx = cx + (outerRadius + 20) * cos;
    const my = cy + (outerRadius + 10) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 5;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={7} textAnchor="middle" fill="white">
          {((data[0].value / (data[0].value + data[1].value)) * 100).toFixed(
            2
          ) + "%"}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 3}
          outerRadius={outerRadius + 6}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 4}
          y={ey + (name == "Victoires" ? 1 : 1.5) * 4}
          textAnchor={textAnchor}
          fill="#fff"
        >{`${value} ${name}`}</text>
      </g>
    );
  };

  return (
    <div className="radialchart" style={{ height: "150px", width: "320px" }}>
      <h3>Pourcentage de victoires</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="53%"
            innerRadius={35}
            outerRadius={45}
            dataKey="value"
            onMouseEnter={onPieEnter}
            stroke="none"
          ></Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RadialChart;
