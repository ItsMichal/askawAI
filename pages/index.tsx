import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/header'
import Card from '../components/card'
import SearchBar from '../components/searchBar'
import DetailCard from '../components/detailCard'
import Container from '../components/container'
import React, { useState } from 'react'
import { Footer } from '../components/footer'
import { RequestQuestionResponse, useQandA } from './api/requestQuestions'

const Home: NextPage = () => {
  let [showThing, changeShowThing] = useState(false);
  let [dataGenerated, changeGenStatus] = useState(false);
  let [curQuery, changeData] = useState("");

  function generated(query: string){
    changeShowThing(true);
    changeGenStatus(false);
    changeData(query);
  }
  
  function DataZone(){
    const { user, isLoading, isError } = useQandA(curQuery);

    if(showThing && isLoading){
      return (
        <div className="flex justify-center items-center p-5 text-purple-600 font-bold text-2xl">
          <svg role="status" className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-white fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          Loading results from OpenAI...
      </div>
    )}
    else if(user){
      return <Container title={''} description={''} data={user} id={0}></Container>
      // return <p>{user.problems}</p>
    }
    else{
      return <></>

    }
  }

  return (
    <div >
      <Head>
        <title>Askawai</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>

      <div className="grid grid-cols-6 h-full">
        <div className="lg:col-start-1 lg:col-span-6 col-start-1 col-end-7 mb-16 mx-2">
          <Card title={"Create a worksheet!"} description={"Simply enter your topic and click generate!"}>
            <SearchBar title={"search bar"} onGenerate={generated}></SearchBar>
           
            <DataZone></DataZone>
          </Card>
        </div>

        <div className="lg:col-start-1 lg:col-end-3 lg:mb-0 col-start-1 col-end-7 mb-4">
          <DetailCard title={'What is AskawAI?'} description={<p>A new innovative resource for teachers to create assignments for students.<br></br><br></br> Teachers, Ask Awai!</p>} >
          </DetailCard>
        </div>
        <div className="lg:col-start-3 lg:col-end-5 col-start-1 col-end-7 mb-4">
          <DetailCard title={'How is this done?'} description={'Using AI technology, it can generate any question from ranging difficulty levels and topics suited for your needs.'}>
          </DetailCard>
        </div>
        <div className="lg:col-end-7 lg:col-span-2 col-start-1 col-end-7 mb-4">
          <DetailCard title={'T9 Hacks'} description={'We made this for the T9 Hacks hackathon! Using OpenAI, Next.js, TailwindCSS!'}>
          </DetailCard>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home
