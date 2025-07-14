"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

interface PopoverProps {
  children: React.ReactNode
  trigger: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

export const Popover: React.FC<PopoverProps> = ({
  children,
  trigger,
  open,
  onOpenChange,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const popoverRef = React.useRef<HTMLDivElement>(null)

  const isControlled = open !== undefined
  const openState = isControlled ? open : isOpen
  const setOpenState = isControlled ? onOpenChange : setIsOpen

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpenState?.(false)
      }
    }

    if (openState) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openState, setOpenState])



  const handleTriggerClick = () => {
    setOpenState?.(!openState)
  }

  const getPopoverStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      position: 'fixed',
      zIndex: 50,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }

    return style
  }

  return (
    <>
      <div
        ref={triggerRef}
        onClick={handleTriggerClick}
        className="inline-block cursor-pointer"
      >
        {trigger}
      </div>
      {openState && createPortal(
        <>
          {/* Backdrop - Fixed to cover entire viewport */}
          <div 
            className="fixed inset-0 bg-black/50 z-[9999]"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
          />
          
          {/* Popover */}
          <div
            ref={popoverRef}
            style={{
              ...getPopoverStyle(),
              zIndex: 10000, // Higher than backdrop
            }}
            className={cn(
              "min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-slate-950 shadow-2xl animate-in fade-in-0 zoom-in-95",
              className
            )}
          >
            {children}
          </div>
        </>,
        document.body
      )}
    </>
  )
}

export const PopoverContent: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => {
  return (
    <div className={cn("p-4", className)}>
      {children}
    </div>
  )
}

export const PopoverTrigger: React.FC<{
  children: React.ReactNode
  asChild?: boolean
}> = ({ children, asChild = false }) => {
  if (asChild) {
    return <>{children}</>
  }
  return <div>{children}</div>
} 