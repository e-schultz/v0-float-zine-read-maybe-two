"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, FileText } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"

// Sample markdown content - in a real app, this would come from a database
const markdownContent = `# TECH CRAFT ZINE
## Issue #3: JSON-Driven A11Y as Liberation Praxis
### Spring 2025 • Terminal Necromancy Edition

---

\`\`\`
████████╗███████╗ ██████╗██╗  ██╗     ██████╗██████╗  █████╗ ███████╗████████╗
╚══██╔══╝██╔════╝██╔════╝██║  ██║    ██╔════╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
   ██║   █████╗  ██║     ███████║    ██║     ██████╔╝███████║█████╗     ██║   
   ██║   ██╔══╝  ██║     ██╔══██║    ██║     ██╔══██╗██╔══██║██╔══╝     ██║   
   ██║   ███████╗╚██████╗██║  ██║    ╚██████╗██║  ██║██║  ██║██║        ██║   
   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝        ╚═╝   
\`\`\`

**A zine about accessible computing, terminal liberation, and digital infrastructure as community care**

---

## IN THIS ISSUE:

- **The Politics of JSON Configuration** - Why accessibility settings are user sovereignty
- **Atomic Components for Anti-Oppression** - Building inclusive interfaces by design
- **Terminal Consciousness for Everyone** - Making radical computing accessible
- **shadcn/ui as Mutual Aid** - Design systems that include rather than exclude
- **Clean Architecture as Care Work** - How good code structure serves communities

---

## EDITORIAL: ACCESSIBILITY IS NOT COMPLIANCE

Most tech companies treat accessibility like a checkbox - something to retrofit after the "real" product is built. This approach treats disabled people as an afterthought, a burden to accommodate rather than community members to include from the start.

**JSON-driven a11y flips this script entirely.**

Instead of hardcoded accessibility features that developers think disabled people need, we create configuration systems that let users define their own needs. Want high contrast? Configure it. Need reduced motion? Set it yourself. Prefer larger text? Your choice.

This isn't just good UX - it's **technological sovereignty**. Users get to decide how interfaces work for their bodies, their cognitive styles, their sensory preferences.`

export default function MarkdownReaderPage() {
  const { id } = useParams<{ id: string }>()
  const [currentPage, setCurrentPage] = useState(0)
  const [fontSize, setFontSize] = useState(100)
  const [content, setContent] = useState<string[]>([])

  useEffect(() => {
    // In a real app, this would fetch markdown content from an API
    // Here we're just splitting the sample content into pages
    const pages = markdownContent.split("---").filter((page) => page.trim().length > 0)
    setContent(pages)
  }, [id])

  const nextPage = useCallback(() => {
    if (currentPage < content.length - 1) {
      setCurrentPage((prev) => prev + 1)
    }
  }, [currentPage, content.length])

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

  if (content.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Loading content...</h1>
        <p className="mb-6">Please wait while we load the zine content.</p>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">TECH CRAFT ZINE</h1>
            <p className="text-muted-foreground">Markdown View</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setFontSize((prev) => Math.max(70, prev - 10))}>
              <ZoomOut className="h-4 w-4" />
              <span className="sr-only">Decrease font size</span>
            </Button>

            <div className="w-32">
              <Slider
                value={[fontSize]}
                min={70}
                max={150}
                step={10}
                onValueChange={(value) => setFontSize(value[0])}
                aria-label="Font size"
              />
            </div>

            <Button variant="outline" size="sm" onClick={() => setFontSize((prev) => Math.min(150, prev + 10))}>
              <ZoomIn className="h-4 w-4" />
              <span className="sr-only">Increase font size</span>
            </Button>

            <span className="text-sm ml-2">{fontSize}%</span>
          </div>
        </div>

        <Card className="relative overflow-hidden mb-6">
          <div
            className="min-h-[70vh] overflow-auto p-6 md:p-8"
            style={{
              fontSize: `${fontSize}%`,
            }}
          >
            <ReactMarkdown className="prose dark:prose-invert max-w-none">{content[currentPage]}</ReactMarkdown>
          </div>
        </Card>

        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={prevPage} disabled={currentPage === 0} aria-label="Previous page">
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          <div className="text-sm">
            Page {currentPage + 1} of {content.length}
          </div>

          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === content.length - 1}
            aria-label="Next page"
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 text-center">
          <Button asChild variant="outline">
            <Link href={`/reader/${id}`}>
              <FileText className="mr-2 h-4 w-4" /> Switch to Image View
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
