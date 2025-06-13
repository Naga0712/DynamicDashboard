'use client';
import TypedApexChart from "./TypedApexChart";

export default function HorizontalBarChart() {
    const series = [
        {
            name: "Completion",
            data: [85, 70, 60, 90, 75],
        },
    ];

    return (
        <div className="w-full max-w-2xl mx-auto bg-white p-4 rounded-xl shadow">
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
                            horizontal: true,
                            borderRadius: 6,
                            barHeight: '60%',
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: (val) => `${val}%`,
                        style: {
                            fontSize: '12px',
                            colors: ['#333'],
                        },
                    },
                    xaxis: {
                        categories: ['React', 'Next.js', 'Node.js'],
                        max: 100, // since values are in percentage
                        labels: {
                            formatter: (val) => `${val}%`,
                        },
                        title: {
                            text: '',
                        },
                    },
                    yaxis: {
                        labels: {
                            style: {
                                fontSize: '14px',
                            },
                        },
                    },
                    tooltip: {
                        y: {
                            formatter: (val) => `${val}%`,
                        },
                    },
                    colors: ['#3b82f6'],
                    grid: {
                        borderColor: '#e5e7eb',
                        strokeDashArray: 4,
                    },
                }}
            // width="100%"
            // height={320}
            />
        </div>
    );
}
