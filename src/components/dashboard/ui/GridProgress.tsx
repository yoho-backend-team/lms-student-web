import CircularProgressWithLabelDemo from "@/components/dashboard/ui/Progeress"
import logo from '../../../assets/icons/navbar/icons8-ionic-50.png'

const GridProgress = () => {
    return (
        <div className="flex flex-row justify-between p-2">
            <div className="flex flex-col">
                <h3 className="text-[18px]">Total Classes</h3>
                <img src={logo} alt="" width={30} height={30} className="mt-2" />
            </div>
            <div className="w-[60px] h-[60px]">
                <CircularProgressWithLabelDemo />
            </div>
        </div>
    )
}

export default GridProgress