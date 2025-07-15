"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Plus, Trash2 } from "lucide-react"

export default function UploadPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [pages, setPages] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const handlePageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setPages((prev) => [...prev, ...newFiles])
    }
  }

  const removePage = (index: number) => {
    setPages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // In a real app, this would upload files to a server
    // and save the zine metadata to a database

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
      // Redirect to the library page
      router.push("/library")
    }, 1500)
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upload a Zine</h1>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Zine Details</CardTitle>
              <CardDescription>Provide information about your zine</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter zine title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author/Creator</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author or creator name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your zine"
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Zine Pages</CardTitle>
              <CardDescription>Upload the pages of your zine in order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                {pages.map((page, index) => (
                  <div key={index} className="relative aspect-[3/4] bg-muted rounded-md overflow-hidden group">
                    <img
                      src={URL.createObjectURL(page) || "/placeholder.svg"}
                      alt={`Page ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="destructive" size="icon" onClick={() => removePage(index)} type="button">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-1 right-1 bg-background/80 text-xs px-2 py-1 rounded">
                      Page {index + 1}
                    </div>
                  </div>
                ))}

                <label className="aspect-[3/4] border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Plus className="h-8 w-8 mb-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Add Page</span>
                  <Input type="file" accept="image/*" className="hidden" onChange={handlePageUpload} />
                </label>
              </div>

              <div className="text-sm text-muted-foreground">
                {pages.length === 0 ? (
                  <p>No pages uploaded yet. Add at least one page to continue.</p>
                ) : (
                  <p>
                    {pages.length} page{pages.length !== 1 ? "s" : ""} uploaded.
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                disabled={isUploading || pages.length === 0 || !title || !author}
                className="w-full"
              >
                {isUploading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Upload className="mr-2 h-4 w-4" /> Upload Zine
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </main>
  )
}
