"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoginPage, type LoginCredentials } from "@/components/login-page"
import { DataInputPage } from "@/components/data-input-page"
import { AssessmentForm } from "@/components/assessment-form"
import { ProcessingPage } from "@/components/processing-page"
import { ResultsPage } from "@/components/results-page" 
import { DoctorInteractionPage } from "@/components/doctor-interaction-page"
import { FinalPage } from "@/components/final-page"
import { useAuth } from "@/hooks/use-auth"
import { UserRole } from "@/lib/rbac"
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { initFirebase } from '@/lib/firebase'

export interface AssessmentData {
  
  prom_present?: string;
  prom_duration_hours?: number;
  maternal_fever_celsius?: number;
  chorioamnionitis?: string;
  foul_smelling_liquor?: string;
  prolonged_labor?: string;
  pv_examinations_count?: number;
  unbooked_pregnancy?: string;
  maternal_uti_sti?: string;
  meconium_stained_liquor?: string;
  cotwin_iud?: string;

  gestational_age_category?: string;
  birth_weight_category?: string;
  apgar_1_min?: number;
  apgar_5_min?: number;
  resuscitation_required?: string;
  neonatal_sex?: string;

  temperature_celsius?: number;
  feeding_status?: string;
  activity_level?: string;
  respiratory_distress?: string;
  heart_rate_bpm?: number;
  apnea_present?: string;
  shock_present?: string;

   // ---- HSS ----
  hss_tlc_abnormal?: string;
  hss_anc_abnormal?: string;
  hss_it_ratio_high?: string;
  hss_im_ratio_high?: string;
  hss_platelet_low?: string;
  hss_neutrophil_degeneration?: string;
  hss_nrbc_elevated?: string;

  // ---- APGAR 1 min ----
  apgar1_appearance?: string;
  apgar1_pulse?: string;
  apgar1_grimace?: string;
  apgar1_activity?: string;
  apgar1_respiration?: string;

  // ---- APGAR 5 min ----
  apgar5_appearance?: string;
  apgar5_pulse?: string;
  apgar5_grimace?: string;
  apgar5_activity?: string;
  apgar5_respiration?: string;

  // ---- SCORES ----
  mnrs_score?: number;
  hss_score?: number;
  apgar1_total?: number;
  apgar5_total?: number;
}


export default function SeptoctorApp() {
  const router = useRouter()
  const { userProfile, loading: authLoading } = useAuth()
  const [currentPage, setCurrentPage] = useState(0) // Start at 0 for login
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userCredentials, setUserCredentials] = useState<LoginCredentials | null>(null)
  const [assessmentData, setAssessmentData] = useState<Partial<AssessmentData>>({})
  const [riskScore, setRiskScore] = useState<number | null>(null)
  const [patientId, setPatientId] = useState<string | null>(null)
  const [diagnosisId, setDiagnosisId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Auto-redirect only pure admin users to their dashboards
  // Hospital admins and clinicians get to choose between dashboard and assessment workflow
  useEffect(() => {
    if (authLoading) return
    
    if (userProfile) {
      // Only redirect pure admin roles (national/state level)
      if (userProfile.role === UserRole.SUPER_ADMIN) {
        router.push('/dashboard/national')
      } else if (userProfile.role === UserRole.STATE_ADMIN) {
        router.push('/dashboard/state')
      }
      // HOSPITAL_ADMIN and CLINICIAN users continue to normal flow with dashboard access
    }
  }, [userProfile, authLoading, router])

  const handleLogin = (credentials: LoginCredentials) => {
    // Store user credentials and navigate to data input page
    setUserCredentials(credentials)
    setIsLoggedIn(true)
    setCurrentPage(2) // Go directly to data input page after login
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleAssessmentSubmit = async (data: AssessmentData) => {
    setAssessmentData(data)
    setCurrentPage(4) // Processing page
    setIsSaving(true)

    try {
      // Calculate risk score (mock for now)
      const mockRiskScore = Math.floor(Math.random() * 100)
      setRiskScore(mockRiskScore)

      // Determine risk status
      const riskStatus = mockRiskScore >= 70 ? 'critical' : mockRiskScore >= 40 ? 'high-risk' : mockRiskScore >= 20 ? 'moderate' : 'stable'

      // Save patient data to Firestore if user is authenticated
      if (userProfile) {
        // Initialize Firebase
        const { db } = initFirebase()
        
        console.log('Firebase initialized, db:', !!db)
        console.log('User profile:', { uid: userProfile.uid, hospitalId: userProfile.hospitalId, state: userProfile.state })
        
        if (!db) {
          throw new Error('Firebase database not initialized')
        }

        // Create patient record
        const patientData = {
          name: `Patient-${Date.now()}`, // Generate patient name or get from form
          age: 1, // Get from form data if available
          gender: data.neonatal_sex === 'male' ? 'male' : 'female',
          hospitalId: userProfile.hospitalId || 'unknown',
          assignedDoctorId: userProfile.uid,
          riskScore: mockRiskScore / 100,
          status: riskStatus,
          state: userProfile.state || 'unknown',
          admissionDate: serverTimestamp(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }

        console.log('Attempting to save patient data:', patientData)
        const patientRef = await addDoc(collection(db, 'patients'), patientData)
        setPatientId(patientRef.id)
        console.log('Patient saved with ID:', patientRef.id)

        // Create diagnosis record
        const diagnosisData = {
          patientId: patientRef.id,
          patientName: patientData.name,
          doctorId: userProfile.uid,
          doctorName: userProfile.name,
          hospitalId: userProfile.hospitalId || 'unknown',
          state: userProfile.state || 'unknown',
          diagnosisType: 'neonatal_sepsis_assessment',
          severity: riskStatus,
          diagnosisSummary: `Neonatal sepsis risk assessment with ${mockRiskScore}% risk score`,
          detailedNotes: JSON.stringify(data, null, 2),
          neonatalMetrics: {
            heartRate: data.heart_rate_bpm,
            respiratoryRate: data.respiratory_distress === 'yes' ? 60 : 40,
            temperature: data.temperature_celsius,
            oxygenSaturation: 95
          },
          labResults: {
            wbcCount: data.hss_tlc_abnormal === 'yes' ? 25000 : 12000,
            cReactiveProtein: 15,
            bloodCulture: 'Pending'
          },
          treatmentPlan: `Risk assessment completed. ${mockRiskScore >= 70 ? 'Immediate intervention required.' : 'Monitor closely and follow standard protocols.'}`,
          prescriptions: mockRiskScore >= 70 ? ['Antibiotics', 'IV fluids', 'Oxygen support'] : ['Monitoring', 'Supportive care'],
          status: 'active',
          diagnosisDate: serverTimestamp(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          mlPrediction: {
            riskScore: mockRiskScore / 100,
            prediction: riskStatus,
            confidence: 0.85 + Math.random() * 0.1
          }
        }

        const diagnosisRef = await addDoc(collection(db, 'diagnoses'), diagnosisData)
        setDiagnosisId(diagnosisRef.id)
        console.log('Diagnosis saved with ID:', diagnosisRef.id)
      }

      // Move to results page after saving
      setTimeout(() => {
        setIsSaving(false)
        setCurrentPage(5) // Results page
      }, 2000)
    } catch (error) {
      console.error('Error saving patient data:', error)
      console.error('Error details:', {
        message: (error as any)?.message,
        code: (error as any)?.code,
        stack: (error as any)?.stack,
        userProfile: userProfile
      })
      setIsSaving(false)
      
      const errorMessage = (error as any)?.message || 'Unknown error occurred'
      alert(`Failed to save patient data: ${errorMessage}. Please check the console for details.`)
      
      // Still show results even if save fails
      setTimeout(() => {
        setCurrentPage(5)
      }, 1000)
    }
  }

  const renderCurrentPage = () => {
    // Show login page if not logged in
    if (!isLoggedIn) {
      return <LoginPage onLogin={handleLogin} />
    }

    switch (currentPage) {
      case 2:
        return <DataInputPage onManualEntry={() => handlePageChange(3)} onBack={() => {
          setIsLoggedIn(false)
          setCurrentPage(0)
        }} />
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
        return (
          <DoctorInteractionPage
            onBack={() => handlePageChange(5)}
            data={assessmentData}
          />
        );
      case 7:
        return <FinalPage 
          onRestart={() => {
            setPatientId(null)
            setDiagnosisId(null)
            setAssessmentData({})
            setRiskScore(null)
            handlePageChange(2)
          }} 
          onBack={() => handlePageChange(5)}
          patientId={patientId}
          diagnosisId={diagnosisId}
        />
      default:
        return <DataInputPage onManualEntry={() => handlePageChange(3)} onBack={() => {
          setIsLoggedIn(false)
          setCurrentPage(0)
        }} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-blue to-medical-teal">
      <div className="container mx-auto px-4 py-8">{renderCurrentPage()}</div>
    </div>
  )
}
