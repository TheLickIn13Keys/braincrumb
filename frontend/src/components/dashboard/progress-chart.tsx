import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const performanceData = [
  { name: 'Jan', Math: 65, Science: 78, English: 70 },
  { name: 'Feb', Math: 59, Science: 80, English: 68 },
  { name: 'Mar', Math: 80, Science: 85, English: 75 },
  { name: 'Apr', Math: 81, Science: 90, English: 82 },
  { name: 'May', Math: 56, Science: 88, English: 77 },
  { name: 'Jun', Math: 55, Science: 84, English: 79 },
]

export function ProgressChart() {
  return (
    <div className="w-full aspect-square">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Math" stroke="#FF4785" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="Science" stroke="#0EA5E9" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="English" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}