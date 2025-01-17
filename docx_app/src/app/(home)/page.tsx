"use client";

import Navbar from "./navbar";
import TemplateGallery from "./template-gallery";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import DocumentsTable from "./dcoumnets-table";
import { useSearchParam } from "@/hooks/use-search-params";

const Home = () => {
  const [search] =useSearchParam();
  // Fetch documents using Convex's useQuery
 const { results, status, loadMore } = usePaginatedQuery(
  api.documents.get,
  { search}, // Provide the required `paginationOpts`
  { initialNumItems: 5 } // Optionally specify the initial number of items to load
);


  return (
    <div className="flex min-h-screen flex-col">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="mt-16">
        <TemplateGallery />

        <DocumentsTable documents={results} loadMore={loadMore} status={status}/>
      </div>
    </div>
  );
};

export default Home;
