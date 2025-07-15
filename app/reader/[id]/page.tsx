"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Home } from "lucide-react"
import Link from "next/link"

// Sample data - in a real app, this would come from a database
const zineData = {
  "tech-craft-3": {
    title: "TECH CRAFT ZINE",
    issue: "Issue #3: JSON-Driven A11Y as Liberation Praxis",
    date: "Spring 2025",
    pages: [
      "/placeholder.svg?height=800&width=600&query=zine%20page%201%20with%20title%20and%20ASCII%20art",
      "/placeholder.svg?height=800&width=600&query=zine%20page%202%20with%20text%20about%20accessibility",
      "/placeholder.svg?height=800&width=600&query=zine%20page%203%20with%20code%20examples",
      "/placeholder.svg?height=800&width=600&query=zine%20page%204%20with%20terminal%20interface%20design",
      "/placeholder.svg?height=800&width=600&query=zine%20page%205%20with%20diagrams",
    ],
  },
  "digital-resistance": {
    title: "Digital Resistance",
    issue: "Volume 2: Cryptography for Activists",
    date: "Winter 2024",
    pages: [
      "/placeholder.svg?height=800&width=600&query=zine%20page%201%20about%20cryptography",
      "/placeholder.svg?height=800&width=600&query=zine%20page%202%20with%20encryption%20examples",
      "/placeholder.svg?height=800&width=600&query=zine%20page%203%20with%20security%20tips",
    ],
  },
  "code-poetry": {
    title: "Code Poetry",
    issue: "First Edition: ASCII Art & Programming Poems",
    date: "Fall 2024",
    pages: [
      "/placeholder.svg?height=800&width=600&query=zine%20page%201%20with%20code%20poetry",
      "/placeholder.svg?height=800&width=600&query=zine%20page%202%20with%20ASCII%20art",
      "/placeholder.svg?height=800&width=600&query=zine%20page%203%20with%20programming%20poems",
    ],
  },
}

export default function ReaderPage() {
  const { id } = useParams<{ id: string }>()
  const [currentPage, setCurrentPage] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [zine, setZine] = useState<any>(null)

  useEffect(() => {
    // In a real app, this would fetch data from an API
    if (id && typeof id === "string" && zineData[id as keyof typeof zineData]) {
      setZine(zineData[id as keyof typeof zineData])
    }
  }, [id])

  const nextPage = useCallback(() => {
    if (zine && currentPage < zine.pages.length - 1) {
      setCurrentPage((prev) => prev + 1)
    }
  }, [currentPage, zine])

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }, [currentPage])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextPage()
      } else if (e.key === "ArrowLeft") {
        prevPage()
      }
    },
    [nextPage, prevPage],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  if (!zine) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Zine not found</h1>
        <p className="mb-6">The zine you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/library">
            <Home className="mr-2 h-4 w-4" /> Return to Library
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">{zine.title}</h1>
            <p className="text-muted-foreground">{zine.issue}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setZoomLevel((prev) => Math.max(50, prev - 10))}>
              <ZoomOut className="h-4 w-4" />
              <span className="sr-only">Zoom out</span>
            </Button>

            <div className="w-32">
              <Slider
                value={[zoomLevel]}
                min={50}
                max={200}
                step={10}
                onValueChange={(value) => setZoomLevel(value[0])}
                aria-label="Zoom level"
              />
            </div>

            <Button variant="outline" size="sm" onClick={() => setZoomLevel((prev) => Math.min(200, prev + 10))}>
              <ZoomIn className="h-4 w-4" />
              <span className="sr-only">Zoom in</span>
            </Button>

            <span className="text-sm ml-2">{zoomLevel}%</span>
          </div>
        </div>

        <Card className="relative overflow-hidden bg-muted/30 mb-6">
          <div
            className="flex justify-center items-center min-h-[70vh] overflow-auto p-4"
            style={{
              cursor: zoomLevel > 100 ? "move" : "default",
            }}
          >
            <div
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: "center",
                transition: "transform 0.2s ease-out",
              }}
            >
              <img
                src={zine.pages[currentPage] || "/placeholder.svg"}
                alt={`Page ${currentPage + 1} of ${zine.title}`}
                className="max-w-full h-auto shadow-lg"
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={prevPage} disabled={currentPage === 0} aria-label="Previous page">
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          <div className="text-sm">
            Page {currentPage + 1} of {zine.pages.length}
          </div>

          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === zine.pages.length - 1}
            aria-label="Next page"
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  )
}
