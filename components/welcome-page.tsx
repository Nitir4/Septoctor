"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Baby, Shield, Brain, Activity } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

interface WelcomePageProps {
  onStart: () => void
}

export function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <ThemeToggle />

      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm dark:bg-card/95">
        <CardContent className="p-6 md:p-12 text-center">
          <div className="mb-6 md:mb-8">
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                  <Baby className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-medical-teal rounded-full flex items-center justify-center">
                  <Brain className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4 text-balance">Septoctor</h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 text-balance">
              AI Driven Sepsis Prediction & Risk Scoring
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="flex flex-col items-center p-3 md:p-4">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary mb-2" />
                <span className="text-xs md:text-sm text-muted-foreground">Accurate Prediction</span>
              </div>
              <div className="flex flex-col items-center p-3 md:p-4">
                <Brain className="w-6 h-6 md:w-8 md:h-8 text-accent mb-2" />
                <span className="text-xs md:text-sm text-muted-foreground">AI-Powered Analysis</span>
              </div>
              <div className="flex flex-col items-center p-3 md:p-4">
                <Activity className="w-6 h-6 md:w-8 md:h-8 text-primary mb-2" />
                <span className="text-xs md:text-sm text-muted-foreground">Real-time Results</span>
              </div>
            </div>
          </div>

          <Button
            onClick={onStart}
            size="lg"
            className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 text-base md:text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[44px]"
          >
            Begin Assessment
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
