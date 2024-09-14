import { setUser } from "@/store/slices/user";
import {
  ArrowUpOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const PopoverContent = () => {
  const { username, imgLink, email } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    dispatch(
      setUser({
        email: null,
        username: null,
        imgLink: null,
        isLoggedIn: false,
      }),
    );
    await signOut();
  };
  return (
    <>
      <div className="group mb-2 flex w-full cursor-pointer items-center justify-start gap-2 rounded-xl p-3 hover:bg-[#0859de] hover:text-white">
        {imgLink ? (
          <Image
            className="h-11 w-11 rounded-full"
            src={imgLink}
            alt="profilePic"
            height={44}
            width={44}
          />
        ) : (
          <p className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-700 text-2xl font-bold uppercase text-white">
            {username && username.substring(0, 1)}
          </p>
        )}
        <div className="flex flex-1 items-center justify-between">
          <div>
            <p className="text-lg font-bold capitalize text-[#1a2c47] group-hover:text-white">
              {username && username}
            </p>
            <p className="text-sm text-[#61738e] group-hover:text-white">
              {email && email?.length < 25
                ? email
                : email?.substring(0, 25) + "..."}
            </p>
          </div>
          <i>
            <ArrowUpOutlined
              rotate={45}
              style={{ color: "white", fontSize: "1.2rem" }}
            />
          </i>
        </div>
      </div>
      <div className="flex w-full flex-grow flex-col gap-2 pl-2">
        <Link
          href={"#"}
          className="flex gap-3 text-base font-medium md:text-lg"
        >
          <i>
            <SettingOutlined />
          </i>
          <p>Settings & Privacy</p>
        </Link>
        <Link
          href={"#"}
          onClick={logoutHandler}
          className="flex gap-3 text-base font-medium text-[#e22d4c] md:text-lg"
        >
          <i>
            <LogoutOutlined />
          </i>
          <p>Logout</p>
        </Link>
      </div>
    </>
  );
};

export default PopoverContent;
