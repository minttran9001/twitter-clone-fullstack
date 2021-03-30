import React from 'react'
import {gql,useQuery} from '@apollo/client'
const USER_QUERY = gql`
    query USER_QUERY{
        users{
            id
            name
        }
    }
`
interface User {
    name : string;
}
export const Users = () => {
    const {loading,error,data} = useQuery(USER_QUERY)
    if(loading) return (
        <div>Loadingg...</div>
    )
    if(error) return(
        <div className="">{error.message}</div>
    )
    return (
        <div>
            {
                data.users.map((user : User)=>(
                    <p>{user.name}</p>
                ))
            }
        </div>
    )
}
