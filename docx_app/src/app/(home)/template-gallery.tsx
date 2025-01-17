"use client"; 
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: ""
  },
  {
    id: "softwareProposal",
    label: "Software Proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `
      <h1>Software Development Proposal</h1>
      
      <h2>Executive Summary</h2>
      <p>This proposal outlines the development of [Software Name], a solution designed to [brief description of main purpose].</p>
      
      <h2>Project Overview</h2>
      <p>Our team proposes to develop...</p>
      
      <h2>Scope of Work</h2>
      <ul>
        <li>Requirements Analysis and Planning</li>
        <li>Design and Architecture</li>
        <li>Development and Implementation</li>
        <li>Testing and Quality Assurance</li>
        <li>Deployment and Maintenance</li>
      </ul>
      
      <h2>Timeline</h2>
      <table>
        <tr>
          <th>Phase</th>
          <th>Duration</th>
          <th>Deliverables</th>
        </tr>
        <tr>
          <td>Planning</td>
          <td>2 weeks</td>
          <td>Project plan, requirements document</td>
        </tr>
        <tr>
          <td>Development</td>
          <td>8 weeks</td>
          <td>Working software modules</td>
        </tr>
      </table>
      
      <h2>Budget</h2>
      <p>The estimated budget for this project is...</p>
      
      <h2>Team</h2>
      <p>Our team consists of experienced professionals...</p>
    `
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `
      <h1>[Your Name]</h1>
      <p>[Email] | [Phone] | [Location]</p>
      
      <h2>Professional Summary</h2>
      <p>Results-driven professional with [X] years of experience in [industry/field]. Demonstrated expertise in...</p>
      
      <h2>Work Experience</h2>
      <h3>[Company Name] | [Job Title] | [Dates]</h3>
      <ul>
        <li>Achieved [specific accomplishment] resulting in [measurable outcome]</li>
        <li>Led team of [X] members in developing and implementing...</li>
        <li>Increased [metric] by [X]% through...</li>
      </ul>
      
      <h2>Education</h2>
      <p>[Degree] in [Field]</p>
      <p>[University Name], [Graduation Year]</p>
      
      <h2>Skills</h2>
      <ul>
        <li>Technical Skills: [List relevant technical skills]</li>
        <li>Soft Skills: [List relevant soft skills]</li>
      </ul>
      
      <h2>Certifications</h2>
      <ul>
        <li>[Certification Name], [Issuing Organization], [Year]</li>
      </ul>
    `
  },
  {
    id: "projectProposal",
    label: "Project Proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
      <h1>Project Proposal</h1>
      
      <h2>Project Overview</h2>
      <p>This document proposes [Project Name], which aims to [primary objective].</p>
      
      <h2>Problem Statement</h2>
      <p>Currently, [describe the problem or need]...</p>
      
      <h2>Proposed Solution</h2>
      <p>We propose to [describe your solution]...</p>
      
      <h2>Project Scope</h2>
      <h3>Included in Scope:</h3>
      <ul>
        <li>Deliverable 1</li>
        <li>Deliverable 2</li>
        <li>Deliverable 3</li>
      </ul>
      
      <h3>Out of Scope:</h3>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
      
      <h2>Timeline and Milestones</h2>
      <table>
        <tr>
          <th>Milestone</th>
          <th>Date</th>
          <th>Deliverables</th>
        </tr>
        <tr>
          <td>Phase 1</td>
          <td>[Date]</td>
          <td>[Deliverables]</td>
        </tr>
      </table>
      
      <h2>Budget</h2>
      <p>The estimated budget for this project is [amount]...</p>
    `
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/letter.svg",
    initialContent: `
      <p>[Your Name]</p>
      <p>[Your Address]</p>
      <p>[City, State ZIP]</p>
      
      <p>[Date]</p>
      
      <p>[Recipient Name]</p>
      <p>[Recipient Title]</p>
      <p>[Company Name]</p>
      <p>[Address]</p>
      <p>[City, State ZIP]</p>
      
      <p>Dear [Recipient Name],</p>
      
      <p>[Body of the letter goes here...]</p>
      
      <p>Sincerely,</p>
      <p>[Your Name]</p>
      <p>[Your Title]</p>
    `
  },
  {
    id: "coverLetter",
    label: "Cover Letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
      <p>[Your Name]</p>
      <p>[Your Address]</p>
      <p>[City, State ZIP]</p>
      <p>[Email]</p>
      <p>[Phone]</p>
      
      <p>[Date]</p>
      
      <p>[Hiring Manager's Name]</p>
      <p>[Company Name]</p>
      <p>[Company Address]</p>
      <p>[City, State ZIP]</p>
      
      <p>Dear [Hiring Manager's Name],</p>
      
      <p>I am writing to express my strong interest in the [Position] role at [Company Name], as advertised on [where you found the job]. With my background in [relevant field/skills], I am confident in my ability to contribute effectively to your team.</p>
      
      <p>In my current role at [Current/Most Recent Company], I have [describe relevant achievements and responsibilities]. This experience has equipped me with [relevant skills] that align perfectly with the requirements of this position.</p>
      
      <p>I am particularly drawn to [Company Name] because [specific reasons why you're interested in the company]. Your company's commitment to [company value/mission] resonates with my professional goals.</p>
      
      <p>Thank you for considering my application. I look forward to discussing how I can contribute to [Company Name].</p>
      
      <p>Best regards,</p>
      <p>[Your Name]</p>
    `
  },
  {
    id: "businessLetter",
    label: "Business Letter",
    imageUrl: "/business-letter.svg",
    initialContent: `
      <p>[Your Company Name]</p>
      <p>[Company Address]</p>
      <p>[City, State ZIP]</p>
      
      <p>[Date]</p>
      
      <p>[Recipient Name]</p>
      <p>[Recipient Title]</p>
      <p>[Company Name]</p>
      <p>[Address]</p>
      <p>[City, State ZIP]</p>
      
      <p>Dear [Recipient Name],</p>
      
      <p>I am writing regarding [subject of letter]...</p>
      
      <p>[First paragraph: Introduction and purpose of the letter]</p>
      
      <p>[Second paragraph: Details and supporting information]</p>
      
      <p>[Third paragraph: Call to action or next steps]</p>
      
      <p>If you have any questions, please don't hesitate to contact me at [your phone number] or [your email].</p>
      
      <p>Sincerely,</p>
      <p>[Your Name]</p>
      <p>[Your Title]</p>
      <p>[Company Name]</p>
    `
  }
];



const TemplateGallery = () => {
    const router =useRouter();
    const create = useMutation(api.documents.create);
    const [isCreating,setIsCreating]=useState(false);
  
    const onTemplateClick =(title:string ,initialContent:string)=>{
        setIsCreating(true);
        create({title,initialContent})
        .catch(()=>toast.error("Someting Went Wrong"))
        .then((documentId) => {
            router.push(`/documents/${documentId}`);
            toast.success("Document Created")
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
                    onClick={() => {onTemplateClick(template.label,template.initialContent)}}

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
