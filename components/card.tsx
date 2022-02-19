import { Component } from "react";

type CardProps = {
    title: string,
    description: string,
    children: JSX.Element[] | JSX.Element
}

export const Card= (props : CardProps) => {
    return (
        <div className="max-w-4xl bg-white rounded-lg overflow-hidden shadow-xl mx-auto mt-8">
            <div className="mx-auto py-5 w-4/5">
                <div className="font-bold text-3xl mb-2">{props.title}</div>
                <p className="text- text-gray-700 text-base">{props.description}</p>

            </div>

            <div className="mb-6 py-[0.1rem] w-4/5 mx-auto bg-grape"></div>
            {props.children}
            {/* <div className="px-6 pt-4 pb-2">
                
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
            </div> */}
</div>
    )
}

export default Card