import { Paintbrush } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  icon?: React.ReactNode
  className?: string
  textClassName?: string
  iconClassName?: string
  showText?: boolean
}

export function Logo({ 
  icon, 
  className, 
  textClassName, 
  iconClassName,
  showText = true 
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("flex-shrink-0", iconClassName)}>
        {icon || <Paintbrush className="h-6 w-6" />}
      </div>
      {showText && (
        <span className={cn("text-lg font-semibold", textClassName)}>
          Design Studio
        </span>
      )}
    </div>
  )
}