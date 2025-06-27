
import React from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'

const Classhistory = () => {
  return (
    <div>
          <div>
  <Card>
    {/* Header Row */}
    <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white mx-4 p-4">
      <table className="w-full">
        <thead>
          <tr className="flex justify-around items-center">
            <th>Title</th>
            <th>Start Date</th>
            <th>Start Time</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
      </table>
    </Card>

    <Card className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black mx-4 p-4">
      <table className="w-full">
        <tbody>
          <tr className="flex justify-around items-center">
            <td>HTML, CSS</td>
            <td>12-06-2025</td>
            <td>09.00 AM</td>
            <td>45 min</td>
            <td>
              <Button className="bg-gradient-to-r from-green-400 to-green-500 text-white  
                shadow-[0px_3px_4px_0px_rgba(255,255,255,0.75)_inset,3px_-3px_3px_0px_rgba(255,255,255,0.25)_inset,-4px_8px_23px_0px_#3ABE65_inset,-8px_-8px_12px_0px_#3ABE65_inset,2px_3px_3px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-1px_-1px_6px_0px_rgba(255,255,255,0.75),-1px_-1px_6px_1px_rgba(255,255,255,0.25)]">
                View Class
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>

    <Card className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black mx-4 p-4">
      <table className="w-full">
        <tbody>
          <tr className="flex justify-around items-center">
            <td>HTML, CSS</td>
            <td>12-06-2025</td>
            <td>09.00 AM</td>
            <td>45 min</td>
            <td>
              <Button className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]" variant="outline">
                View Class
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  </Card>
</div>

    </div>
  )
}

export default Classhistory
