'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
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
import { DebtLiquidityData } from '../../hooks/useDashboardData';

interface DebtLiquidityChartProps {
  data: DebtLiquidityData;
}

// 지표 정보
const metrics = [
  { key: 'debtRatio', name: '부채비율', color: '#F87171' },
  { key: 'currentRatio', name: '유동비율', color: '#60A5FA' },
];

const DebtLiquidityChart: React.FC<DebtLiquidityChartProps> = ({ data }) => {
  // 선택된 지표들을 관리하는 상태 - 유동비율만 기본 선택
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['currentRatio']);

  // 데이터 가공 - 방어적 코드 추가
  const chartData = data && data.years ? data.years.map((year, index) => ({
    year,
    debtRatio: data.debtRatio?.[index] ?? 0,
    currentRatio: data.currentRatio?.[index] ?? 0,
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
            안정성 지표
          </h5>
        </div>
        <div className="min-w-[200px]">
          <FormControl fullWidth size="small">
            <InputLabel id="stability-metrics-select-label">지표 선택</InputLabel>
            <Select
              labelId="stability-metrics-select-label"
              id="stability-metrics-select"
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
              domain={[0, 'auto']} 
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
          <li>부채비율: 총부채 ÷ 자기자본 × 100 (낮을수록 재무적으로 안정적)</li>
          <li>유동비율: 유동자산 ÷ 유동부채 × 100 (높을수록 단기 유동성이 좋음)</li>
        </ul>
      </Box>
    </div>
  );
};

export default DebtLiquidityChart; 