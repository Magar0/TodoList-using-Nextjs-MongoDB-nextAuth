"use client";

import Document from "@/components/document/page";
import Todolist from "@/components/todolist/page";
import { setUser } from "@/store/slices/user";
import clsx from "clsx";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";

export default function Home() {
  const [page, setPage] = useState(1);
  const { data: session } = useSession();
  // const router = useRouter();
  const dispatch = useDispatch();
  const handlePage = (e) => setPage(e);

  // if (session === null) {
  //   router.replace("/login");
  // }
  // console.log({ session });

  useEffect(() => {
    if (session) {
      dispatch(
        setUser({
          username: session.user.username,
          email: session.user.email,
          userId: session.user.userId,
          imgLink: session.user.image,
          isLoggedIn: true,
        }),
      );
    }
  }, [session]);
  // if (session) {
  return (
    <main className="custom-height container mx-auto pb-3 pt-5 lg:pt-12">
      <div className="flex h-full justify-center gap-16">
        <div
          className={twMerge(
            clsx(
              "hidden h-full w-[400px] flex-col gap-4 px-1 sm:px-0 lg:flex",
              {
                flex: page === 1,
              },
            ),
          )}
        >
          <Todolist handlePage={handlePage} />
        </div>
        <div
          className={twMerge(
            clsx("hidden lg:flex", {
              "flex flex-col": page === 2,
            }),
          )}
        >
          <Document handlePage={handlePage} />
        </div>
      </div>
    </main>
  );
  // } else {
  //   return (
  //     <div className="grid h-screen w-screen place-items-center">
  //       <div className="loader2"></div>;
  //     </div>
  //   );
  // }
}
