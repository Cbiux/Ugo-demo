"use client"

import type { ReactNode } from "react"

interface MobileFrameProps {
  children: ReactNode
}

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="relative">
        {/* Phone Frame - UGO Colors */}
        <div 
          className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-800 rounded-[3rem] p-3 shadow-2xl border-2"
          style={{ 
            width: '380px', 
            height: '780px',
            borderColor: '#2C3E50'
          }}
        >
          {/* Screen Bezel with accent */}
          <div 
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] p-2 h-full relative overflow-hidden border"
            style={{ borderColor: '#42A5F5' + '30' }}
          >
            {/* Notch - UGO Styled */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-slate-950 rounded-b-xl w-32 h-6 z-20 shadow-lg border-x border-b border-slate-700">
              {/* Camera with UGO accent */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-slate-800 rounded-full w-3 h-3 border border-blue-500/40 shadow-inner"></div>
            </div>
            
            {/* Screen */}
            <div 
              className="bg-white rounded-[2rem] h-full overflow-hidden relative"
              style={{ maxWidth: '350px', maxHeight: '750px' }}
            >
              {/* Content */}
              <div className="h-full overflow-hidden">
                {children}
              </div>
            </div>
          </div>
          
          {/* Home Indicator - UGO Blue accent */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-400/80 rounded-full w-32 h-1 shadow-sm"></div>
        </div>
        
        {/* Phone Shadow with UGO accent */}
        <div 
          className="absolute inset-0 bg-slate-900 rounded-[3rem] opacity-25 blur-xl transform translate-y-8 -z-10"
          style={{ width: '380px', height: '780px' }}
        ></div>
        {/* Secondary shadow with blue tint */}
        <div 
          className="absolute inset-0 bg-blue-500 rounded-[3rem] opacity-5 blur-2xl transform translate-y-12 -z-20"
          style={{ width: '380px', height: '780px' }}
        ></div>
      </div>
    </div>
  )
}