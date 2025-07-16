
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Code, Calendar, Users, BookOpen, FileText } from "lucide-react"
import Image from 'next/image';
import { getUserById } from "../../../../../actions/profile"
import  Link  from 'next/link';

export default async function Profile({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    const user = await getUserById(username);
    console.log(user);
    
    if(!user) return <div className="text-center w-full h-full flex justify-center items-center text-gray-500 font-bold text-2xl">User Not Found</div>

    return (
        <div className="min-h-screen px-6 md:px-12 bg-gray-900 text-white">
            <header className="bg-gray-900/50 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center mt-3 justify-between">
                        <div className="flex text-2xl font-bold items-center gap-3">
                            Profile
                        </div>
                        <Link href="/profile">
                            <div className="flex underline underline-offset-4 text-sm gap-2">
                                Back to Profile -&gt;
                            </div>
                        </Link>
                        
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader className="pb-4">
                            <div className="flex items-start gap-6">
                                <div className="w-24 h-24 rounded-full overflow-hidden">
                                    <Image
                                        src={user?.image || "/pandada.jpeg"}
                                        width={90}
                                        height={90}
                                        alt="Profile"
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
                                    <div className="flex flex-wrap gap-2 text-sm text-gray-300">
                                        <div className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {user.branch}</div>
                                        <Separator orientation="vertical" className="h-4 bg-gray-600" />
                                        <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {user.year}</div>
                                        <Separator orientation="vertical" className="h-4 bg-gray-600" />
                                        <div className="flex items-center gap-1"><Users className="w-4 h-4" /> {user.section}</div>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    <div className="grid gap-6 md:grid-cols-2 mt-6">
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-blue-400" />
                                    <h3 className="text-lg font-semibold text-white">About Me</h3>
                                </div>
                            </CardHeader>
                            <CardContent>

                                <p className="text-gray-300 whitespace-pre-wrap">{user.bio || "No bio available."}</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Code className="w-5 h-5 text-green-400" />
                                    <h3 className="text-lg font-semibold text-white">Skills & Technologies</h3>
                                </div>
                            </CardHeader>
                            <CardContent>

                                <div className="flex flex-wrap gap-2">
                                    {user.skills.map((skill, idx) => (
                                        <Badge key={idx} className="bg-gray-700 text-gray-200">{skill}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <Card className="bg-gray-800 border-gray-700 mt-6">
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

                    <Card className="bg-gray-800 border-gray-700 mt-6">
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
