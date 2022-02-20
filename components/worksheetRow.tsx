import { Component } from "react";
import xIcon from '../public/xIcon.svg';
import { TrashIcon } from '@heroicons/react/solid'
import Image from 'next/image'


type WorksheetRowProps = {
    id: number,
    question: string,
   
}   

export const WorksheetRow = (props : WorksheetRowProps) => {
    return (<>
        <div className="">
            <div className="w-4/5 mx-auto my-10 font-bold text-xl">{props.id+1 +") "+props.question}</div>
                <div className="border-2 rounded mx-auto w-4/5 h-64 border-black bg-purple-100"></div>
        </div>
        <div className="w-full bg-white my-10"></div>
        
        </>
       
           
    )
}

export default WorksheetRow