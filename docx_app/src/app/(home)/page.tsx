"use client";

import Link from "next/link";
import Navbar from "./navbar";
import TemplateGallery from "./template-gallery";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const Home = () => {
  // Fetch documents using Convex's useQuery
  const documents = useQuery(api.documents.get);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="mt-16">
        <TemplateGallery />

        {/* Render Documents */}
        {documents ? (
          documents.map((document) => (
            <span key={document._id} className="block">
              {document.title}
            </span>
          ))
        ) : (
          <p>Loading documents...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
