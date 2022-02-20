const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
import type { NextApiRequest, NextApiResponse } from 'next'
import useSWR from 'swr';

export interface Problem {
    question: string,
    answer: string
}

export interface RequestQuestionRequest {
    topic : string,
}

export interface RequestQuestionResponse  {
    problems : Problem[],
    topic: string
}
export interface RequestQuestionError  {
    error : string
}

export default async function requestQuestions(
    req: NextApiRequest,
    res: NextApiResponse<RequestQuestionResponse | RequestQuestionError>
){  
    let topic = req.query.topic;
    if(topic === undefined || typeof topic !== "string"){
        res.send({error:"invalid query"});
    }else{
        const response = await openai.createCompletion("text-curie-001", {
            prompt: "Write 5 questions on " + topic,
            temperature: 0.4,
            max_tokens: 80,
            top_p: 1.0,
            frequency_penalty: 0.4,
            presence_penalty: 0.4,
            n: 1,
            stream: false,
        });

        let questions : string[] = response.data.choices[0].text.split("\n");

        questions = questions.filter(question => question !== "");

        const regex = /\d+\. /g;

        questions.forEach((question, index) =>{
            questions[index] = question.replace(regex, "");
        })

        const problems : Problem[] = [];


        //Can probably make this one API call
        for(let i = 0; i < questions.length; i++){
            const answer = await openai.createCompletion("text-curie-001", {
                prompt: questions[i],
                temperature: 0.2,
                max_tokens: 80,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
                n: 1,
                stream: false,
            });
            problems.push({"question": questions[i], "answer": answer.data.choices[0].text});
        }

        res.send({problems:problems, topic:topic});
    }

    

    

}
const fetcher = (...args : [RequestInfo, RequestInit | undefined]) => fetch(...args).then(res => res.json())

export function useQandA (topic : string) {
    const { data, error } = useSWR(topic.length>0 ? `/api/requestQuestions/?topic=${topic}` : null, fetcher)
  
    return {
      user: data,
      isLoading: !error && !data,
      isError: error
    }
}