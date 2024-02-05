'use client'
import React from "react";
import Image from "next/image";
import Navbar from "../navbar";

export default function Struktur() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Navbar />
      <div>
        <Image
          src="/struktur.png"
          alt="struktur"
          width={900}
          height={460}
          priority
        />
      </div>
    </div>
  );
};
