import Link from "next/link";
import Navbar from "./navbar";
const Home = () => {
  return ( 
    <div className="flex min-h-screen flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 g-16 bg-white">
           <Navbar/>
      </div>
    <div className="mt-16">
     click <Link href="/documents/123"><span className="text-blue-500 underlined">here</span></Link> to go to documents page
    </div> 
    </div>
   );
} 
 
export default Home;