'use client';

import MdCards from "../wrapperComponents/mdCard";
import MdCardWithImage from "../wrapperComponents/mdCardWithImage";
import SmCards from "../wrapperComponents/smCards";

export default function DashboardPage() {
    return (
        <div>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                {/* Left Side Cards */}
                <div className="col-span-12 xl:col-span-6 space-y-6">
                    {/* Row 1: Small Cards without chart */}
                    <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-4">
                            <SmCards title="Active Users" value="27/80" isChartVisible={false} />
                        </div>
                        <div className="col-span-4">
                            <SmCards title="Questions Answered" value="3,298" isChartVisible={false} />
                        </div>
                        <div className="col-span-4">
                            <SmCards title="Av. Session Length" value="2m 34s" isChartVisible={false} />
                        </div>
                    </div>

                    {/* Row 2: Small Cards with chart */}
                    <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-4">
                            <SmCards title="Starting Knowledge" value="64%" isChartVisible={true} />
                        </div>
                        <div className="col-span-4">
                            <SmCards title="Current Knowledge" value="86%" isChartVisible={true} />
                        </div>
                        <div className="col-span-4">
                            <SmCards title="Knowledge Gain" value="+34%" isChartVisible={true} />
                        </div>
                    </div>
                </div>

                {/* Right Side Card */}
                <div className="col-span-12 xl:col-span-6">
                    <MdCards title="Activity" />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                    <MdCardWithImage title="Weakest Topics" />
                </div>
                <div className="col-span-6">
                    <MdCardWithImage title="Strongest Topics" />
                </div>
            </div>
        </div>
    );
}
