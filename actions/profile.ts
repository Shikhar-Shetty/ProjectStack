"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

type ProfileData = {
    skills?: string[],
    section ?:string
    branch ?:string
    year ?:string
    bio ?: string | null
}

export async function editProfile(data: ProfileData){
    const session = await getServerSession(authOptions);
    if(!session?.user.email) throw new Error("Unauthorized Access");
    const user = await prisma.user.findUnique({
        where: { email: session.user.email}
    })
    if(!user) throw new Error("User not found");
    const profile = await prisma.profile.findUnique({
        where: { userId: user.id }
    });
    if(!profile) throw new Error("Error Fetching the profile");
    const updatedProfile = await prisma.profile.update({
        where: {userId: user.id},
        data: { 
            skills: data.skills ?? profile.skills,
            section: data.section ?? profile.section,
            branch: data.branch ?? profile.branch,
            year: data.year ?? profile.year,
            bio: data.bio ?? profile.bio
        }
    })
    console.log(updatedProfile);
    
    return updatedProfile;
}

export async function getUserById(username: string){
    const userWithProfile = await prisma.user.findFirst({
        where: { name: username },
        include: {
            profile: true,
        }
    });

    if (!userWithProfile || !userWithProfile.profile) {
        console.log("User or Profile not found");
        return null;
    }

    return {
        ...userWithProfile.profile,
        username: userWithProfile.name,
        image: userWithProfile.image
    };
}

export async function filteredUser(req: string){
    if(!req.trim()) return [];
    const users = await prisma.profile.findMany({
        where: {
            user: {   
                name: {
                    contains: req, 
                    mode: 'insensitive'
                }
            }
        },
        select: {
            id: true,
            name: true,
            user: {
                select: {
                    name: true,
                    image: true
                }
            }
        },
        take: 5
        
    })
    return users;
}