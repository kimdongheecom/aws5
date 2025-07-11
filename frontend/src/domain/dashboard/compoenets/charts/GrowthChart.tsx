'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  SelectChangeEvent,
  Box,
} from '@mui/material';
import { GrowthData } from '../../hooks/useDashboardData';

interface GrowthChartProps {
  data: GrowthData;
}

// 지표 정보
const metrics = [
  { key: 'revenueGrowth', name: '매출 성장률', color: '#6366F1' },
  { key: 'netIncomeGrowth', name: '순이익 성장률', color: '#10B981' },
];

const GrowthChart: React.FC<GrowthChartProps> = ({ data }) => {
  // 선택된 지표들을 관리하는 상태 - 매출 성장률만 기본 선택
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['revenueGrowth']);

  // 데이터 가공 - 방어적 코드 추가
  const chartData = data && data.years ? data.years.map((year, index) => ({
    year,
    revenueGrowth: data.revenueGrowth?.[index] ?? 0,
    netIncomeGrowth: data.netIncomeGrowth?.[index] ?? 0,
  })) : [];

  // 드롭다운 변경 핸들러
  const handleChange = (event: SelectChangeEvent<typeof selectedMetrics>) => {
    const {
      target: { value },
    } = event;
    setSelectedMetrics(
      // 문자열이나 문자열 배열로 처리
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-blacksection">
      <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            성장성 지표
          </h5>
        </div>
        <div className="min-w-[200px]">
          <FormControl fullWidth size="small">
            <InputLabel id="growth-metrics-select-label">지표 선택</InputLabel>
            <Select
              labelId="growth-metrics-select-label"
              id="growth-metrics-select"
              multiple
              value={selectedMetrics}
              onChange={handleChange}
              input={<OutlinedInput label="지표 선택" />}
              renderValue={(selected) => {
                return selected.map((value) => 
                  metrics.find(metric => metric.key === value)?.name
                ).join(', ');
              }}
            >
              {metrics.map((metric) => (
                <MenuItem key={metric.key} value={metric.key}>
                  <Checkbox checked={selectedMetrics.indexOf(metric.key) > -1} />
                  <ListItemText primary={metric.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis 
              tick={{ fontSize: 12 }} 
              domain={['auto', 'auto']} 
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(2)}%`, '']} 
              labelFormatter={(label) => `${label}년`}
            />
            <Legend />
            {/* 선택된 지표들만 필터링하여 Line 컴포넌트 렌더링 */}
            {metrics
              .filter(metric => selectedMetrics.includes(metric.key))
              .map(metric => (
                <Line
                  key={metric.key}
                  type="monotone"
                  dataKey={metric.key}
                  name={metric.name}
                  stroke={metric.color}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))
            }
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 지표 설명 */}
      <Box sx={{ mt: 2, p: 2, backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h6 className="mb-2 text-sm font-medium text-black dark:text-white">지표 설명</h6>
        <ul className="text-xs text-waterloo dark:text-manatee">
          <li>매출 성장률: (당해 매출액 - 전년 매출액) ÷ 전년 매출액 × 100</li>
          <li>순이익 성장률: (당해 순이익 - 전년 순이익) ÷ 전년 순이익 × 100</li>
        </ul>
      </Box>
    </div>
  );
};

export default GrowthChart; 