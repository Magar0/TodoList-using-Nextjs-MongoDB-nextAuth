"use client";

import { ArrowUpOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import PopoverContent from "./profilePopover";

const Header = () => {
  const pathname = usePathname();
  const { username, imgLink } = useSelector((state) => state.user);

  if (
    pathname.startsWith("/dashboard/:path*") ||
    pathname.startsWith("/dashboard")
  ) {
    return (
      <header className="flex items-center justify-between gap-2 px-3 py-4 sm:px-12">
        <div className="flex">
          <Image src={"/img/Frame1.png"} height={25} width={25} />
          <p className="ml-2 text-2xl font-bold text-white">TODO</p>
        </div>
        <Popover
          placement="bottomRight"
          content={<PopoverContent />}
          className="cursor-pointer"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700">
            {imgLink ? (
              <Image
                src={imgLink}
                height={48}
                width={48}
                className="rounded-full"
              />
            ) : (
              username && (
                <p className="text-2xl font-bold uppercase text-white">
                  {username?.substring(0, 1)}
                </p>
              )
            )}
          </div>
        </Popover>
        {/* <button
          className="border-none bg-transparent hover:text-blue-800"
          onClick={() => signOut()}
        >
          Sign Out
        </button> */}
      </header>
    );
  } else return null;
};

export default Header;
