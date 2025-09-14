import { Badge } from "@/components/ui/badge"
import { Code, Calendar, Users, BookOpen } from "lucide-react"
import Image from "next/image"
import { getUserById } from "../../../../../actions/profile"

export default async function Profile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const user = await getUserById(username)
  console.log(user)

  if (!user)
    return (
      <div className="min-h-screen font-poppins flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-900 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Users className="w-12 h-12 text-gray-300" />
          </div>
          <h2 className="text-2xl text-gray-200 font-bold mb-2">User Not Found</h2>
          <p className="text-muted-foreground">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-border">
              <Image
                src={user?.image || "/pandada.jpeg"}
                width={128}
                height={128}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2">{user.name}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{user.branch}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{user.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{user.section}</span>
            </div>
          </div>

          <div className="flex justify-center  gap-8 mb-8">
            <div className="text-center">
              <div className="text-xl font-semibold">0</div>
              <div className="text-sm text-gray-400">projects</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold">{user.skills?.length || 0}</div>
              <div className="text-sm text-gray-400">skills</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold">0</div>
              <div className="text-sm text-gray-400">completed</div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">About</h2>
          <p className="text-gray-400 leading-relaxed">{user.bio || "No bio available yet."}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Skills</h2>
          {user.skills?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm bg-gray-950 text-white">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No skills added yet</p>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Completed Projects</h2>
            <div className="border border-dashed border-border rounded-lg p-8 text-center">
              <Code className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">No completed projects yet</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Pending Projects</h2>
            <div className="border border-dashed border-border rounded-lg p-8 text-center">
              <Code className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">No pending projects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
