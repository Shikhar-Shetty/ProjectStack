"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Code, Calendar, Users, BookOpen, FileText, Edit, Save, X } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from 'next/image';
import { editProfile } from "../../../../../actions/profile"

export type ProfileProps = {
  id: string;
  name: string;
  image?: string | null;
  section: string;
  branch: string;
  year: string;
  skills: string[];
  bio?: string | null;
  userId: string;
};

type ProfileEditProps = {
  section?: string;
  branch?: string;
  year?: string;
  skills?: string[];
  bio?: string | null;
};

type FormValues = {
  section: string;
  branch: string;
  year: string;
  bio: string;
  skills: string; 
};

export default function Profile({ profile }: { profile: ProfileProps }) {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState<ProfileProps>(profile);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      section: profile.section,
      branch: profile.branch,
      year: profile.year,
      bio: profile.bio ?? "",
      skills: profile.skills.join(", "),
    },
  });

  const onSubmit = async (data: FormValues) => {
    const updatedFields: ProfileEditProps = {
      section: data.section,
      branch: data.branch,
      year: data.year,
      bio: data.bio,
      skills: data.skills.split(",").map(s => s.trim()).filter(Boolean),
    };
    await editProfile(updatedFields);
    setUpdatedProfile(prev => ({ ...prev, ...updatedFields, skills: updatedFields.skills ?? prev.skills }));
    setIsEditing(false);
    setLoading(false);
  };

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Session:", session?.user);
    }
  }, [session, status]);

  return (
    <div className="min-h-screen py-5 px-6 md:px-12 bg-gray-900 text-white">
      <div className="max-w-7xl flex  rounded-lg mx-auto bg-gray-950/20 px-6 py-3">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-4">
            
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Profile
                </h1>
                <p className="text-gray-400 text-sm mt-1">Manage your personal information</p>
              </div>
            </div>
            <div className="flex gap-3">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-gray-800 cursor-pointer hover:bg-gray-700 border border-gray-700 text-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    className="bg-gradient-to-r from-blue-600 cursor-pointer to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {loading ? (
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      </div>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      reset()
                      setIsEditing(false)
                    }}
                    className="bg-gray-800 cursor-pointer hover:bg-gray-700 border border-gray-700 text-gray-200 transition-all duration-200"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

      <main className="container max-w-7xl flex mx-auto py-8">
        <div className="w-full mx-auto">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src={session?.user?.image || "/pandada.jpeg"}
                    width={90}
                    height={90}
                    alt="Profile"
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">{session?.user?.name || updatedProfile.name}</h2>
                  {isEditing ? (
                    <div className="flex flex-col md:flex-row gap-4">
                      <select {...register("branch")} className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150">
                        <option className="bg-slate-800 text-white" value="">Select Branch</option>
                        <option className="bg-slate-800 text-white" value="CSE">CSE</option>
                        <option className="bg-slate-800 text-white" value="ISE">ISE</option>
                        <option className="bg-slate-800 text-white" value="ICB">ICB</option>
                        <option className="bg-slate-800 text-white" value="AIML">AIML</option>
                      </select>
                      <select {...register("year")} className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150">
                        <option className="bg-slate-800 text-white" value="">Select Year</option>
                        <option className="bg-slate-800 text-white" value="First Year">First Year</option>
                        <option className="bg-slate-800 text-white" value="Second Year">Second Year</option>
                        <option className="bg-slate-800 text-white" value="Third Year">Third Year</option>
                        <option className="bg-slate-800 text-white" value="Fourth Year">Fourth Year</option>
                      </select>
                      <Input {...register("section")} placeholder="Section" className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150" />
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 text-sm text-gray-300">
                      <div className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {updatedProfile.branch}</div>
                      <Separator orientation="vertical" className="h-4 bg-gray-600" />
                      <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {updatedProfile.year}</div>
                      <Separator orientation="vertical" className="h-4 bg-gray-600" />
                      <div className="flex items-center gap-1"><Users className="w-4 h-4" /> {updatedProfile.section}</div>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">About Me</h3>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea {...register("bio")} className="min-h-[120px] bg-gray-800 border-gray-700 focus:outline-none text-white focus:ring-1 focus:ring-blue-500" />
                ) : (
                  <p className="text-gray-300 whitespace-pre-wrap">{updatedProfile.bio || "No bio available."}</p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Skills & Technologies</h3>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Input {...register("skills")} className="bg-gray-800 border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="e.g. JavaScript, React, Node.js" />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {updatedProfile.skills.map((skill, idx) => (
                      <Badge key={idx} className="bg-gray-700 text-gray-200">{skill}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <Card className="bg-gray-900 border-gray-800 mt-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Completed Projects</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Code className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400">No completed projects yet</p>
                <p className="text-sm text-gray-500 mt-1">Showcase your finished projects here</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 mt-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">Pending Projects</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Code className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400">No pending projects</p>
                <p className="text-sm text-gray-500 mt-1">Track your work-in-progress projects here</p>
              </div>
            </CardContent>
          </Card> 
        </div>
      </main>
    </div>
  );
}
