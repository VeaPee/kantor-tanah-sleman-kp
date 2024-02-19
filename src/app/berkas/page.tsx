"use client";
import { useEffect, useCallback, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";

import Navbar from "../navbar";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import type { PDFDocumentProxy } from "pdfjs-dist";
import "./Sample.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 600;

type PDFFile = string | File | null;

function getQueryParam(name: string, url: string) {
  name = name.replace(/[[]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default function Berkas() {
  const isClientSide = typeof window !== "undefined";

  const searchParams = isClientSide ? window.location.search : "";
  const selectedPdf = getQueryParam("selectedPdf", searchParams);
  const decodedPdf = selectedPdf ? decodeURIComponent(selectedPdf) : null;
  const [file, setFile] = useState<PDFFile>(decodedPdf || "dokumen/test.pdf");

  useEffect(() => {
    console.log(selectedPdf);
    if (decodedPdf) {
      setFile(decodedPdf);
    }
  }, [decodedPdf, selectedPdf]);

  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  const handlePrint = () => {
    if (isClientSide) {
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Print</title>
            </head>
            <body>
              <div>
                <iframe width="100%" height="100%" src="${file}" frameborder="0"></iframe>
              </div>
            </body>
          </html>
        `);
        
        printWindow.document.close();
      }
    }
  };

  
  return (
    <div className="Example">
      <Navbar />
      <div className="Example__container">
      <button onClick={handlePrint}>Print</button>

        <div className="Example__container__document" ref={setContainerRef}>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            
          > 
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
