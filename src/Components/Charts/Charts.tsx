import { Question } from "../../api/types";
import SimpleBarChart from "./BarChart";
import CustomActiveShapePieChart from "./CustomActiveShapePieChart";
import "./Charts.css";

export const Charts = ({
  data,
  filteredCategories,
}: {
  data: Question[];
  filteredCategories: string[];
}) => {
  return (
    <div className="charts__wrapper">
      <div className="charts__chart-wrapper">
        <h2>Distribution of questions by category</h2>
        {data.length === 0 ? (
          <p>
            No data available to display the chart. Try to load new questions in
            5 seconds
          </p>
        ) : (
          <SimpleBarChart
            questions={data}
            filteredCategories={filteredCategories}
          />
        )}
      </div>
      <div className="charts__chart-wrapper">
        <h2>Distribution of questions by difficulty</h2>
        {data.length === 0 ? (
          <p>
            No data available to display the chart. Try to load new questions in
            5 seconds
          </p>
        ) : (
          <CustomActiveShapePieChart
            questions={data}
            filteredCategories={filteredCategories}
          />
        )}
      </div>
    </div>
  );
};
