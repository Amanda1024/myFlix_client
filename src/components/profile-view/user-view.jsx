import React from 'react'

function UserInfo({ email, username }) {
    return (
        <>
         <h4>Your Info</h4>
         <p>Name: {username}</p>
         <p>e-mail: {email}</p>
        </> 
    )
}

export default UserInfo