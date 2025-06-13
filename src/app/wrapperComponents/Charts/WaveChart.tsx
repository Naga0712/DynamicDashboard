'use client';

import TypedApexChart from "./TypedApexChart";

export default function WaveChart() {
    const series = [
        {
            name: "Visitors",
            data: [10, 15, 5, 10, 15, 20, 5, 30, 10, 15, 10, 30],
        },
    ];

    return (
        <div className="max-w-40 h-20">
            <TypedApexChart
                type="area"
                series={series}
                options={{
                    chart: {
                        type: 'area',
                        toolbar: { show: false },
                        zoom: { enabled: false },
                        sparkline: { enabled: true }, // ✅ Removes everything
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 2,
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.5,
                            opacityTo: 0,
                            stops: [0, 90, 100],
                        },
                    },
                    dataLabels: { enabled: false },
                    tooltip: { enabled: false },
                    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
                    yaxis: { show: false },
                    grid: { show: false },
                }}
                width="100%"
                height="100%"
            />
        </div>
    );
}
