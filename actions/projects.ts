import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/schema";
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



