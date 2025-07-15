import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Upload } from "lucide-react"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Zine Reader</h1>
        <p className="text-xl text-muted-foreground mb-8">Upload and read zines in a beautiful, accessible interface</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/library">
              Browse Library <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/upload">
              <Upload className="mr-2 h-4 w-4" /> Upload Zine
            </Link>
          </Button>
        </div>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-3">Read Zines</h2>
            <p className="mb-4">
              Browse through zines with an intuitive interface. Navigate pages, zoom in for details, and enjoy a
              seamless reading experience.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                  1
                </span>
                Page navigation with keyboard shortcuts
              </li>
              <li className="flex items-center">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                  2
                </span>
                Zoom controls for detailed viewing
              </li>
              <li className="flex items-center">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                  3
                </span>
                Responsive design for all devices
              </li>
            </ul>
          </div>

          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-3">Upload Your Zines</h2>
            <p className="mb-4">
              Share your own zines with the community. Upload your content and add metadata to make it discoverable.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                  1
                </span>
                Support for images and markdown
              </li>
              <li className="flex items-center">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                  2
                </span>
                Add title, author, and description
              </li>
              <li className="flex items-center">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                  3
                </span>
                Organize pages in the right order
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
