"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../navbar";
import JsonData from "../data/data.json";
import { Pagination, ThemeProvider, createTheme } from "@mui/material";

const LoadingIndicator = () => <div>Loading...</div>;

const DocumentBox = ({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) => (
  <div
    style={{
      backgroundColor: "white",
      padding: "35px",
      borderRadius: "5px",
      outline: "2px solid black",
      textAlign: "center",
      cursor: "pointer",
      width: "30%",
      margin: "10px",
    }}
    onClick={onClick}
  >
    <div>
      <h4>{title}</h4>
    </div>
  </div>
);

// Create a custom theme with increased pagination size
const theme = createTheme({
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          "& .MuiPaginationItem-root": {
            fontSize: "1.5rem", // Adjust the font size as needed
            minWidth: "48px", // Adjust the minimum width as needed
            minHeight: "48px", // Adjust the minimum height as needed
          },
        },
      },
    },
  },
});

export default function Blanko() {
  const router = useRouter();
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 15;

  const startIdx = (currentPage - 1) * documentsPerPage;
  const endIdx = startIdx + documentsPerPage;

  const totalPages = Math.ceil(JsonData.Blanko.length / documentsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const handleBoxClick = (dokumen: any) => {
    setSelectedPdf(dokumen);
    const newUrl = new URL(window.location.href);
    newUrl.pathname = "/berkas";
    newUrl.searchParams.set("selectedPdf", dokumen);
    router.push(newUrl.pathname + "?" + newUrl.searchParams.toString());
  };

  return (
    <ThemeProvider theme={theme}>
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
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "15px",
            marginTop: "10px",
          }}
        >
          {JsonData.Blanko ? (
            JsonData.Blanko.slice(startIdx, endIdx).map((d) => (
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
        <div>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{ fontSize: "1.5rem" }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
