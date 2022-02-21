import {useUsers} from "../utils/user";
import {IdSelect} from "./id-select";
import React from "react";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    const {data:users} = useUsers()
    return <IdSelect options={users || []} {...props}/>
}