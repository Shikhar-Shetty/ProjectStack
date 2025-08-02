"use client"

import type React from "react"
import { useState, useMemo, useTransition } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { filteredUser } from "../../../../../actions/profile"
import {
  X,
  Search,
  User,
  Calendar,
  Clock,
  Users,
  Github,
  ExternalLink,
  CheckCircle2,
  Loader2,
  Activity,
} from "lucide-react"

type UserResult = {
  id: string
  user: {
    image: string | null
    name: string
  }
}

const data = [
  {
    title: "AI Resume Enhancer",
    description:
      "An AI-powered platform that analyzes resumes and provides improvement suggestions using GPT. Advanced features include real-time feedback, industry-specific templates, and ATS optimization.",
    skills: ["TypeScript", "Next.js", "PostgreSQL", "OpenAI API"],
    username: "Sunpreeth",
    startDate: "May 2025",
    endDate: "July 2025",
    workingHours: "10-12 hours/week",
    postedOn: "2024-12-15",
    isActive: true,
    projectStatus: "Open",
    githubLink: "https://github.com/sunpreeth/ai-resume-enhancer",
    noofapplicants: 12,
  },
  {
    title: "Team Collaboration Suite",
    description:
      "A real-time communication and file-sharing tool tailored for remote teams. Features include video calls, screen sharing, project management, and integrated chat.",
    skills: ["React", "Node.js", "Socket.IO", "Redis"],
    username: "Shreyas BS",
    startDate: "June 2025",
    endDate: "August 2025",
    workingHours: "15-18 hours/week",
    postedOn: "2024-12-10",
    isActive: true,
    projectStatus: "In Progress",
    githubLink: "https://github.com/shreyasbs/team-collab",
    noofapplicants: 8,
  },
  {
    title: "E-Commerce Dashboard",
    description:
      "An admin panel for tracking orders, inventory, and customer analytics. Includes real-time reporting, automated alerts, and comprehensive business intelligence.",
    skills: ["Vue.js", "Express", "MongoDB", "Tailwind CSS"],
    username: "Prathvish",
    startDate: "April 2025",
    endDate: "June 2025",
    workingHours: "8-10 hours/week",
    postedOn: "2024-12-08",
    isActive: false,
    projectStatus: "Completed",
    githubLink: "https://github.com/prathvish/ecommerce-dashboard",
    noofapplicants: 15,
  },
  {
    title: "Health & Wellness Tracker",
    description:
      "A progressive web app to track nutrition, workouts, and wellness goals. Features personalized recommendations, social challenges, and health insights.",
    skills: ["Svelte", "Firebase", "TypeScript", "Chart.js"],
    username: "Shravan",
    startDate: "March 2025",
    endDate: "May 2025",
    workingHours: "12-15 hours/week",
    postedOn: "2024-12-05",
    isActive: true,
    projectStatus: "Open",
    githubLink: "https://github.com/shravan/health-tracker",
    noofapplicants: 6,
  },
  {
    title: "DevOps Bootcamp Portal",
    description:
      "A learning platform with CI/CD labs, live sandboxing, and Docker + Kubernetes challenges. Includes automated grading and progress tracking.",
    skills: ["Next.js", "Docker", "Kubernetes", "Prisma"],
    username: "Vaishnav",
    startDate: "July 2025",
    endDate: "September 2025",
    workingHours: "10-14 hours/week",
    postedOn: "2024-12-12",
    isActive: true,
    projectStatus: "Open",
    githubLink: "https://github.com/vaishnav/devops-bootcamp",
    noofapplicants: 20,
  },
]

function Dashboard() {
  const [popup, setPopup] = useState<null | (typeof data)[0]>(null)
  const [filtered, setFiltered] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState<null | string>(null)
  const [searchFilter, setSearchFilter] = useState("projects")

  const [users, setUsers] = useState<UserResult[]>([])
  const [isPending, startTransition] = useTransition()

  const filteredArray = useMemo(() => {
    return data.filter((item) => {
      if (!filtered) return true
      const normalize = (str: string) => str.toLowerCase().replace(/[\s.,!?-]/g, "")
      const normalizedFilter = normalize(filtered)

      switch (searchFilter) {
        case "users":
          return normalize(item.username).includes(normalizedFilter)
        case "projects":
        default:
          const allTitleMatch = normalize(item.title).includes(normalizedFilter)
          const allSkillMatch = item.skills.some((skill: string) => normalize(skill).includes(normalizedFilter))
          const allUserMatch = normalize(item.username).includes(normalizedFilter)
          return allTitleMatch || allSkillMatch || allUserMatch
      }
    })
  }, [filtered, searchFilter])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFiltered(value)

    if (searchFilter === "users") {
      startTransition(async () => {
        const result = await filteredUser(value)
        setUsers(
          result.map((user) => ({
            ...user,
            user: {
              name: user.user.name ?? "",
              image: user.user.image,
            },
          })),
        )
      })
    }
  }

  const handleApply = () => {
    setLoading(true)
    setDone(null)
    setTimeout(() => {
      setDone(popup?.title ?? "")
      setLoading(false)
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      case "In Progress":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "Completed":
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getPlaceholder = () => {
    switch (searchFilter) {
      case "projects":
        return "Search projects, skills..."
      case "users":
        return "Search GitHub usernames..."
      default:
        return "Search projects, skills, or users..."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              {searchFilter == "projects" ?
                (
                  <h1 className="text-lg md:text-2xl font-bold text-white">Project Dashboard</h1>

                ) :
                (
                  <h1 className="text-lg md:text-2xl font-bold text-white">User Dashboard</h1>

                )}
              <p className="text-slate-400 text-sm mt-1">Discover and collaborate on exciting projects</p>
            </div>

            <div className="flex items-center gap-3 w-full max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder={getPlaceholder()}
                  value={filtered}
                  onChange={handleInput}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-slate-600"
                />
              </div>

              <Select value={searchFilter} onValueChange={setSearchFilter}>
                <SelectTrigger className="w-32 bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="projects" className="text-white hover:bg-slate-700">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Projects
                    </div>
                  </SelectItem>
                  <SelectItem value="users" className="text-white hover:bg-slate-700">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Users
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {isPending && searchFilter === "users" && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-slate-400">Searching users...</p>
        </div>
      )}

      {filtered && (
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>
              Found {searchFilter === "users" ? users.length : filteredArray.length} result
              {(searchFilter === "users" ? users.length : filteredArray.length) !== 1 ? "s" : ""}
              {searchFilter !== "projects" && ` in ${searchFilter}`} for &quot;{filtered}&quot;
            </span>
            {searchFilter !== "projects" && (
              <Badge className="bg-slate-800/50 text-slate-300 border-slate-700/50 text-xs">{searchFilter} only</Badge>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {searchFilter === "users" && !isPending && users.length > 0 && (
          <div className="grid gap-4 mb-8">
            <div className="grid gap-3">
              {users.map((user) => (
                <Link key={user.id} href={`/profile/${user.user.name}`}>
                  <Card className="group border-gray-800 bg-gray-900 backdrop-blur-sm hover:bg-slate-900/50 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/20">
                    <CardContent className=" px-7">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Image
                            src={user.user.image ?? "/default-avatar.png"}
                            alt={user.user.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-slate-700"
                            height={48}
                            width={48}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-white group-hover:text-slate-100 transition-colors">
                            @{user.user.name}
                          </h3>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-300 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}

            </div>
          </div>
        )}

        {searchFilter === "users" && users.length <= 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 mb-4 rounded-full bg-slate-700/30 flex items-center justify-center">
              <Search className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-slate-300 text-lg font-medium mb-2">No users found</h3>
            <p className="text-slate-400 text-sm text-center max-w-sm">
              Start typing to search for users by name, skills, or expertise
            </p>
          </div>
        )}

        {searchFilter === "projects" && (
          <div className="grid gap-6">
            {filteredArray.map((item, index) => (
              <Card
                key={index}
                className="group border-slate-800 bg-gray-900 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/20"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-xl font-semibold text-white group-hover:text-slate-100 transition-colors">
                              {item.title}
                            </h2>
                            <Badge className={`text-xs ${getStatusColor(item.projectStatus)}`}>
                              {item.projectStatus}
                            </Badge>
                            {!item.isActive && (
                              <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-xs">Inactive</Badge>
                            )}
                          </div>
                          <p className="text-slate-300 leading-relaxed mb-4 line-clamp-2">{item.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.skills.map((skill, idx) => (
                          <Badge
                            key={idx}
                            className="bg-slate-800/50 text-slate-300 border-slate-700/50 hover:bg-slate-700/50 transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Calendar className="w-4 h-4" />
                          <span>Posted {formatDate(item.postedOn)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock className="w-4 h-4" />
                          <span>{item.workingHours}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Users className="w-4 h-4" />
                          <span>{item.noofapplicants} applicants</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Github className="w-4 h-4" />
                          <a href={item.githubLink} className="hover:text-slate-300 transition-colors">
                            Repository
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-64 border-t lg:border-t-0 lg:border-l border-slate-800/50 p-6 bg-slate-900/20">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <Avatar className="w-16 h-16 border-2 border-slate-700">
                          <AvatarFallback className="bg-slate-800 text-slate-300 text-lg font-medium">
                            {item.username
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="font-medium text-white mb-1">{item.username}</h3>
                          <p className="text-sm text-slate-400">Project Owner</p>
                        </div>

                        <Separator className="bg-slate-800/50" />

                        <div className="w-full space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Duration:</span>
                            <span className="text-slate-300">
                              {item.startDate} - {item.endDate}
                            </span>
                          </div>
                        </div>

                        <Button
                          onClick={() => setPopup(item)}
                          className="w-full bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
                        >
                          View Details
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gray-900  rounded-xl border border-slate-700/50 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gray-900 border-b border-slate-800/50 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white">{popup.title}</h2>
                    <Badge className={`${getStatusColor(popup.projectStatus)}`}>{popup.projectStatus}</Badge>
                    {!popup.isActive && (
                      <Badge className="bg-red-500/10 text-red-400 border-red-500/20">Inactive</Badge>
                    )}
                  </div>
                  <p className="text-slate-400">Posted on {formatDate(popup.postedOn)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPopup(null)}
                  className="text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Project Description</h3>
                    <p className="text-slate-300 leading-relaxed">{popup.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {popup.skills.map((skill, idx) => (
                        <Badge key={idx} className="bg-slate-800/50 text-slate-300 border-slate-700/50">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Timeline</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-400">Start:</span>
                          <span className="text-slate-300">{popup.startDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-400">End:</span>
                          <span className="text-slate-300">{popup.endDate}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Commitment</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300">{popup.workingHours}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Project Links</h3>
                    <a
                      href={popup.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      View Repository
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className="border-slate-800/50 bg-slate-800/30">
                    <CardHeader className="pb-4">
                      <h3 className="font-semibold text-white">Project Owner</h3>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <Avatar className="w-16 h-16 border-2 border-slate-700">
                          <AvatarFallback className="bg-slate-700 text-slate-300 text-lg font-medium">
                            {popup.username
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-white">{popup.username}</h4>
                          <p className="text-sm text-slate-400">Project Lead</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-800/50 bg-slate-800/30">
                    <CardHeader className="pb-4">
                      <h3 className="font-semibold text-white">Project Stats</h3>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-400">Applicants</span>
                        </div>
                        <span className="text-slate-300 font-medium">{popup.noofapplicants}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-400">Status</span>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(popup.projectStatus)}`}>
                          {popup.projectStatus}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    onClick={handleApply}
                    disabled={loading || done === popup.title}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Applying...
                      </>
                    ) : done === popup.title ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Applied Successfully
                      </>
                    ) : (
                      "Apply to Project"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
