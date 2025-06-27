import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';


const Tickets = () => {
	return (
		 <div className="flex min-h-screen flex-col items-start justify-start px-8 py-10  bg-[#ebeff3]  ">
      <h1 className="text-2xl font-bold mb-6">Ticket</h1>


      <div className="flex flex-row gap-3 mb-8">
        <Button className="bg-[#7b00ff]" variant="outline">All</Button>
        <Button className="bg-[#ebeff3]"variant="outline"
         style={{
                        boxShadow: `
      rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      rgba(189, 194, 199, 0.75) 2px 2px 3px inset
    `,
                      }}
                    >Open</Button>
        <Button className="bg-[#ebeff3]" variant="outline"
         style={{
                        boxShadow: `
      rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      rgba(189, 194, 199, 0.75) 2px 2px 3px inset
    `,
                      }}
                    >Close</Button>
      </div>


      <div className="grid  md:grid-cols-2 gap-6 w-full">

        <Card
          className="relative bg-[#ebeff3] h-[231px]"
          style={{
            boxShadow: `
   
       rgba(255, 255, 255, 0.7) -4px -4px 4px, 
       rgba(189, 194, 199, 0.75) 5px 5px 4px
      
    `,
          }}

        >


          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-chart-3">TICKET #ANTITS01</CardTitle>

              </div>
              <CardAction>
                <Dialog>
                  <DialogTrigger>
                    <Button
                      className="bg-[#ebeff3]"
                      variant="outline"
                      style={{
                        boxShadow: `
      rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      rgba(189, 194, 199, 0.75) 2px 2px 3px inset
    `,
                      }}
                    >
                      28 April
                    </Button>


                  </DialogTrigger>
                </Dialog>
              </CardAction>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">This ticket created from student mobile app</p>

            <p>If you can this yes successfully mobile app an android</p>
          </CardContent>

          <CardFooter>
            <div className="flex w-full justify-between items-center">


              <p>1</p>
              <CardAction >
                <Dialog>
                  <DialogTrigger className="text-sm font-medium text-primary shadow-md">
                    <Button className="bg-[#ebeff3] w-30" variant="outline"
                      style={{
                        boxShadow: `
      rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      rgba(189, 194, 199, 0.75) 2px 2px 3px inset
    `,
                      }}
                    >Opend</Button>

                  </DialogTrigger>
                </Dialog>
              </CardAction>
            </div>
          </CardFooter>

        </Card>
        <Card
          className="relative bg-[#ebeff3] h-[231px]"
          style={{
            boxShadow: `
   
       rgba(255, 255, 255, 0.7) -4px -4px 4px, 
       rgba(189, 194, 199, 0.75) 5px 5px 4px
      
    `,
          }}

        >

          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-chart-3">TICKET #ANTITS01</CardTitle>
                <CardDescription></CardDescription>
              </div>
              <CardAction>
                <Dialog>
                  <DialogTrigger>
                     <Button
                      className="bg-[#ebeff3]"
                      variant="outline"
                      style={{
                        boxShadow: `
       rgba(255, 255, 255, 0.7) 5px 5px 4px, 
       rgba(189, 194, 199, 0.75) 2px 2px 3px inset
    `,
                      }}
                    >
                      28 April
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardAction>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">This ticket created from student mobile app</p>

            <p>If you can this yes successfully mobile app an android</p>
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-between items-center">


              <p>1</p>
              <CardAction >
                <Dialog>
                  <DialogTrigger className="text-sm font-medium text-primary shadow-md">
                    <Button className="bg-[#ebeff3] w-30" variant="outline"
                      style={{
                        boxShadow: `
       rgba(255, 255, 255, 0.7) 5px 5px 4px, 
       rgba(189, 194, 199, 0.75) 2px 2px 3px inset
    `,
                      }}
                    >Opend</Button>

                  </DialogTrigger>
                </Dialog>
              </CardAction>
            </div>
          </CardFooter>

        </Card>
        <Card
          className="relative bg-[#ebeff3] h-[231px]"
          style={{
            boxShadow: `
   
       rgba(255, 255, 255, 0.7) -4px -4px 4px, 
       rgba(189, 194, 199, 0.75) 5px 5px 4px
      
    `,
          }}

        >

          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-chart-3">TICKET #ANTITS01</CardTitle>
                <CardDescription></CardDescription>
              </div>
              <CardAction>
                <Dialog>
                  <DialogTrigger>
                    <Button
                      className="bg-[#ebeff3]"
                      variant="outline"
                      style={{
                        boxShadow: `
       rgba(255, 255, 255, 0.7) 5px 5px 4px, 
       rgba(189, 194, 199, 0.75) 2px 2px 3px inset
    `,
                      }}
                    >
                      28 April
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardAction>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">This ticket created from student mobile app</p>

            <p>If you can this yes successfully mobile app an android</p>
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-between items-center">


              <p>1</p>
              <CardAction >
                <Dialog>
                  <DialogTrigger className="text-sm font-medium text-primary shadow-md">
                    <Button className="bg-[#ebeff3] w-30" variant="outline"
                      style={{
                        boxShadow: `
       rgba(255, 255, 255, 0.7) 5px 5px 4px, 
       rgba(189, 194, 199, 0.75) 2px 2px 3px inset
    `,
                      }}
                    >Opend</Button>

                  </DialogTrigger>
                </Dialog>
              </CardAction>
            </div>
          </CardFooter>
        </Card>
        <Card
          className="relative bg-[#ebeff3] h-[231px]"
          style={{
            boxShadow: `
   
       rgba(255, 255, 255, 0.7) -4px -4px 4px, 
       rgba(189, 194, 199, 0.75) 5px 5px 4px
      
    `,
          }}

        >

          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-chart-3">TICKET #ANTITS01</CardTitle>
                <CardDescription></CardDescription>
              </div>
              <CardAction>
                <Dialog>
                  <DialogTrigger>
                     <Button
                      className="bg-[#ebeff3]"
                      variant="outline"
                      style={{
                        boxShadow: `
      rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      rgba(189, 194, 199, 0.75) 2px 2px 3px inset
    `,
                      }}
                    >
                      28 April
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardAction>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">This ticket created from student mobile app</p>

            <p>If you can this yes successfully mobile app an android</p>
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-between items-center">


              <p>1</p>
              <CardAction >
                <Dialog>
                  <DialogTrigger className="text-sm font-medium text-primary shadow-md">
                    <Button className="bg-[#ebeff3] w-30" variant="outline"
                      style={{
                        boxShadow: `
       rgba(255, 255, 255, 0.7) 5px 5px 4px, 
       rgba(189, 194, 199, 0.75) 2px 2px 3px inset
    `,
                      }}
                    >Opend</Button>

                  </DialogTrigger>
                </Dialog>
              </CardAction>
            </div>
          </CardFooter>
        </Card>

      </div>
    </div>
	)
};

export default Tickets;
