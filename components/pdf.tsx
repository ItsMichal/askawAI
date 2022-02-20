import React from "react";
import ReactDOMServer from "react-dom/server";
import jsPDF from "jspdf";
import Worksheet from '../pages/worksheet';
import { Component } from "react";
import html2canvas from "html2canvas";


const Foo = <b>foo</b>;

export default function PDF() {
    const save = () => {

        const input = document.getElementById("id");
        const doc = new jsPDF("p", "pt", "a4");

        html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
        });
        
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("download.pdf");  

   });
    //   doc.html(ReactDOMServer.renderToStaticMarkup(Foo), {
    //     callback: () => {
    //       doc.save("Worksheet.pdf");
    //     }
    //   });
    // };
  
    // return (
    //   <div>
    //     <button onClick={save}>Save</button>
    //   </div>
    // );
  }
}

