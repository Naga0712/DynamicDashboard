'use client'

import WaveChart from "./Charts/WaveChart";

interface smCardsProps {
    title: string;
    value: string;
    isChartVisible?: boolean;
}
export default function SmCards({ title, value, isChartVisible }: smCardsProps) {
    return (
        <div className="relative bg-white rounded-xl  p-2 max-w-xs
        sm:max-w-md mx-auto transform  transition-transform 
        duration-300 ease-in-out min-w-40">
            <div className="flex justify-start space-x-4 mt-1 ">
                {title}
            </div>
            <div className="flex justify-start space-x-4 p-7 font-bold">
                {value}
            </div>
            <div>
                {isChartVisible && (
                    <WaveChart />)}
            </div>
        </div>
    )
}





