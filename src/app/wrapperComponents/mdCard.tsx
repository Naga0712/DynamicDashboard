'use client'

import BarChart from "./Charts/BarChart";

interface mdCardsProps {
    title: string;
}
export default function MdCards({ title }: mdCardsProps) {
    return (
        <div className="relative bg-white rounded-xl  p-2 max-w-xs
        sm:max-w-md mx-auto transform  transition-transform 
        duration-300 ease-in-out ">
            <p>Actvitiy</p>
            <hr></hr>
            <BarChart />
        </div>

    )
}





