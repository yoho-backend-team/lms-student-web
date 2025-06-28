// AssessmentCard.jsx
import { FONTS } from "@/constants/uiConstants";
import { useState } from "react";
import {
    LineChart,
    Line,
    ResponsiveContainer,
    // Dot,
} from "recharts";

const data = [
    { value: 10 },
    { value: 30 },
    { value: 15 },
    { value: 35 },
    { value: 33 },
    { value: 28 },
    { value: 32 },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomDot = (props: any) => {
    const { cx, cy } = props;
    return (
        <circle
            cx={cx}
            cy={cy}
            r={10}
            fill="#6ee7b7"
            stroke="white"
            strokeWidth={2}
            className="drop-shadow-lg"
        />
    );
};

const Assesments = () => {
    const [selected, setselected] = useState("average");

    const changebtn = (id: string) => {
        setselected(id)
    }

    return (
        <div className="bg-[#f3f4f6] divshadow rounded-3xl p-6 w-full mx-auto ">
            <h2 className="text-xl font-semibold mb-6">Assessments</h2>

            <div className="relative h-32 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#BDC2C7BF"
                            strokeWidth={10}
                            dot={<CustomDot />}
                        />
                    </LineChart>
                </ResponsiveContainer>

                {/* Bubble showing percentage */}
                {
                    selected == "average" &&
                    <div className="absolute left-16 -bottom-7 flex flex-col items-center">
                        <div className="h-14 w-3 bg-gray-300 mt-2 rounded-full"></div>
                        <div className="w-16 h-16 bg-gradient-to-br from-green-200 to-green-400 text-black rounded-full flex items-center justify-center text-lg font-bold shadow-md">
                            4%
                        </div>
                    </div>
                }

                {
                    selected == "exam" &&
                    <div className="absolute left-60 -bottom-7 flex flex-col items-center">
                        <div className="h-18 w-3 bg-gray-300 mt-2 rounded-full"></div>
                        <div className="w-16 h-16 bg-gradient-to-br from-green-200 to-green-400 text-black rounded-full flex items-center justify-center text-lg font-bold shadow-md">
                            4%
                        </div>
                    </div>
                }

                {
                    selected == "completed" &&
                    <div className="absolute right-15 -bottom-7 flex flex-col items-center">
                        <div className="h-12 w-3 bg-gray-300 mt-2 rounded-full"></div>
                        <div className="w-16 h-16 bg-gradient-to-br from-green-200 to-green-400 text-black rounded-full flex items-center justify-center text-lg font-bold shadow-md">
                            4%
                        </div>
                    </div>
                }

            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-3 h-[42px]">
                <button className="flex-1 btnshadow rounded-xl" onClick={() => changebtn("average")} style={{ ...FONTS.heading_06 }}>
                    Average
                </button>
                <button className="flex-1 btnshadow rounded-xl" onClick={() => changebtn("exam")} style={{ ...FONTS.heading_06 }}>
                    {/* <span role="img" aria-label="exam" className="mr-1">📋</span> */}
                    Exam
                </button>
                <button className="flex-1 btnshadow rounded-xl" onClick={() => changebtn("completed")} style={{ ...FONTS.heading_06 }}>
                    {/* <span role="img" aria-label="task" className="mr-1">✅</span> */}
                    Completed Task
                </button>
            </div>
        </div>
    );
};

export default Assesments;
