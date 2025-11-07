import { Cell, Pie, PieChart, Sector, SectorProps, Tooltip } from "recharts";
import { TooltipIndex } from "recharts/types/state/tooltipSlice";
import { Question } from "../../api/types";
import { classNames } from "../../utils/classNames";

type Coordinate = {
  x: number;
  y: number;
};

type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
  payload?: string | number | Record<string, string | number>;
};

type PieSectorDataItem = React.SVGProps<SVGPathElement> &
  Partial<SectorProps> &
  PieSectorData;

// #endregion
const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}: PieSectorDataItem) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 1));
  const cos = Math.cos(-RADIAN * (midAngle ?? 1));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload && typeof payload == "object" && payload.difficulty}
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
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`in total ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
        overflow='hidden'
      >
        {`(Rate ${((percent ?? 1) * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

export default function CustomActiveShapePieChart({
  questions,
  filteredCategories,
  isAnimationActive = true,
  defaultIndex = undefined,
}: {
  questions: Question[];
  filteredCategories: string[];
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
}) {
  type Difficulty = "easy" | "medium" | "hard";
  const difficulty: Record<Difficulty, number> = {
    easy: 0,
    medium: 0,
    hard: 0,
  };
  questions.forEach((question) => {
    if (
      filteredCategories.length === 0 ||
      filteredCategories.includes(question.category)
    ) {
      difficulty[question.difficulty as Difficulty] += 1;
    }
  });
  const data = (Object.keys(difficulty) as Difficulty[]).map((key) => ({
    difficulty: key,
    value: difficulty[key],
  }));
  const cells = [<Cell fill="#7aa7ceff" />, <Cell fill="#4d9588ff" />, <Cell fill="#e98187ff" />];
  return (
    <PieChart
      style={{
        width: "100%",
        maxWidth: "500px",
        maxHeight: "80vh",
        aspectRatio: 1,
      }}
      responsive
      margin={{
        top: 50,
        right: 120,
        bottom: 0,
        left: 120,
      }}
    >
      <Pie
        activeShape={renderActiveShape}
        data={data}
        cx="50%"
        cy="50%"
        innerRadius="60%"
        outerRadius="80%"
        fill="#8884d8"
        dataKey="value"
        isAnimationActive={isAnimationActive}
      >
        {cells.filter(Boolean).map((cell, index) => (
          <Cell
            key={`cell-${index}`}
            className={classNames("custom-pie-cell", {
              "custom-pie-cell--empty": data[index].value === 0,
            })}
            fill={cell.props.fill}
          />
        ))}
      </Pie>

      <Tooltip content={() => null} defaultIndex={defaultIndex} />
    </PieChart>
  );
}
