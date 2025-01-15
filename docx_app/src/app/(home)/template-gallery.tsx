"use client"; 
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

const templates = [
  { id: "blank", label: "Blank Document", imageUrl: "/blank-document.svg" },
  { id: "softwareProposal", label: "Software Proposal", imageUrl: "/software-proposal.svg" },
  { id: "resume", label: "Resume", imageUrl: "/resume.svg" },
  { id: "projectProposal", label: "Project Proposal", imageUrl: "/project-proposal.svg" },
  { id: "letter", label: "Letter", imageUrl: "/letter.svg" },
  { id: "coverLetter", label: "Cover Letter", imageUrl: "/cover-letter.svg" },
  { id: "businessLetter", label: "Business Letter", imageUrl: "/business-letter.svg" },
];

const TemplateGallery = () => {
    const router =useRouter();
    const create = useMutation(api.documents.create);
    const [isCreating,setIsCreating]=useState(false);
  
    const onTemplateClick =(title:string ,initialContent:string)=>{
        setIsCreating(true);
        create({title,initialContent})
        .then((documentId) => {
            router.push(`/documents/${documentId}`);
        })
        .finally(()=>{
            setIsCreating(false);
        })
    };
  return ( 
    <div className="bg-[#F1F3F4]">
      <div className="max-w-screen-xl mx-auto px-8 py-4 flex flex-col gap-y-3">
        <h3 className="font-medium">Start a new Document</h3>
        <Carousel>
          <CarouselContent className="-ml-2">
            {templates.map((template) => (
              <CarouselItem key={template.id} className="basis-1/3 sm:basis-1/4 md:basis-1/6 lg:basis-1/8 xl:basis-1/10 pl-2">
                <div className={cn(
                  "aspect-[3/4] flex flex-col gap-y-2",
                  isCreating && "pointer-events-none opacity-50"
                )}>
                  <button
                    disabled={isCreating}
                    onClick={() => {onTemplateClick(template.label,"")}}
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="w-full h-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-2 bg-white"
                  />
                  <p className="text-xs font-medium truncate">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext/>
        </Carousel>
      </div>
    </div>
  );
};

export default TemplateGallery;
