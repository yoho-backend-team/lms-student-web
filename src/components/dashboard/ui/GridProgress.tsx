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
    return (
        <div className="flex flex-row justify-between p-2">
            <div className="flex flex-col">
                <h3
                    style={{ ...FONTS.heading_05 }}
                    className="text-[18px]">{title ?? "title"}</h3>
                <img src={dashicons[icon as keyof typeof dashicons]} alt="" width={30} height={30} className="mt-2" />
            </div>
            <div className="w-[60px] h-[60px]">
                <CircularProgressWithLabelDemo value={value ?? 0} />
            </div>
        </div>
    )
}

export default GridProgress