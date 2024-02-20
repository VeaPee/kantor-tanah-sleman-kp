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
      const printWindow = window.open(file?.toString() || "");

      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
          setTimeout(() => {
            printWindow.close();
          }, 15000);
        };
      }
    }
  };

  return (
    <div className="Example">
      <Navbar />
      <div className="Example__container">
        <button
          onClick={handlePrint}
          className="group rounded-lg border border-black bg-white px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 mb-3 text-1xl font-semibold"
          rel="noopener noreferrer"
          style={{
            marginTop: "20px",
          }}
        >
          Print
        </button>

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
