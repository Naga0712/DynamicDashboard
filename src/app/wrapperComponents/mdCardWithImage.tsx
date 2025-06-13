'use client'

import BarChart from "./Charts/BarChart";
import HorizontalBarChart from "./Charts/HorizontalBarChart";

interface mdCardWithImageProps {
    title: string;
}
export default function MdCardWithImage({ title }: mdCardWithImageProps) {
    return (
        <div className="relative bg-white rounded-xl  p-2 max-w-xs
        sm:max-w-md mx-auto transform  transition-transform 
        duration-300 ease-in-out ">
            <p>{title}</p>
            <HorizontalBarChart />
        </div>

    )
}





