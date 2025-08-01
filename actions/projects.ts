import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/schema";
import { strict } from "assert";
import { getServerSession } from "next-auth";

interface ProjectInput {
    title: string;
    description: string;
    requiredSkills: string[];
    startDate: Date;
    endDate: Date;
    githubLink?: string;
    projectStatus: string;
    isActive: boolean;
}

interface ProjectUpdate {
    id?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    githubLink?: string;
    projectStatus?: string;
    isActive?: boolean;
}
export async function addProject(formData: ProjectInput) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) throw new Error("User is Unauthorized");

        const parsedData = projectSchema.parse(formData);

        if (parsedData.endDate < parsedData.startDate) {
            throw new Error("End Date cannot be before the start Date");
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        })
        if (!user) throw new Error("User not found");
        const profile = await prisma.profile.findUnique({
            where: { userId: user?.id }
        });

        if (!profile) throw new Error("Profile not found");
        const existing = await prisma.project.findFirst({
            where: {
                title: parsedData.title,
                userId: profile.id
            }
        });

        if (existing) throw new Error("Project already exists");
        const newProject = await prisma.project.create({
            data: {
                ...parsedData,
                userId: profile.id
            }
        })
        return newProject;
    } catch (error) {
        console.error("Error creating new Project", error);
        throw new Error("Error Creating a New Project");
    }
}

export async function editProject(details: ProjectUpdate) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user.email) throw new Error("Unauthorized Access");
        
        if (details.startDate && details.endDate && details.endDate < details.startDate) {
        throw new Error("End date cannot be before start date");
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })
        if (!user) throw new Error("User not found");
        const profile = await prisma.profile.findUnique({
            where: { userId: user.id }
        });
        if (!profile) throw new Error("Error Fetching the profile");

        const project = await prisma.project.findUnique({
            where: { id: details.id }
        });

        if (!project || project.userId !== profile.id) {
            throw new Error("Project not found or unauthorized");
        }

        const updatedProjectDet = await prisma.project.update({
            where: { id: details.id },
            data: {
                description: details.description ?? project.description,
                startDate: details.startDate ?? project.startDate,
                endDate: details.endDate ?? project.endDate,
                githubLink: details.githubLink ?? project.githubLink,
                projectStatus: details.projectStatus ?? project.projectStatus,
                isActive: details.isActive ?? project.isActive
            }
        });
        return updatedProjectDet;
    } catch (error) {
        console.error("Error while editing the project details", error);
        throw new Error("Error while editing project Details");
    }
}

