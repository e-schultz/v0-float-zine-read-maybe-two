import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

// Sample data - in a real app, this would come from a database
const zines = [
  {
    id: "tech-craft-3",
    title: "TECH CRAFT ZINE",
    issue: "Issue #3",
    subtitle: "JSON-Driven A11Y as Liberation Praxis",
    date: "Spring 2025",
    coverImage: "/terminal-art-zine.png",
    pages: 12,
  },
  {
    id: "digital-resistance",
    title: "Digital Resistance",
    issue: "Volume 2",
    subtitle: "Cryptography for Activists",
    date: "Winter 2024",
    coverImage: "/placeholder.svg?height=400&width=300&query=zine%20cover%20with%20digital%20art",
    pages: 8,
  },
  {
    id: "code-poetry",
    title: "Code Poetry",
    issue: "First Edition",
    subtitle: "ASCII Art & Programming Poems",
    date: "Fall 2024",
    coverImage: "/placeholder.svg?height=400&width=300&query=zine%20cover%20with%20code%20poetry",
    pages: 16,
  },
]

export default function LibraryPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Zine Library</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {zines.map((zine) => (
            <Card key={zine.id} className="overflow-hidden flex flex-col">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={zine.coverImage || "/placeholder.svg"}
                  alt={`Cover of ${zine.title}`}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{zine.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{zine.issue}</p>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm">{zine.subtitle}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {zine.date} • {zine.pages} pages
                </p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link href={`/reader/${zine.id}`}>
                    <Eye className="mr-2 h-4 w-4" /> Read Zine
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
