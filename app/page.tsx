"use client"

import { useState } from "react"
import { WelcomePage } from "@/components/welcome-page"
import { DataInputPage } from "@/components/data-input-page"
import { AssessmentForm } from "@/components/assessment-form"
import { ProcessingPage } from "@/components/processing-page"
import { ResultsPage } from "@/components/results-page" 
import { DoctorInteractionPage } from "@/components/doctor-interaction-page"
import { FinalPage } from "@/components/final-page"

export type AssessmentData = {
  // Neonatal Information
  sex: string
  gestationalAge: number
  birthWeight: number
  gestationalStatus: string
  apgarScore: number
  apgarCategory: string
  multipleSeizures: string

  // Vital Signs
  meanBloodPressure: number
  lowestTemperature: number
  lowestSerumPH: number
  urineOutput: number
  abnormalTemperature: string

  // Respiratory & Circulatory Support
  incubatedAtSepsisEvaluation: string
  inotropeAtSepsisEvaluation: string
  centralVenousLine: string
  umbilicalArterialLine: string

  // Respiratory Support & Oxygenation
  oxygenationMethod: string
  hfov: string
  spo2Fio2Ratio: string
  pao2Fio2Ratio: string
  apneicSpells: string
  respiratoryDistress: string
  bradycardias: string
  fastBreathing: string
  chestIndrawing: string
  grunting: string

  // Comorbidities
  necrotizingEnterocolitis: string
  chronicLungDisease: string
  surgicalConditions: string
  intraventricularHemorrhage: string

  // Circulatory System
  cardiovascularStatus: string
  skinColouration: string
  microcirculation: string
  liverEnlargement: string
  prolongedCapillaryRefillTime: number
  cyanosis: string

  // Hematologic & Immune System
  plateletCount: string
  totalWBCCount: string
  totalPMNCount: string
  immaturePMNCount: string
  itPMNRatio: string
  imPMNRatio: string
  degenerativePMNChanges: string
  shiftToLeft: string

  // Metabolic & Neuromuscular Signs
  metabolicAcidosis: string
  muscularHypotonia: string
  stiffLimbs: string
  convulsion: string
  lethargy: string

  // Gastrointestinal
  giSymptoms: string
  poorFeeding: string
}

export default function SeptoctorApp() {
  const [currentPage, setCurrentPage] = useState(1)
  const [assessmentData, setAssessmentData] = useState<Partial<AssessmentData>>({})
  const [riskScore, setRiskScore] = useState<number | null>(null)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleAssessmentSubmit = (data: AssessmentData) => {
    setAssessmentData(data)
    setCurrentPage(4) // Processing page

    // Simulate AI processing
    setTimeout(() => {
      // Mock risk calculation
      const mockRiskScore = Math.floor(Math.random() * 100)
      setRiskScore(mockRiskScore)
      setCurrentPage(5) // Results page
    }, 3000)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return <WelcomePage onStart={() => handlePageChange(2)} />
      case 2:
        return <DataInputPage onManualEntry={() => handlePageChange(3)} onBack={() => handlePageChange(1)} />
      case 3:
        return <AssessmentForm onSubmit={handleAssessmentSubmit} onBack={() => handlePageChange(2)} />
      case 4:
        return <ProcessingPage />
      case 5:
        return (
          <ResultsPage
            riskScore={riskScore}
            onDoctorInteraction={() => handlePageChange(6)}
            onFinalPage={() => handlePageChange(7)}
            onBack={() => handlePageChange(3)}
          />
        )
      case 6:
        return <DoctorInteractionPage onBack={() => handlePageChange(5)} />
      case 7:
        return <FinalPage onRestart={() => handlePageChange(1)} onBack={() => handlePageChange(5)} />
      default:
        return <WelcomePage onStart={() => handlePageChange(2)} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-blue to-medical-teal">
      <div className="container mx-auto px-4 py-8">{renderCurrentPage()}</div>
    </div>
  )
}
