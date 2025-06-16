'use client'

interface mdCardsProps {
    title: string;
}
export default function mdCardWithArrow({ title }: mdCardsProps) {
    return (
        <div className="relative bg-white rounded-xl  p-2 max-w-xs
        sm:max-w-md mx-auto transform  transition-transform 
        duration-300 ease-in-out py-5">
            <p>{title}</p>

            <div className="flex justify-start py-5">
                <img src="/Micky_mouse.jpg" className="w-12 h-12 rounded-3xl" />
                <div className="px-3">
                    <p className="font-bold">Micky Mouse</p>
                    <p>637 Points - 98% Correct</p>
                </div>
            </div>
        </div>

    )
}





