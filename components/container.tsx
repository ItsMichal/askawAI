import { Component, useState } from "react";
import { Problem, RequestQuestionResponse } from "../pages/api/requestQuestions";
import Row from '../components/row';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReactDOMServer from "react-dom/server";
import Link from 'next/link';

const doc = new jsPDF();


type ContainerProps = {
    title: string,
    description: string,
    id: number,
    data: RequestQuestionResponse | undefined,
    // children: JSX.Element[] | JSX.Element
}

export const Container= (props : ContainerProps) => {
    let [rows, setRows] = useState(props.data);
    let onRemove : (questionId: number) => void = (questionId: number) => {
        let newRows : Problem[] = rows?.problems!;
        
        newRows.splice(questionId, 1);

        setRows({problems:newRows, topic: rows!.topic});
    }

    function DataCheck() : JSX.Element {
        if(props.data == undefined || rows!.problems.length < 1) {
            return <p>No questions. Please retry.</p>;                        
        }else{
            let map : JSX.Element[] | undefined =  rows?.problems.map(({question, answer}, index) =>{
                return <Row id={index} key={question} question={question} answer={answer} onRemove={onRemove}></Row>;
            })
            
            if(map == undefined)
            {
                return <p>Poopy.</p>
            }
            else{
                return map as unknown as JSX.Element;
            }
        }
    }
    



    return rows!.problems.length > 1 ? (
         /* <div className="max-w-4xl bg-white rounded overflow-hidden shadow-xl mx-auto mt-8"> */
        
        <div className="flex flex-col px-4 mx-2 shadow-lg">
        <div className="mb-6 py-[0.1rem] w-4/5 mx-auto bg-grape"></div>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden sm:rounded-lg">
                        <table className="min-w-full">
                            <thead>
                                <tr className="text-2xl font-bold">
                                    <td className="px-5 pb-5 mx-auto">Questions and Answers</td>
                                    
                                    <td className="lg:display hidden px-5 pb-5 mx-auto">Remove?</td>
                                </tr>
                                
                            </thead>
                            <tbody>
                                <DataCheck></DataCheck>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Link passHref href={{
                pathname:"/worksheet",
                query: {"questions": rows!.problems.map((prob)=>{
                    return prob.question;
                }),
                topic: rows!.topic}
            }}>
                <div className={"bg-grape hover:bg-white h-full text-white hover:text-purple-500 font-bold py-3.5 px-4 m-5 mr-5 rounded"}>
                    Export Worksheet! (HTML)
                </div>
            </Link>
           {/* {props.children} */}
        </div>
           
    ) : <></>;

    
}

export default Container