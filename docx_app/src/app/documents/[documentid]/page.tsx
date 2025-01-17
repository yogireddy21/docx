import { Editor } from "./editor";
import Navbar from "./navbar";
import { Room } from "./room";
import { Toolbar } from "./toolbar";
interface DocumentIdPageProps{
params: Promise<{documentid: string}>;
};
const DocumentIdPage = async ({params}: DocumentIdPageProps)=>{
    
    const awaitedParams =await params;
    const documentid=awaitedParams.documentid;
    return ( 
        <Room>
        <div className="min-h-screen bg-[#FAFBFD]">
            <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
                <Navbar/>
            <Toolbar/>
            </div>
        <div className="pt-[114px] print:pt-0">
         
             <Editor/>
         
        </div>
        </div>
        </Room>
     );
}

export default DocumentIdPage;