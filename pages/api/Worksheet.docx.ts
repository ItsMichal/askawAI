import createReport from 'docx-templates';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';



const template = fs.readFileSync("public/template.docx");

type TempRequest = {
    topic: string,
    questions: string[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const buffer = await createReport({
        template,
        data: req.query
    });
    fs.writeFileSync("public/temp.docx", buffer);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.send(fs.readFileSync("public/temp.docx"));
}

