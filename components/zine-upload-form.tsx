"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Plus, Trash2 } from "lucide-react"

interface ZineUploadFormProps {
  onSubmit: (formData: FormData) => Promise<void>
}

export function ZineUploadForm({ onSubmit }: ZineUploadFormProps) {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [format, setFormat] = useState<"image" | "markdown">("image")
  const [pages, setPages] = useState<File[]>([])
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handlePageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setPages((prev) => [...prev, ...newFiles])
    }
  }

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0])
    }
  }

  const removePage = (index: number) => {
    setPages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("author", author)
    formData.append("description", description)
    formData.append("format", format)

    if (coverImage) {
      formData.append("coverImage", coverImage)
    }

    pages.forEach((page, index) => {
      formData.append(`page-${index}`, page)
    })

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Error uploading zine:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your zine"
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="format">Format</Label>
          <Select value={format} onValueChange={(value: "image" | "markdown") => setFormat(value)}>
            <SelectTrigger id="format">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="image">Image-based</SelectItem>
              <SelectItem value="markdown">Markdown</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Image-based zines display as images. Markdown zines are text-based and support formatting.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cover">Cover Image</Label>
          <div className="flex items-center gap-4">
            {coverImage ? (
              <div className="relative w-24 h-32 bg-muted rounded-md overflow-hidden group">
                <img
                  src={URL.createObjectURL(coverImage) || "/placeholder.svg"}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="destructive" size="icon" onClick={() => setCoverImage(null)} type="button">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <label className="w-24 h-32 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                <Plus className="h-6 w-6 mb-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground text-center">Add Cover</span>
                <Input id="cover" type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
              </label>
            )}
            <div className="text-sm">
              <p>Upload a cover image for your zine</p>
              <p className="text-xs text-muted-foreground">Recommended size: 600x800px</p>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <Label className="mb-2 block">Zine Pages</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
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
              <Plus className="h-6 w-6 mb-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Add Page</span>
              <Input
                type="file"
                accept={format === "image" ? "image/*" : ".md,.txt,.markdown"}
                className="hidden"
                onChange={handlePageUpload}
              />
            </label>
          </div>

          <div className="text-sm text-muted-foreground">
            {pages.length === 0 ? (
              <p>No pages uploaded yet. Add at least one page to continue.</p>
            ) : (
              <p>
                {pages.length} page{pages.length !== 1 ? "s" : ""} uploaded. Drag to reorder.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        disabled={isUploading || pages.length === 0 || !title || !author || !coverImage}
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
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
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
    </form>
  )
}
