import { Line } from '@ant-design/charts';
import { Box, Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useGetStatisticsQuery } from '../../store/services/apiService';
import styles from './Statistics.module.css';

function BotStatistics() {
  const [startValue, setStartValue] = React.useState<Dayjs | null>(dayjs('2023-03-01'));
  const [endValue, setEndValue] = React.useState<Dayjs | null>(dayjs('2023-07-01'));
  const { data = [], isLoading } = useGetStatisticsQuery({
    start: dayjs(startValue).format('YYYY-MM-DD'),
    end: dayjs(endValue).format('YYYY-MM-DD'),
  });

  const config: any = {
    data,
    padding: 'auto',
    xField: 'date',
    yField: 'total',
    annotations: [
      {
        type: 'regionFilter',
        start: ['min', 'median'],
        end: ['max', '0'],
        color: '#F4664A',
      },
      {
        type: 'text',
        position: ['min', 'median'],
        content: 'Средний прибыль',
        offsetY: -4,
        style: {
          textBaseline: 'bottom',
        },
      },
      {
        type: 'line',
        start: ['min', 'median'],
        end: ['max', 'median'],
        style: {
          stroke: '#F4664A',
          lineDash: [2, 2],
        },
      },
    ],
  };

  return (
    <div className={styles.statistics}>
      <Box display="flex" sx={{ p: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              value={startValue}
              onChange={(newValue) => setStartValue(newValue)}
              label="start"
              sx={{ mx: 2 }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              value={endValue}
              onChange={(newValue) => setEndValue(newValue)}
              label="end"
              sx={{ mx: 2 }}
            />
          </DemoContainer>
        </LocalizationProvider>

        <Button variant="contained" sx={{ my: 2, mx: 2 }}>
          Фильтр
        </Button>
      </Box>

      <div className={styles.stat}>
        <Line {...config} loading={isLoading} />
      </div>
    </div>
  );
}

export default BotStatistics;
