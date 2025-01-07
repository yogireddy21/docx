import { Editor } from "./editor";
interface DocumentIdPageProps{
params: Promise<{documentid: string}>;
};
const DocumentIdPage = async ({params}: DocumentIdPageProps)=>{
    const awaitedParams =await params;
    const documentid=awaitedParams.documentid;
    return ( 
        <div className="min-h-screen bg-[#FAFBFD]">
           
            <Editor/>
        </div>
     );
}

export default DocumentIdPage;