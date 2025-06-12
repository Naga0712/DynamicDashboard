'use client'
import ComponentCard from "../components/common/ComponentCard"

export default function DashboardPage() {
    return (
        <div className="space-y-2">
            <div className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-6 bg-red-500">
                    <ComponentCard title={"USER DETAILS"}  >
                        <p>Hello</p>
                    </ComponentCard>

                </div>
                <div className="col-span-6 bg-blue-500">
                    <ComponentCard title={"WORK DETAILS "}  >
                        <p>HII</p>
                    </ComponentCard>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-7">
                    <ComponentCard title={"DASHBOARD-1"}  >
                        <p>Hello</p>
                    </ComponentCard>

                    <ComponentCard title={"DASHBOARD-2"}  >
                        <p>Hello</p>
                    </ComponentCard>
                </div>

                <div className="col-span-12 xl:col-span-5 ">
                    <ComponentCard title={"DASHBOARD-3"}  >
                        <p>Hello</p>
                    </ComponentCard>
                </div>
            </div>
        </div>
    )
}
