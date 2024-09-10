import {
  Avatar as ShadCnAvatar,
  AvatarFallback,
} from "@/components/ui/avatar"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import ThemeToggler from "./ThemeToggler";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useSocket } from "@/hooks/useSocket";

const UserMenu = () => {
  const logout = useAuth().logout;
  const userData = useAuth().userData;
  const navigate = useNavigate();
  const disconnetFromWebSocket = useSocket().disconnectFromWebSocket;

  const handleLogout = () =>{
    disconnetFromWebSocket();
    logout();
    navigate("/auth/login");
  }

  return (
    <div className="absolute right-3 m-3">
    <Popover>
        <PopoverTrigger asChild>
            <ShadCnAvatar className="cursor-pointer">
                <AvatarFallback>{userData?.name[0]?.toLocaleUpperCase()}</AvatarFallback>
            </ShadCnAvatar>
        </PopoverTrigger >

        <PopoverContent className="rounded-xl">
            <div className="flex flex-col items-start">
                <p>{userData?.name}</p>
                <p className="text-[12px] text-gray-500">{userData?.email}</p>
            </div>
            <hr className="my-5"/>
            <ListItem><ThemeToggler/></ListItem>
            <ListItem onClick={() => handleLogout()}>Logout</ListItem>
        </PopoverContent >
    </Popover>
    </div>
  )
}

interface ListItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ListItem = ({ children, onClick }: ListItemProps) =>{
  return (
    <div className="py-2 cursor-pointer" onClick={onClick}>{children}</div>
  )
}

export default UserMenu