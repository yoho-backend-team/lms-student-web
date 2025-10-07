/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { TabViewResponsive } from "@/hooks/TabViewResponce/TabViewResponsive";
import { getTaskReportService } from "@/features/Dashboard/services";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const Assesments = () => {
  const dashboard: any = useSelector(
    (state: RootState) => state.dashboard.data
  );
  const [task, settask] = useState<any>({});
  const [activeTab, setactiveTab] = useState<"total" | "pending" | "completed">(
    "total"
  );
  const { TabView } = TabViewResponsive();

  const assessmentDots = [
    { top: "top-[83px]", left: "left-0" },
    { top: "top-[8px] sm:top-0", left: "left-[66px]" },
    { top: "top-[18px] sm:top-[53px]", left: "left-[132px]" },
    { top: "top-[8px] sm:top-5", left: "left-[198px]" },
    { top: "top-[40px] sm:top-[3px]", left: "left-[260px]" },
    { top: "top-[35px]", left: "left-[318px]" },
    { top: "top-[33px]", left: "left-[381px]" },
  ];

  useEffect(() => {
    (async () => {
      const response = await getTaskReportService({
        studentid: dashboard?.user?._id,
        courseid: dashboard?.courses?.[0]?.course?._id,
      });
      settask(response?.track);
    })();
  }, [dashboard?.courses, dashboard?.user?._id]);

  return (
    <>
      <Card
        className={`w-full h-[300px] xs:h-auto p-5 xs:p-4 flex flex-col items-start ${
          TabView ? "gap-8" : "gap-2.5"
        } relative bg-[#ebeff3] rounded-2xl shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]`}
      >
        <CardContent className="flex flex-col w-[400px] xs:w-full items-start gap-5 xs:gap-4 relative flex-[0_0_auto] p-0">
          <div className="relative self-stretch mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-semibold text-black text-xl xs:text-lg tracking-[0] leading-[normal]">
            Assesments
          </div>

          {/* Graph wrapper: scrollable */}
          <div className="relative w-full h-[153px] xs:h-[120px]">
  <div className="relative w-full h-full">
    <div className="relative w-[340px] sm:w-full h-[100px] sm:h-[117px] xs:h-[90px] bg-[url(https://c.animaapp.com/mck68j5cT59wYP/img/vector-1.svg)] bg-[100%_100%] bg-contain xs:bg-cover">
      <div className="relative w-full h-[103px] xs:h-[80px] top-px left-0">
        {assessmentDots.map((dot, index) => (
          <div
            key={`dot-${index}`}
            className={`absolute w-[20px] xs:w-[14px] h-[20px] xs:h-[14px] ${dot.top} ${dot.left} rounded-[9.28px/9.67px] 
                     divshadow
                     bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)]`}
          />
        ))}
      </div>
    </div>
              {/* Active Tab Indicators */}
              {activeTab === "total" && (
                <div>
                  <div className="absolute w-[12px] xs:w-[8px] h-[118px] xs:h-[90px] top-[35px] xs:top-[25px] left-[72px] xs:left-[55px] bg-[#ebeff3] rounded-2xl xs:rounded-xl border-[0.4px] border-solid border-[#f4f6f8] shadow-[2px_2px_4px_#ffffffbf,inset_1px_1px_2px_#bdc2c7bf]" />
                  <div className="flex flex-col w-[52px] xs:w-[40px] h-[54px] xs:h-[42px] items-center justify-center gap-2.5 px-[13px] xs:px-[10px] py-3.5 xs:py-2.5 absolute top-[99px] xs:top-[75px] left-[50px] xs:left-[40px] rounded-[56px] shadow-[inset_4px_4px_8px_#ffffffbf,inset_8px_8px_12px_#ffffff40,inset_-4px_-4px_8px_#73e2bbbf,inset_-8px_-8px_12px_#73e2bbcc,4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)]">
                    <div className="relative w-fit [font-family:'Quicksand',Helvetica] font-semibold text-black text-lg xs:text-sm tracking-[0] leading-[normal]">
                      {task?.total}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "pending" && (
                <div>
                  <div className="absolute w-[12px] xs:w-[8px] h-[110px] xs:h-[85px] top-[45px] xs:top-[30px] left-[50%] bg-[#ebeff3] rounded-2xl xs:rounded-xl border-[0.4px] border-solid border-[#f4f6f8] shadow-[2px_2px_4px_#ffffffbf,inset_1px_1px_2px_#bdc2c7bf]" />
                  <div className="flex flex-col w-[52px] xs:w-[40px] h-[54px] xs:h-[42px] items-center justify-center gap-2.5 px-[13px] xs:px-[10px] py-3.5 xs:py-2.5 absolute top-[99px] xs:top-[75px] left-[45%] rounded-[56px] shadow-[inset_4px_4px_8px_#ffffffbf,inset_8px_8px_12px_#ffffff40,inset_-4px_-4px_8px_#73e2bbbf,inset_-8px_-8px_12px_#73e2bbcc,4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)]">
                    <div className="relative w-fit [font-family:'Quicksand',Helvetica] font-semibold text-black text-lg xs:text-sm tracking-[0] leading-[normal]">
                      {task?.pending}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "completed" && (
                <div>
                  <div className="absolute w-[12px] xs:w-[8px] h-[100px] xs:h-[75px] top-[60px] xs:top-[40px] left-[75%] bg-[#ebeff3] rounded-2xl xs:rounded-xl border-[0.4px] border-solid border-[#f4f6f8] shadow-[2px_2px_4px_#ffffffbf,inset_1px_1px_2px_#bdc2c7bf]" />
                  <div className="flex flex-col w-[52px] xs:w-[40px] h-[54px] xs:h-[42px] items-center justify-center gap-2.5 px-[13px] xs:px-[10px] py-3.5 xs:py-2.5 absolute top-[99px] xs:top-[75px] left-[70%] sm:left-[70%] rounded-[56px] shadow-[inset_4px_4px_8px_#ffffffbf,inset_8px_8px_12px_#ffffff40,inset_-4px_-4px_8px_#73e2bbbf,inset_-8px_-8px_12px_#73e2bbcc,4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)]">
                    <div className="relative w-fit [font-family:'Quicksand',Helvetica] font-semibold text-black text-lg xs:text-sm tracking-[0] leading-[normal]">
                      {task?.completed}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        {/* Tabs */}
        <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto] gap-1 xs:gap-2 -mt-2 xs:-mt-3">
          <Button
            onClick={() => setactiveTab("total")}
            className={
              activeTab === "total"
                ? "flex flex-1 min-w-0 max-w-[114px] xs:max-w-[90px] h-[42px] xs:h-[36px] items-center text-white justify-center gap-2.5 px-3 xs:px-2 py-2 xs:py-1.5 relative rounded-lg shadow-[inset_-2px_4px_15px_#ffffffbf,inset_8px_8px_12px_#ffffff40,inset_-4px_-4px_8px_#6ae1b7,inset_-8px_-8px_12px_#6ae1b7,4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)] text-sm xs:text-xs"
                : "flex flex-1 min-w-0 max-w-[114px] xs:max-w-[90px] h-[42px] xs:h-[36px] items-center text-[#706f6f] justify-center gap-2.5 px-4 xs:px-3 py-3.5 xs:py-2.5 relative bg-[#ebeff3] rounded-lg border border-solid border-[#f4f7f9] shadow-[inset_2px_2px_8px_#bdc2c7bf,4px_4px_8px_#ffffffbf] hover:shadow-[inset_-2px_4px_15px_#ffffffbf,inset_8px_8px_12px_#ffffff40,inset_-4px_-4px_8px_#6ae1b7,inset_-8px_-8px_12px_#6ae1b7,4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] hover:bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)] hover:text-white text-sm xs:text-xs"
            }
          >
            total
          </Button>

          <Button
            onClick={() => setactiveTab("pending")}
            variant="outline"
            className={
              activeTab === "pending"
                ? "flex flex-1 min-w-0 max-w-[114px] xs:max-w-[90px] h-[42px] xs:h-[36px] items-center text-white justify-center gap-2.5 px-3 xs:px-2 py-2 xs:py-1.5 relative rounded-lg shadow-[inset_-2px_4px_15px_#ffffffbf,inset_8px_8px_12px_#ffffff40,inset_-4px_-4px_8px_#6ae1b7,inset_-8px_-8px_12px_#6ae1b7,4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)] hover:text-white text-sm xs:text-xs"
                : "flex flex-1 min-w-0 max-w-[114px] xs:max-w-[90px] h-[42px] xs:h-[36px] items-center text-[#706f6f] justify-center gap-2.5 px-4 xs:px-3 py-3.5 xs:py-2.5 relative bg-[#ebeff3] rounded-lg border border-solid border-[#f4f7f9] shadow-[inset_2px_2px_8px_#bdc2c7bf,4px_4px_8px_#ffffffbf] hover:shadow-[inset_-2px_4px_15px_#ffffffbf,inset_8px_8px_12px_#ffffff40,inset_-4px_-4px_8px_#6ae1b7,inset_-8px_-8px_12px_#6ae1b7,4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] hover:bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)] hover:text-white text-sm xs:text-xs"
            }
          >
            pending
          </Button>

          <Button
            onClick={() => setactiveTab("completed")}
            variant="outline"
            className={
              activeTab === "completed"
                ? "flex flex-1 min-w-0 max-w-[114px] xs:max-w-[90px] h-[42px] xs:h-[36px] items-center text-white justify-center gap-2.5 px-3 xs:px-2 py-2 xs:py-1.5 relative rounded-lg shadow-[inset_-2px_4px_15px_#ffffffbf,inset_8px_8px_12px_#ffffff40,inset_-4px_-4px_8px_#6ae1b7,inset_-8px_-8px_12px_#6ae1b7,4px_4px_8px_#bdc2c7bf,8px_8px_12px_#6ae1b7, -4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)] hover:text-white text-sm xs:text-xs"
                : "flex flex-1 min-w-0 max-w-[114px] xs:max-w-[90px] h-[42px] xs:h-[36px] items-center text-[#706f6f] justify-center gap-2.5 px-4 xs:px-3 py-3.5 xs:py-2.5 relative bg-[#ebeff3] rounded-lg border border-solid border-[#f4f7f9] shadow-[inset_2px_2px_8px_#bdc2c7bf,4px_4px_8px_#ffffffbf] hover:shadow-[inset_-2px_4px_15px_#ffffffbf,inset_8px_8px_12px_#ffffff40,inset_-4px_-4px_8px_#6ae1b7,inset_-8px_-8px_12px_#6ae1b7,4px_4px_8px_#bdc2c7bf,8px_8px_12px_#6ae1b7,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] hover:bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)] hover:text-white text-sm xs:text-xs"
            }
          >
            Completed
          </Button>
        </div>
      </Card>
    </>
  );
};

export default Assesments;
