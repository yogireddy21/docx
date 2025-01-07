import Link from "next/link";
const Home = () => {
  return ( 
    <div className="flex min-h-screen justify-center items-center">
     click <Link href="/documents/123"><span className="text-blue-500 underlined">here</span></Link> to go to documents page
    </div> 
   );
} 
 
export default Home;