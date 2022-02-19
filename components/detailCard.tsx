import { Component } from "react";

type DetailCardProps = {
    title: string,
    description: string | JSX.Element,
    children: JSX.Element[] | JSX.Element
}

export const DetailCard = (props : DetailCardProps) => {
    return (
        <div className="mx-2 lg:mx-4 bg-white rounded overflow-hidden shadow-lg mx-auto">
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-center">{props.title}</div>
            <p className="text-gray-700 text-base">{props.description}</p>

        </div>
            {props.children}
            {}
</div>
    )
}

export default DetailCard