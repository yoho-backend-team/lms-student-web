import { COLORS, FONTS } from '@/constants/uiConstants';
import backImg from '../../assets/icons/common/back_arrow.png';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Notifications = () => {
	return (
		<>
			<div className='py-8'>
				<div className='flex items-center gap-6'>
					<div
						className='cursor-pointer p-2 rounded-md'
						style={{
							boxShadow: `
								rgba(255, 255, 255, 0.7) 5px 5px 4px, 
								rgba(189, 194, 199, 0.75) 2px 2px 3px inset
								`,
						}}
					>
						<img src={backImg} alt='back' />
					</div>
					<p style={{ ...FONTS.heading_01 }}>Notification</p>
					<span style={{ ...FONTS.heading_06, marginLeft: '320px' }}>
						0 Message / 0 Unread
					</span>
				</div>
				<div className='grid md:grid-cols-2 gap-6 w-full mt-6'>
					<Card
						className='relative bg-[#ebeff3] px-5'
						style={{
							boxShadow: `
   
       rgba(255, 255, 255, 0.7) -4px -4px 4px, 
       rgba(189, 194, 199, 0.75) 5px 5px 4px
      
    `,
						}}
					>
						<input
							type='text'
							style={{
								boxShadow: `
								rgba(255, 255, 255, 0.7) 5px 5px 4px, 
								rgba(189, 194, 199, 0.75) 2px 2px 3px inset
								`,
								...FONTS.para_01,
							}}
							className='px-3 h-12 rounded-md'
							placeholder='Search'
						/>
						<div className='flex flex-row gap-3 mb-6'>
							<Button
								className='bg-[#7b00ff]'
								variant='outline'
								style={{ ...FONTS.heading_06, color: COLORS.white }}
							>
								All
							</Button>
							<Button
								className='bg-[#ebeff3]'
								variant='outline'
								style={{
									boxShadow: `
      rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      rgba(189, 194, 199, 0.75) 2px 2px 3px inset
    `,
								}}
							>
								Read
							</Button>
							<Button
								className='bg-[#ebeff3]'
								variant='outline'
								style={{
									boxShadow: `
      rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      rgba(189, 194, 199, 0.75) 2px 2px 3px inset
    `,
								}}
							>
								Unread
							</Button>
						</div>
						<Card
							className='relative bg-[#ebeff3] h-[65px]'
							style={{
								boxShadow: `
   
       rgba(255, 255, 255, 0.7) -4px -4px 4px, 
       rgba(189, 194, 199, 0.75) 5px 5px 4px
      
    `,
							}}
						></Card>
					</Card>
					<Card
						className='relative bg-[#ebeff3] h-[231px]'
						style={{
							boxShadow: `
   
       rgba(255, 255, 255, 0.7) -4px -4px 4px, 
       rgba(189, 194, 199, 0.75) 5px 5px 4px
      
    `,
						}}
					></Card>
				</div>
			</div>
		</>
	);
};

export default Notifications;
