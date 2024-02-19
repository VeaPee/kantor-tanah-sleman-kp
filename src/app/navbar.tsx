import React from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <>
            <nav
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "white", // Add your desired background color here
                    zIndex: 1000
                }}
            >
                <a className="group rounded-lg border border-transparent px-5 py-4 transition-colors">
                    <button
                        className={`mb-3 text-2xl font-semibold`}
                        onClick={handleGoBack}
                    >
                        <span className="inline-block transition-transform group-hover:-translate-x-1 motion-reduce:transform-none">
                            &lt;-
                        </span>{" "}
                        Kembali
                    </button>
                </a>
            </nav>
            <div style={{ height: "60px" }}></div>
        </>
    );
}
