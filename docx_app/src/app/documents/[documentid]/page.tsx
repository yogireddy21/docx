interface DocumentIdPageProps{
params: Promise<{documentid: string}>;
};
const DocumentIdPage = async ({params}: DocumentIdPageProps)=>{
    const awaitedParams =await params;
    const documentid=awaitedParams.documentid;
    return ( 
        <div>
            Document Id: {documentid}
        </div>
     );
}

export default DocumentIdPage;