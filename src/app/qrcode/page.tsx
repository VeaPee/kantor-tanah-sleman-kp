"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import Navbar from "../navbar";

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


  useEffect(() => {
    // Fetch the PDF file from the public folder
    const fetchPdf = async () => {
      try {
        const response = await fetch(file ? file.toString() : ""); // Adjust the path as needed
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setFile(url);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPdf();
  }, []);
  
  return (
    <div className="Example">
      <Navbar />
      <div className="Example__container">
        {file && (
          <>
            <QRCode
              style={{ marginBottom: "30px", marginTop: "50px" }}
              value={file.toString()}
              size={400}
            />
            <a href={file.toString()} download="test.pdf">
              Download PDF
            </a>
          </>
        )}
      </div>
    </div>
  );
}
