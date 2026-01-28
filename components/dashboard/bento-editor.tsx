"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import {
  Plus,
  Link2,
  Type,
  ImageIcon,
  Video,
  Music,
  MapPin,
  GripVertical,
  Trash2,
  Edit3,
  Instagram,
  Twitter,
  Youtube,
  Github,
  Facebook,
  Linkedin,
  HardDrive,
  Disc,
  Music2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBlocks, type BentoBlock } from "@/lib/blocks-context"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { detectPlatform } from "@/lib/platform-detector"


import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  TouchSensor,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const blockTools = [
  { type: "link", icon: Link2, label: "Link", color: "text-bento-blue" },
  { type: "text", icon: Type, label: "Text", color: "text-bento-green" },
  { type: "image", icon: ImageIcon, label: "Image", color: "text-bento-pink" },
  { type: "video", icon: Video, label: "Video", color: "text-red-500" },
  { type: "music", icon: Music, label: "Music", color: "text-bento-orange" },
  { type: "map", icon: MapPin, label: "Map", color: "text-bento-yellow" },
]

const socialIcons: Record<string, any> = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  github: Github,
  facebook: Facebook,
  linkedin: Linkedin,
  drive: HardDrive,
  spotify: Disc,
  tiktok: Music2,
}

const colorPresets = [
  { name: "Default", value: "bg-card" },
  { name: "Blue", value: "bg-bento-blue/20" },
  { name: "Green", value: "bg-bento-green/20" },
  { name: "Pink", value: "bg-bento-pink/20" },
  { name: "Orange", value: "bg-bento-orange/20" },
  { name: "Yellow", value: "bg-bento-yellow/20" },
  { name: "Dark", value: "bg-gray-800" },
  { name: "Instagram", value: "bg-gradient-to-br from-pink-500 to-orange-500" },
  { name: "Sky", value: "bg-sky-500" },
]

interface SortableBlockProps {
  block: BentoBlock
  isSelected: boolean
  isHovered: boolean
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  onDelete: (id: string) => void
  getBlockSize: (size: string) => string
}

function SortableBlock({
  block,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  onDelete,
  getBlockSize
}: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const SocialIcon = block.social ? socialIcons[block.social] : null

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative rounded-4xl p-5 cursor-pointer transition-all duration-500",
        getBlockSize(block.size),
        block.color || "bg-card",
        isSelected ? "ring-2 ring-bento-green ring-offset-4 ring-offset-background shadow-xl scale-[0.98]" : "hover:shadow-lg hover:scale-[1.02]",
        isDragging ? "opacity-50 z-50 shadow-2xl scale-95" : "opacity-100"
      )}
      onClick={() => onSelect(block.id)}
      onMouseEnter={() => onHover(block.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Actions Overlay */}
      <div
        className={cn(
          "absolute top-3 right-3 flex items-center gap-1.5 transition-all duration-300 z-10",
          isHovered || isSelected ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        )}
      >
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="p-2 rounded-xl bg-background/80 backdrop-blur-md text-muted-foreground hover:text-foreground shadow-sm transition-all cursor-grab active:cursor-grabbing"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
            onDelete(block.id)
          }}
          className="p-2 rounded-xl bg-background/80 backdrop-blur-md text-muted-foreground hover:text-destructive shadow-sm transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Block Content */}
      <div className="h-full flex flex-col justify-between relative z-0">
        {block.type === "social" && SocialIcon ? (
          <div className="flex items-center justify-center h-full">
            <SocialIcon className="w-10 h-10 text-white drop-shadow-md" />
          </div>
        ) : (
          <>
            <div>
              {block.title && (
                <h3 className="font-bold text-foreground text-sm mb-1.5 tracking-tight">
                  {block.title}
                </h3>
              )}
              {block.content && (
                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3 font-medium opacity-80">
                  {block.content}
                </p>
              )}
            </div>
            <div className="mt-auto text-foreground/60 group-hover:text-foreground transition-colors">
              {block.type === "music" && !SocialIcon && (
                <div className="flex items-center gap-2.5 bg-background/40 backdrop-blur-sm w-fit px-2.5 py-1 rounded-full border border-white/5">
                  <div className="w-1.5 h-1.5 bg-bento-green rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  <span className="text-[10px] font-bold text-foreground">LIVE</span>
                </div>
              )}
              {block.type === "music" && SocialIcon && (
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/10">
                  <SocialIcon className="w-4 h-4 text-white" />
                </div>
              )}
              {block.type === "map" && (
                <div className="w-8 h-8 rounded-full bg-bento-orange/20 flex items-center justify-center border border-bento-orange/10">
                  <MapPin className="w-4 h-4 text-bento-orange" />
                </div>
              )}
              {block.type === "link" && (
                <div className="w-8 h-8 rounded-full bg-bento-blue/20 flex items-center justify-center border border-bento-blue/10">
                  <Link2 className="w-4 h-4 text-bento-blue" />
                </div>
              )}
              {block.type === "image" && (
                <div className="w-8 h-8 rounded-full bg-bento-pink/20 flex items-center justify-center border border-bento-pink/10">
                  <ImageIcon className="w-4 h-4 text-bento-pink" />
                </div>
              )}
              {block.type === "social" && block.social === "drive" && SocialIcon && (
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/10">
                  <SocialIcon className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function BentoEditor() {
  const { user } = useAuth()
  const { blocks, addBlock, updateBlock, deleteBlock, setBlocks } = useBlocks()
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id)
      const newIndex = blocks.findIndex((b) => b.id === over?.id)
      setBlocks(arrayMove(blocks, oldIndex, newIndex))
    }
  }

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId)

  const handleUrlChange = (url: string) => {
    if (!selectedBlock) return

    const platform = detectPlatform(url)
    if (platform) {
      updateBlock(selectedBlock.id, {
        url,
        type: platform.type,
        social: platform.social,
        title: selectedBlock.title === `New ${selectedBlock.type}` ? platform.title : selectedBlock.title,
        color: selectedBlock.color === "bg-card" ? platform.color : selectedBlock.color,
      })
    } else {
      updateBlock(selectedBlock.id, { url })
    }
  }

  const getBlockSize = (size: string) => {
    switch (size) {
      case "small":
        return "col-span-1 row-span-1"
      case "large":
        return "col-span-2 row-span-2"
      default:
        return "col-span-2 row-span-1"
    }
  }

  return (
    <div className="flex flex-col xl:flex-row gap-6 h-full items-start">
      {/* Left Sidebar - Block Tools */}
      <div className="hidden lg:flex flex-col gap-2 p-4 bg-card rounded-2xl border border-border w-64 shrink-0 sticky top-4">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 px-2">
          Add Elements
        </p>
        <div className="grid grid-cols-1 gap-1">
          {blockTools.map((tool) => (
            <button
              key={tool.type}
              type="button"
              onClick={() => addBlock(tool.type as BentoBlock["type"])}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary/80 transition-all duration-200 group text-left"
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center bg-secondary transition-all group-hover:bg-background group-hover:shadow-sm",
                  tool.color
                )}
              >
                <tool.icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {tool.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Center - Main Editor Area */}
      <div className="flex-1 w-full max-w-4xl mx-auto">
        {/* Profile Preview Section */}
        <div className="mb-12 text-center group">
          {/* ... user preview ... */}
          <div className="relative inline-block mb-6">
            <div className="w-28 h-28 rounded-full bg-linear-to-br from-bento-green to-bento-blue flex items-center justify-center text-background text-4xl font-black shadow-xl ring-4 ring-background">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-bento-green hover:border-bento-green hover:shadow-lg transition-all duration-300"
            >
              <Edit3 className="w-5 h-5" />
            </button>
          </div>
          <h1 className="text-3xl font-black text-foreground mb-2">{user?.name || "Your Name"}</h1>
          <p className="text-muted-foreground font-medium">@{user?.username || "username"}</p>
          <div className="mt-4 max-w-md mx-auto relative group">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {user?.bio || "Add a bio to tell people about yourself"}
            </p>
          </div>
        </div>

        {/* Bento Grid with DND */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={blocks.map((b) => b.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[130px]">
              {blocks.map((block) => (
                <SortableBlock
                  key={block.id}
                  block={block}
                  isSelected={selectedBlockId === block.id}
                  isHovered={hoveredBlockId === block.id}
                  onSelect={setSelectedBlockId}
                  onHover={setHoveredBlockId}
                  onDelete={(id) => {
                    deleteBlock(id)
                    if (selectedBlockId === id) setSelectedBlockId(null)
                  }}
                  getBlockSize={getBlockSize}
                />
              ))}

              {/* Add Block Button (Grid item) */}
              <button
                type="button"
                onClick={() => addBlock("link")}
                className="col-span-1 row-span-1 rounded-4xl border-2 border-dashed border-border hover:border-bento-green/40 flex items-center justify-center transition-all duration-500 hover:bg-bento-green/5 group relative overflow-hidden"
              >
                <div className="flex flex-col items-center gap-3 text-muted-foreground group-hover:text-bento-green transition-all duration-300 group-hover:scale-110">
                  <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-bento-green/10 transition-colors">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Add New</span>
                </div>
              </button>
            </div>
          </SortableContext>
        </DndContext>
      </div>


      {/* Right Sidebar - Property Panel */}
      <div className={cn(
        "fixed xl:sticky xl:top-4 right-4 bottom-4 left-4 xl:left-auto xl:bottom-auto xl:w-80 bg-card rounded-[2.5rem] border border-border shadow-2xl xl:shadow-none transition-all duration-500 transform z-50 overflow-hidden",
        selectedBlockId ? "translate-y-0 opacity-100" : "translate-y-10 xl:translate-y-0 opacity-0 xl:opacity-100 pointer-events-none xl:pointer-events-auto"
      )}>
        {selectedBlock ? (
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black tracking-tight">Properties</h2>
              <button
                onClick={() => setSelectedBlockId(null)}
                className="xl:hidden p-2 hover:bg-secondary rounded-full"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-2.5">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">URL</Label>
                <Input
                  value={selectedBlock.url || ""}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://..."
                  className="rounded-2xl bg-secondary/50 border-none focus-visible:ring-2 focus-visible:ring-bento-green h-12 px-4 font-medium"
                />
              </div>

              <div className="space-y-2.5">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Block Title</Label>
                <Input
                  value={selectedBlock.title}
                  onChange={(e) => updateBlock(selectedBlock.id, { title: e.target.value })}
                  placeholder="Enter title..."
                  className="rounded-2xl bg-secondary/50 border-none focus-visible:ring-2 focus-visible:ring-bento-green h-12 px-4 font-medium"
                />
              </div>

              {(selectedBlock.type === "text" || selectedBlock.type === "music" || selectedBlock.type === "map") && (
                <div className="space-y-2.5">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Content / Description</Label>
                  <Textarea
                    value={selectedBlock.content || ""}
                    onChange={(e) => updateBlock(selectedBlock.id, { content: e.target.value })}
                    placeholder="Enter description..."
                    className="rounded-2xl bg-secondary/50 border-none focus-visible:ring-2 focus-visible:ring-bento-green min-h-[100px] p-4 font-medium leading-relaxed"
                  />
                </div>
              )}


              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Size</Label>
                  <Select
                    value={selectedBlock.size}
                    onValueChange={(val: any) => updateBlock(selectedBlock.id, { size: val })}
                  >
                    <SelectTrigger className="rounded-2xl bg-secondary/50 border-none h-12 px-4 font-medium">
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-border bg-card">
                      <SelectItem value="small">Small (1x1)</SelectItem>
                      <SelectItem value="medium">Medium (2x1)</SelectItem>
                      <SelectItem value="large">Large (2x2)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2.5">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Style</Label>
                  <Select
                    value={selectedBlock.color || "bg-card"}
                    onValueChange={(val: any) => updateBlock(selectedBlock.id, { color: val })}
                  >
                    <SelectTrigger className="rounded-2xl bg-secondary/50 border-none h-12 px-4 font-medium">
                      <SelectValue placeholder="Color" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-border bg-card">
                      {colorPresets.map((preset) => (
                        <SelectItem key={preset.value} value={preset.value}>
                          <div className="flex items-center gap-2">
                            <div className={cn("w-3 h-3 rounded-full border border-border/10", preset.value)} />
                            {preset.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedBlock.type === "social" && (
                <div className="space-y-2.5">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Platform</Label>
                  <Select
                    value={selectedBlock.social || ""}
                    onValueChange={(val: any) => updateBlock(selectedBlock.id, { social: val })}
                  >
                    <SelectTrigger className="rounded-2xl bg-secondary/50 border-none h-12 px-4 font-medium">
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-border bg-card">
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="github">GitHub</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="pt-6 mt-auto">
              <Button
                variant="destructive"
                className="w-full rounded-2xl h-12 font-bold uppercase tracking-widest text-[10px]"
                onClick={() => {
                  deleteBlock(selectedBlock.id)
                  setSelectedBlockId(null)
                }}
              >
                Delete Block
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-12 h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-[2rem] bg-secondary flex items-center justify-center mb-6 text-muted-foreground/30">
              <Edit3 className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-foreground mb-2">Editor Ready</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Select any block in the grid to customize its content and appearance.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

