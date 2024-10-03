import { PrimaryButton } from "@fluentui/react";
import React from "react";

interface CSVDownloadProps {
  data: { [key: string]: any }[]; // Accepting an array of objects
  target?: string; // Optional target prop
  filename: string; // Filename for the download
}

const CSVDownload: React.FC<CSVDownloadProps> = ({ data, target, filename }) => {
  // Convert data to CSV format
  const convertToCSV = () => {
    if (!data.length) return "";

    // Get headers from the first object
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(",")]; // Start with the headers row

    data.forEach((row) => {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '""'); // Escape quotes
        return `"${escaped}"`; // Wrap in quotes
      });
      csvRows.push(values.join(","));
    });

    return csvRows.join("\n"); // Join all rows with newline
  };

  // Trigger download
  const handleDownload = () => {
    const csvContent = convertToCSV();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    if (target) {
      link.setAttribute("target", target); // Optional target attribute
    }
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="flex justify-end mb-2">
      <PrimaryButton onClick={() => handleDownload()}>Descargar</PrimaryButton>
    </div>
  );
};

export default CSVDownload;
