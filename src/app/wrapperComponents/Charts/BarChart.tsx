'use client';

import TypedApexChart from "./TypedApexChart";

export default function BarChart() {
    const series = [
        {
            name: "Sales",
            data: [35, 40, 28, 50, 55, 45, 60, 70, 65, 55, 50, 75],
        },
    ];

    return (
        <div className="w-full max-w-md mx-auto">
            <TypedApexChart
                type="bar"
                series={series}
                options={{
                    chart: {
                        type: 'bar',
                        toolbar: { show: false },
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 4,
                            columnWidth: '50%',
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    xaxis: {
                        categories: [
                            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                        ],
                        axisTicks: { show: false },
                        axisBorder: { show: false },
                    },
                    yaxis: {
                        title: {
                            text: 'Sales',
                        },
                    },
                    grid: {
                        strokeDashArray: 4,
                    },
                }}
                width="100%"
                height="210%"
            />
        </div>
    );
}
