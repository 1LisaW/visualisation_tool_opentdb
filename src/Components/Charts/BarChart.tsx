import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useWindowSize } from "@uidotdev/usehooks";
import { Question } from '../../api/types';

interface BarChartProps {
  questions: Question[];
  filteredCategories: string[];
}

// #endregion
const SimpleBarChart = (props:BarChartProps) => {
  const {questions, filteredCategories} =  props;
  const size = useWindowSize();

  const data = questions.reduce((acc, question) => {
    if (filteredCategories.length === 0 || filteredCategories.includes(question.category)) {
      const existingCategory = acc.find(item => item.name === question.category);
      if (existingCategory) {
        existingCategory.amount += 1; // Increment count for 'pv'
      } else {
        acc.push({ name: question.category, amount: 1 }); // Initialize 'uv' to 0
      }
    }
    return acc;
  }, [] as { name: string; amount: number }[]);
  return (
    <BarChart
        layout='vertical'
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" width="auto"/>
      <YAxis dataKey="name" type="category" scale="auto" width="auto" tickSize={10} interval={0} hide={!!size.width && size.width < 1000}/>
      <Tooltip />
      <Legend />
      <Bar dataKey="amount" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
    </BarChart>
  );
};

export default SimpleBarChart;
