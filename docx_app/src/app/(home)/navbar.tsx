import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import {UserButton ,OrganizationSwitcher} from "@clerk/nextjs"
const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-16 w-full px-6 py-3 border-b">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="logo" width={36} height={36} />
        </Link>
        <h3 className="text-xl font-semibold">DocMind</h3>
      </div>
      <SearchInput />
      <div className="flex gap-3 items-center pl-6">
         <OrganizationSwitcher afterCreateOrganizationUrl="/"
         afterSelectOrganizationUrl="/"
         afterLeaveOrganizationUrl="/"
         afterSelectPersonalUrl="/"
         />
         <UserButton/>
      </div>
     
    </nav>
  );
};

export default Navbar;