"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Brain, Activity, Heart, Thermometer, Droplets } from "lucide-react"

interface DoctorInteractionPageProps {
  onBack: () => void
}

export function DoctorInteractionPage({ onBack }: DoctorInteractionPageProps) {
  const scoringSystems = [
    {
      name: "SNAPPE-II Score",
      score: 85,
      risk: "High",
      icon: Activity,
      details: "Score for Neonatal Acute Physiology with Perinatal Extension",
    },
    {
      name: "CRIB-II Score",
      score: 72,
      risk: "Moderate",
      icon: Heart,
      details: "Clinical Risk Index for Babies",
    },
    {
      name: "NTISS Score",
      score: 68,
      risk: "Moderate",
      icon: Brain,
      details: "Neonatal Therapeutic Intervention Scoring System",
    },
    {
      name: "TRIPS Score",
      score: 91,
      risk: "High",
      icon: Thermometer,
      details: "Transport Risk Index of Physiologic Stability",
    },
    {
      name: "PSOFA Score",
      score: 78,
      risk: "High",
      icon: Droplets,
      details: "Pediatric Sequential Organ Failure Assessment",
    },
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "text-medical-danger"
      case "Moderate":
        return "text-medical-warning"
      case "Low":
        return "text-medical-success"
      default:
        return "text-muted-foreground"
    }
  }

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "High":
        return "destructive"
      case "Moderate":
        return "secondary"
      case "Low":
        return "default"
      default:
        return "outline"
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="text-white hover:text-white/80 mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Results
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Detailed Scoring Analysis</h2>
          <p className="text-white/80">Individual scoring system breakdowns</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scoringSystems.map((system, index) => {
          const IconComponent = system.icon
          return (
            <Card
              key={index}
              className="bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mr-3">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">{system.name}</CardTitle>
                  </div>
                  <Badge variant={getRiskBadgeVariant(system.risk)}>{system.risk}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className={`text-3xl font-bold mb-2 ${getRiskColor(system.risk)}`}>{system.score}%</div>
                  <div className="w-full bg-muted rounded-full h-2 mb-4">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        system.risk === "High"
                          ? "bg-medical-danger"
                          : system.risk === "Moderate"
                            ? "bg-medical-warning"
                            : "bg-medical-success"
                      }`}
                      style={{ width: `${system.score}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground text-center mb-4">{system.details}</p>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Physiological factors:</span>
                    <span className="font-medium">High impact</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Laboratory values:</span>
                    <span className="font-medium">Moderate impact</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Clinical presentation:</span>
                    <span className="font-medium">{system.risk === "High" ? "Concerning" : "Stable"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Chatbot Section */}
      <Card className="mt-8 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-primary" />
            Ask Septoctor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6">
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-muted-foreground mb-2">Doctor:</p>
                <p className="text-sm">"Why is the risk score so high for this patient?"</p>
              </div>

              <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-4 text-white">
                <p className="text-sm font-medium mb-2">Septoctor AI:</p>
                <p className="text-sm">
                  "The high risk score is primarily driven by abnormal vital signs (low blood pressure, temperature
                  instability), elevated inflammatory markers, and respiratory distress requiring mechanical
                  ventilation. The combination of these factors across multiple organ systems indicates a high
                  probability of sepsis development."
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                Why high risk?
              </Button>
              <Button variant="outline" size="sm">
                Treatment recommendations?
              </Button>
              <Button variant="outline" size="sm">
                Monitoring frequency?
              </Button>
              <Button variant="outline" size="sm">
                Prognosis factors?
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
