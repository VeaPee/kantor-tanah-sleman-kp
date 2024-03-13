"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import Navbar from "../navbar";
import JsonData from "../data/data.json";

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
  const [fileLink, setFileLink] = useState<string>("");

  useEffect(() => {
    // Find the matching link from the JSON data based on decodedPdf
    const selectedBlanko = JsonData.Blanko.find((item: { dokumen: string }) => item.dokumen === decodedPdf);
    if (selectedBlanko && selectedBlanko.link) {
        // Fetch the PDF file from the link
        const fetchPdf = async () => {
            try {
                const response = await fetch(selectedBlanko.link);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setFile(url);
                setFileLink(selectedBlanko.link);
            } catch (error) {
                console.error("Error fetching PDF:", error);
            }
        };
        fetchPdf();
    }
  }, [decodedPdf]);
  
  return (
    <div className="Example">
      <Navbar />
      <div className="Example__container">
        {file && (
          <>
            <QRCode
              style={{ marginBottom: "30px", marginTop: "50px" }}
              value={fileLink}
              size={400}
            />
            <a href={file.toString()} download={fileLink}>
              Scan QR Ini Untuk Mengunduh Berkas
            </a>
          </>
        )}
      </div>
    </div>
  );
}
