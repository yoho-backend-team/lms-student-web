
import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Car } from 'lucide-react'
import { Button } from '../ui/button'

const Liveclass = () => {
  return (
    <div>
        <Card> 
            <Card className='bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white mx-4 p-4' >
                <table className="w-full">
                <thead>
                    <tr className='flex justify-around' >
                    <td>Day</td>
                    <td>Topic</td>
                    <td>Join Link</td>
                    <td>Duration</td>
                    <td>Action</td>
                    </tr>
                </thead>
                </table>

            </Card>

            <Card className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black mx-4 p-4' >
                <table>
                    <tbody>
                    <tr className='flex justify-around text-center ' >
                    <td>Day 1</td>
                    <td>HTML </td>
                    <td><a href="">www.google.com</a></td>
                    <td>45 min</td>
                    <Button 
                    className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
                    variant="outline">
                        Join Now</Button>
                    </tr>
                    </tbody>
                </table>
            </Card>
        </Card>
    </div>
  )
}

export default Liveclass