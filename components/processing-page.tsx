import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Activity, Zap } from "lucide-react"

export function ProcessingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <div className="mb-8">
            <div className="relative mx-auto w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full animate-spin">
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-primary animate-pulse" />
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-4">Analyzing Risk Profile</h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>Processing vital signs...</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 animate-pulse" />
                <span>Running AI models...</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Brain className="w-4 h-4 animate-pulse" />
                <span>Calculating risk scores...</span>
              </div>
            </div>

            <Progress value={75} className="h-2 mb-4" />

            <p className="text-sm text-muted-foreground">This may take a few moments...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
