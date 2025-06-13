'use client';

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import React from 'react';

// Dynamically import ApexCharts to disable SSR
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Define your strict props interface
export interface ApexChartProps {
    type:
    | 'line'
    | 'area'
    | 'bar'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'candlestick'
    | 'boxPlot'
    | 'radar'
    | 'polarArea'
    | 'rangeBar'
    | 'rangeArea'
    | 'treemap';
    series: ApexOptions['series'];
    width?: string | number;
    height?: string | number;
    options?: ApexOptions;
    [key: string]: any; // Optional additional props
}

// Reusable chart component
export default function TypedApexChart({
    type,
    series,
    width,
    height,
    options,
    ...rest
}: ApexChartProps) {
    return (
        <ReactApexChart
            type={type}
            series={series}
            width={width}
            height={height}
            options={options}
            {...rest}
        />
    );
}
