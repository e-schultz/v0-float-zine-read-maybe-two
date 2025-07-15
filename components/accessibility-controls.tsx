"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Settings } from "lucide-react"

interface AccessibilitySettings {
  fontSize: number
  highContrast: boolean
  reducedMotion: boolean
  keyboardNavigation: boolean
}

export function AccessibilityControls() {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 100,
    highContrast: false,
    reducedMotion: false,
    keyboardNavigation: true,
  })

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("a11y-settings")
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (e) {
        console.error("Failed to parse saved accessibility settings")
      }
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("a11y-settings", JSON.stringify(settings))

    // Apply settings to the document
    document.documentElement.style.fontSize = `${settings.fontSize}%`

    if (settings.highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }

    if (settings.reducedMotion) {
      document.documentElement.classList.add("reduced-motion")
    } else {
      document.documentElement.classList.remove("reduced-motion")
    }
  }, [settings])

  return (
    <Sheet>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Accessibility Settings</span>
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Accessibility Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Accessibility Settings</SheetTitle>
          <SheetDescription>Customize your reading experience</SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="font-size">Font Size: {settings.fontSize}%</Label>
            </div>
            <Slider
              id="font-size"
              min={80}
              max={150}
              step={5}
              value={[settings.fontSize]}
              onValueChange={(value) => setSettings({ ...settings, fontSize: value[0] })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="high-contrast">High Contrast</Label>
            <Switch
              id="high-contrast"
              checked={settings.highContrast}
              onCheckedChange={(checked) => setSettings({ ...settings, highContrast: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="reduced-motion">Reduced Motion</Label>
            <Switch
              id="reduced-motion"
              checked={settings.reducedMotion}
              onCheckedChange={(checked) => setSettings({ ...settings, reducedMotion: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="keyboard-navigation">Keyboard Navigation</Label>
            <Switch
              id="keyboard-navigation"
              checked={settings.keyboardNavigation}
              onCheckedChange={(checked) => setSettings({ ...settings, keyboardNavigation: checked })}
            />
          </div>

          <div className="text-sm text-muted-foreground mt-4">
            <p>Keyboard shortcuts:</p>
            <ul className="mt-2 space-y-1">
              <li>← Previous page</li>
              <li>→ Next page</li>
              <li>+ Zoom in</li>
              <li>- Zoom out</li>
              <li>0 Reset zoom</li>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
