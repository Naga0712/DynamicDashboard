'use client';

import TypedApexChart from "./TypedApexChart";

export default function HorizontalBarWithImageLabels() {
    const series = [
        {
            name: "Completion",
            data: [85, 70, 60],
        },
    ];

    const categories = ['React', 'Next.js', 'Node.js'];
    const imageUrls = [
        '/Micky_mouse.jpg',
        '/Micky_mouse.jpg',
        '/Micky_mouse.jpg',
    ];

    return (
        <div className="relative w-full max-w-2xl mx-auto p-4 ">
            <div className="absolute top-[52px] left-0 flex flex-col gap-[40px] z-10">
                {imageUrls.map((url, i) => (
                    <img key={i} src={url} alt={categories[i]} className="w-6 h-6 ml-1" />
                ))}
            </div>

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
                            barHeight: '40%',
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: (val) => `${val}%`,
                    },
                    yaxis: {
                        labels: {
                            show: false,
                        },
                    },
                    xaxis: {
                        max: 100,
                        labels: {
                            formatter: (val) => `${val}%`,
                        },
                    },
                    tooltip: {
                        y: {
                            formatter: (val) => `${val}%`,
                        },
                    },
                    grid: {
                        borderColor: '#e5e7eb',
                        strokeDashArray: 4,
                    },
                    colors: ['#3b82f6'],
                }}
                height={240}
            />
        </div>
    );
}
