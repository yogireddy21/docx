import { Editor } from "./editor";
import { Toolbar } from "./toolbar";
interface DocumentIdPageProps{
params: Promise<{documentid: string}>;
};
const DocumentIdPage = async ({params}: DocumentIdPageProps)=>{
    const awaitedParams =await params;
    const documentid=awaitedParams.documentid;
    return ( 
        <div className="min-h-screen bg-[#FAFBFD]">
           <Toolbar/>
            <Editor/>
        </div>
     );
}

export default DocumentIdPage;