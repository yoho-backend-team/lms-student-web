import { CircularProgressWithLabelDemo } from "@/components/dashboard/ui/Progeress"
import type React from "react";
import { FONTS } from "@/constants/uiConstants";
import { dashicons } from "@/assets/icons/dashboard";

interface propstype {
    title: string;
    value: number;
    icon: string;
}

const GridProgress: React.FC<propstype> = ({ title, value, icon }) => {
    const color = {
        totalclass: "stroke-[#18BABA]",
        completed: "stroke-[#3ABE65]",
        pending: "stroke-[#6623E6]",
        liveclass: "stroke-[#DF23E6]",
        onlineclass: "stroke-[#A32AF3]",
        offlineclass: "stroke-[#E67123]",
    }
    return (
        <div className="flex flex-row justify-between p-2">
            <div className="flex flex-col">
                <h3
                    style={{ ...FONTS.para_03 }}
                    className="text-[18px]">{title ?? "title"}</h3>
                <img src={dashicons[icon as keyof typeof dashicons]} alt="" width={30} height={30} className="mt-2" />
            </div>
            <div className="w-[60px] h-[60px]">
                <CircularProgressWithLabelDemo value={value ?? 0} color={color[icon as keyof typeof color]} />
            </div>
        </div >
    )
}

export default GridProgress