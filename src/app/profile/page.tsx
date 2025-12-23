'use client'
import { useEffect, useState } from "react";


export default function Profile() {
    const [displayName, setDisplayName] = useState<string | null>();
    const [profilePic, setProfilePic] = useState<string | null>();
    const [description, setDescription] = useState<string | null>();
    const [posts, setPosts] = useState<string[] | null>();

    useEffect(() => {
        const loadProfile = async () => {
        const response = await fetch('/api/users/profile', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            cache: 'no-store',
        })

        const data = await response.json()
        console.log('PROFILE DATA:', data)

        setDisplayName(data.displayName)
        setProfilePic(data.profilePic)
        setDescription(data.description)
        setPosts(data.posts)
        }

        loadProfile()
    }, [])

    return (
        <div>
            you're profile page
        </div>
    );
}