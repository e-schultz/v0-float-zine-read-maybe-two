import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Zine Reader
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/library" className="text-sm font-medium hover:underline">
            Library
          </Link>
          <Link href="/upload" className="text-sm font-medium hover:underline">
            Upload
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
