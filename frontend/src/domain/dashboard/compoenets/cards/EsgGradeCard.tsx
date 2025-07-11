'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { ArrowUpward, ArrowDownward, Remove } from '@mui/icons-material';
import { Grade } from '../../hooks/useDashboardData';

// 컴포넌트 props 인터페이스
interface EsgGradeCardProps {
  title: string;
  grades: Grade[];
}

// 등급에 따른 배경색 결정 함수
const getBackgroundColor = (grade: string): string => {
  switch (grade) {
    case 'A+':
    case 'A':
      return '#EBF9EB';
    case 'B+':
    case 'B':
      return '#E6F4F1';
    case 'C+':
    case 'C':
      return '#FFF9E6';
    case 'D+':
    case 'D':
      return '#FFEDE6';
    default:
      return '#F7F7F7';
  }
};

// 등급에 따른 텍스트 색상 결정 함수
const getTextColor = (grade: string): string => {
  switch (grade) {
    case 'A+':
    case 'A':
      return '#2E7D32';
    case 'B+':
    case 'B':
      return '#1976D2';
    case 'C+':
    case 'C':
      return '#ED6C02';
    case 'D+':
    case 'D':
      return '#D32F2F';
    default:
      return '#757575';
  }
};

// 등급 변화에 따른 트렌드 아이콘 반환 함수
const getTrendIcon = (currentGrade: string, previousGrade: string) => {
  const gradeValues: Record<string, number> = {
    'A+': 5, 'A': 4, 'B+': 3, 'B': 2, 'C+': 1, 'C': 0, 'D+': -1, 'D': -2
  };

  if (!previousGrade) return null;
  
  const diff = gradeValues[currentGrade] - gradeValues[previousGrade];
  if (diff > 0) {
    return <ArrowUpward sx={{ color: '#2E7D32', fontSize: 12 }} />;
  } else if (diff < 0) {
    return <ArrowDownward sx={{ color: '#D32F2F', fontSize: 12 }} />;
  } else {
    return <Remove sx={{ color: '#757575', fontSize: 12 }} />;
  }
};

const EsgGradeCard: React.FC<EsgGradeCardProps> = ({ title, grades }) => {
  // 최신 3년치 데이터만 표시하고 연도 오름차순으로 정렬
  const sortedGrades = [...grades].sort((a, b) => a.year - b.year).slice(-3);
  
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ padding: '12px' }}>
        <Typography variant="h6" component="div" sx={{ color: '#000000', fontWeight: 'bold', mb: 2 }}>
          {title}
        </Typography>

        {/* 연도 라벨 행 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          {sortedGrades.map((item) => (
            <Typography key={`year-${item.year}`} variant="body2" sx={{ fontWeight: 'medium', textAlign: 'center', flex: 1 }}>
              {item.year}년
            </Typography>
          ))}
        </Box>
        
        {/* 등급 표시 행 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {sortedGrades.map((item, index) => (
            <Box 
              key={`grade-${item.year}`}
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                gap: '4px'
              }}
            >
              <Box 
                sx={{ 
                  bgcolor: getBackgroundColor(item.grade),
                  color: getTextColor(item.grade),
                  fontWeight: 'bold',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  minWidth: '32px',
                  textAlign: 'center'
                }}
              >
                {item.grade}
              </Box>
              {index > 0 && 
                getTrendIcon(item.grade, sortedGrades[index - 1].grade)
              }
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default EsgGradeCard; 