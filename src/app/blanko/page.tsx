"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../navbar";
import JsonData from "../data/data.json";

const LoadingIndicator = () => <div>Loading...</div>;

const DocumentBox = ({ title, onClick }: { title: string, onClick: () => void }) => (
  <div
    style={{
      backgroundColor: "white",
      padding: "35px",
      borderRadius: "5px",
      outline: "2px solid black",
      textAlign: "center",
      cursor: "pointer",
      width: "30%", // Mengatur lebar agar ada 3 item per baris
      margin: "10px", // Memberikan margin agar item tidak saling menumpuk
    }}
    onClick={onClick}
  >
    <div>
      <h4>{title}</h4>
    </div>
  </div>
);

export default function Blanko() {
  const router = useRouter();
  const [selectedPdf, setSelectedPdf] = useState(null);

  const handleBoxClick = (dokumen: any) => {
    setSelectedPdf(dokumen);
    const newUrl = new URL(window.location.href);
    newUrl.pathname = "/berkas"; // Update the pathname
    newUrl.searchParams.set("selectedPdf", dokumen);
    router.push(newUrl.pathname + "?" + newUrl.searchParams.toString());
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Navbar />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // Menyusun elemen dalam baris baru jika tidak muat pada baris saat ini
          justifyContent: "center", // Menyusun elemen di tengah
        }}
      >
        {JsonData.Blanko ? (
          JsonData.Blanko.map((d) => (
            <DocumentBox
              key={d.title}
              title={d.title}
              onClick={() => handleBoxClick(d.dokumen)}
            />
          ))
        ) : (
          <LoadingIndicator />
        )}
      </div>
    </div>
  );
}