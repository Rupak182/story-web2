import React from 'react'
import { Button } from './ui/button'

export default function LoadingButton({pending,text}:{pending:boolean,text:string}) {

  return (
    
    <Button className='w-full font-bold' type="submit">
      {text}
    </Button>

  )
}
