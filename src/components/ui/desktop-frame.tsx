"use client"

import type { ReactNode } from "react"
import { Chrome, Minimize2, Square, X, RotateCcw, Home, Search, MoreHorizontal, Shield, ChevronUp, ChevronDown } from "lucide-react"
import './scrollbar.css'

interface DesktopFrameProps {
  children: ReactNode
}

export function DesktopFrame({ children }: DesktopFrameProps) {
  return (
    <div className="flex items-center justify-center py-4 px-4 scale-75 lg:scale-90 xl:scale-100">
      <div className="relative">
        {/* Monitor Stand - Modern Design */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          {/* Stand Base - Modern Arc with UGO colors */}
          <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-full w-56 h-6 shadow-2xl border-t border-blue-500/30"></div>
          {/* Stand Pole - Sleek with accent */}
          <div className="bg-gradient-to-b from-slate-700 to-slate-800 w-6 h-20 mx-auto -mt-1 rounded-b-lg shadow-lg border-x border-blue-500/20"></div>
          {/* Stand Joint */}
          <div className="bg-slate-600 w-8 h-3 mx-auto -mt-20 rounded-full shadow-inner border border-blue-400/40"></div>
        </div>
        
        {/* Monitor Frame - Ultra Thin Bezels with UGO branding colors */}
        <div 
          className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-2xl p-1 shadow-2xl border-2"
          style={{ 
            width: '1200px', 
            height: '720px',
            borderColor: '#2C3E50'
          }}
        >
          {/* Ultra Thin Bezel */}
          <div className="bg-black rounded-xl p-1 h-full relative overflow-hidden">
            {/* Screen Glare Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-lg pointer-events-none z-10"></div>
            
            {/* Browser Window */}
            <div 
              className="bg-white rounded-lg h-full overflow-hidden relative shadow-inner"
              style={{ maxWidth: '1196px', maxHeight: '716px' }}
            >
              {/* Browser Top Bar */}
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-3 flex items-center justify-between border-b border-gray-300">
                {/* Window Controls */}
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm hover:bg-red-600 cursor-pointer"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm hover:bg-yellow-600 cursor-pointer"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm hover:bg-green-600 cursor-pointer"></div>
                  </div>
                </div>

                {/* Tab Bar */}
                <div className="flex-1 flex items-center ml-4">
                  <div className="bg-white rounded-t-lg px-4 py-2 mr-2 shadow-sm border border-gray-300 border-b-0 flex items-center min-w-0 max-w-xs transition-all hover:shadow-md">
                    <Shield size={14} className="text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700 truncate">UGO Admin Dashboard</span>
                    <X size={14} className="text-gray-400 hover:text-gray-600 ml-2 cursor-pointer flex-shrink-0 transition-colors hover:bg-gray-200 rounded p-0.5" />
                  </div>
                  <div className="bg-gray-100 hover:bg-gray-200 rounded-t-lg px-4 py-2 mr-2 cursor-pointer border border-gray-300 border-b-0 flex items-center transition-all hover:shadow-sm">
                    <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-500">+</span>
                  </div>
                </div>

                {/* Browser Controls */}
                <div className="flex items-center space-x-1">
                  <button className="p-2 hover:bg-gray-300 rounded-lg transition-colors">
                    <RotateCcw size={16} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-300 rounded-lg transition-colors">
                    <Home size={16} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-300 rounded-lg transition-colors">
                    <MoreHorizontal size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Address Bar */}
              <div className="bg-white px-4 py-2 border-b border-gray-200 flex items-center">
                <div className="flex-1 bg-gray-50 rounded-full px-4 py-2 flex items-center border border-gray-300 hover:border-blue-400 focus-within:border-blue-500 transition-colors">
                  <Shield size={16} className="text-green-500 mr-2" />
                  <span className="text-sm text-gray-600 flex-1">https://admin.ugo.edu/dashboard</span>
                  <Search size={16} className="text-gray-400" />
                </div>
                <div className="ml-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
              </div>

              {/* Content Area */}
              <div 
                className="h-full overflow-y-auto overflow-x-hidden desktop-monitor-content"
                style={{ 
                  height: 'calc(100% - 120px)'
                }}
              >
                {children}
              </div>
            </div>
          </div>
          
          {/* Power LED - UGO Blue */}
          <div className="absolute bottom-2 right-4 w-2 h-2 bg-blue-400 rounded-full shadow-lg animate-pulse opacity-80 ring-1 ring-blue-300/50"></div>
        </div>
        
        {/* Monitor Shadow - More Realistic */}
        <div 
          className="absolute inset-0 bg-black rounded-2xl opacity-10 blur-3xl transform translate-y-16 scale-105 -z-10"
          style={{ width: '1200px', height: '720px' }}
        ></div>
      </div>
    </div>
  )
}