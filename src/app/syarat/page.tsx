'use client'
import React from "react";
import Navbar from "../navbar";

export default function Syarat() {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Navbar />
            <div>
                <iframe
                    width="900"
                    height="685"
                    src="https://www.youtube.com/embed/cc3YA-6i3w8?si=BuBAVynTZiKRO213&autoplay=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}