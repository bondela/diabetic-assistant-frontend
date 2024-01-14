import React, {useEffect, useState} from 'react';

const Profile = () => {
    const [name, setName] = useState("")
    const [message, gotMessage] = useState("")

    useEffect(() => {
        (
            async () => {
                const response = await fetch("http://localhost:8000/api/user_info", {
                    headers: {"Content-Type": "application/json"},
                    credentials: "include",
                })

                const content = await response.json()
                if (content.message) {
                    gotMessage(content.message)
                }

                if (content.name) {
                    setName(content.name)
                }
            }
        )()
    })


    return (
        <div>
            USER PROFILE
        </div>
    );
};

export default Profile;