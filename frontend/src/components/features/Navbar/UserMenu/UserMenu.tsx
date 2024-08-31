import {
  Avatar as ShadCnAvatar,
  AvatarFallback,
} from "@/components/ui/avatar"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import { useAuth } from "@/hooks/useAuth"
import ThemeToggler from "./ThemeToggler";
import React from "react";

const UserMenu = () => {
    const { user } = useAuth(); // colocar infos do user no cookie

  return (
    <div className="p-3">
    <Popover>
        <PopoverTrigger asChild>
            <ShadCnAvatar className="cursor-pointer">
                <AvatarFallback className="border-2">LC</AvatarFallback>
            </ShadCnAvatar>
        </PopoverTrigger >

        <PopoverContent className="rounded-xl">
            <div className="flex flex-col items-start">
                <p>Lucas Campos</p>
                <p className="text-[12px] text-gray-500">lucaskmps@gmail.com</p>
            </div>
            <hr className="my-5"/>
            <ListItem><ThemeToggler/></ListItem>
            <ListItem>Logout</ListItem>
        </PopoverContent >
    </Popover>
    </div>
  )
}

interface ListItemProps {
  children: React.ReactNode;
}

const ListItem = ({ children }: ListItemProps) =>{
  return (
    <p className="py-2 cursor-pointer">{children}</p>
  )
}

export default UserMenu