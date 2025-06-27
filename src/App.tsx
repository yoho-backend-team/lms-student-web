import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
function App() {

  return (
    <>
      <div>
        <Button className="bg-secondary text-secondary-foreground shadow-xs hover:bg-primary/50">Click Me</Button>
      </div>
    </>
  )
}

export default App
