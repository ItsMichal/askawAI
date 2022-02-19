import { Component } from "react";
import xIcon from '../public/xIcon.svg';
import { TrashIcon } from '@heroicons/react/solid'
import Image from 'next/image'


type RowProps = {
    id: number,
    question: string,
    answer: string,
    onRemove: (questionId: number) => void
}   

export const Row = (props : RowProps) => {
    return (<>
        <tr>
           <td className="text-purple-500 py-3 px-3 font-semibold text-lg colspan-2">{props.question}</td>
           <td className="rowspan-2 flex flex-col">
               <div className="flex-grow"></div>
               <div className="flex flex-row">
                    <div className="flex-grow"></div> 
                    <button onClick={()=>{props.onRemove(props.id)}} className="mx-auto">
                        <TrashIcon className="h-8 w-8 text-dark-grape"/>
                    </button>
                    <div className="flex-grow"></div> 
               </div>
               <div className="flex-grow"></div> 
            </td>
        </tr>
        <tr className="shadow-lg">
           <td className="py-3 px-3 mx-auto">{props.answer}</td>
        </tr>
        <div className="w-full bg-white my-10"></div></>
       
           
    )
}

export default Row