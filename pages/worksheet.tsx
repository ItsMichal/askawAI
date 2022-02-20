import { NextPage } from "next";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/header'
import Card from '../components/card'
import SearchBar from '../components/searchBar'
import DetailCard from '../components/detailCard'
import Container from '../components/container'
import WorksheetRow from '../components/worksheetRow'

import React, { useState } from 'react'
import { Footer } from '../components/footer'
import { RequestQuestionResponse, useQandA } from './api/requestQuestions'
import { useRouter } from 'next/router'

export const Worksheet: NextPage<Props> = () => {
    let {query} = useRouter() as unknown as Props;

    if(query == undefined) {
       query = {"topic":"Sample Topic", "questions": ["Sample Question"]};
    }

    return (<>
        <div className="p-5 w-7/8 mx-auto">
        <div className="container bg-white rounded-xl mt-10 mx-auto py-10">
            <h1 className="font-extrabold text-5xl w-4/5 mx-auto">{query.topic} Worksheet</h1>
            <h2 className="text-right w-4/5 mt-10 mx-auto h-10">Name: _________________________</h2>
            <h2 onClick={()=>{console.log(query);}}className="text-right w-4/5 mx-auto h-10">Date: _________________________</h2>
            {
                query.questions.map((question, index) => {
                    return <WorksheetRow key={index} id={index} question={question}></WorksheetRow>
                })
            }
            
        </div>

        

        </div>
        </>
    );
}

type WorksheetQandT = {
    questions: string[],
    topic: string
}

interface Props {
    query?: WorksheetQandT
}

Worksheet.getInitialProps = async ({query})=>{
    // if(query ==undefined){
    //     return {"topic":"Sample Topic", "questions": ["Sample Question"]}
    // }
    return query;
}

export default Worksheet