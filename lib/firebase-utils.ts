/**
 * Firebase Firestore Utility Functions
 * Handles data validation, cleaning, and CRUD operations for Septoctor
 */

import {
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
  FieldValue,
} from "firebase/firestore"
import { initFirebase } from "@/lib/firebase"
import type { Diagnosis } from "@/lib/queries"
import type { AssessmentData } from "@/app/page"

const { db } = initFirebase()

/**
 * Recursively removes all undefined, null, and empty values from an object
 * Firebase Firestore does not accept undefined values
 */
export function cleanDataForFirebase<T extends Record<string, any>>(data: T): Partial<T> {
  const cleaned: any = {}

  for (const [key, value] of Object.entries(data)) {
    // Skip undefined and null values
    if (value === undefined || value === null) {
      continue
    }

    // Handle nested objects recursively
    if (typeof value === "object" && !Array.isArray(value) && !(value instanceof Date)) {
      const nestedCleaned = cleanDataForFirebase(value)
      // Only add nested object if it has properties
      if (Object.keys(nestedCleaned).length > 0) {
        cleaned[key] = nestedCleaned
      }
      continue
    }

    // Handle arrays - filter out undefined values
    if (Array.isArray(value)) {
      const cleanedArray = value.filter((item) => item !== undefined && item !== null)
      if (cleanedArray.length > 0) {
        cleaned[key] = cleanedArray
      }
      continue
    }

    // Add non-empty strings and all other types
    if (typeof value === "string" && value.trim() === "") {
      continue
    }

    cleaned[key] = value
  }

  return cleaned
}

/**
 * Validates diagnosis data before saving
 * Ensures all required fields are present and properly formatted
 */
export function validateDiagnosisData(data: Partial<Diagnosis>): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Required fields
  if (!data.patientId) errors.push("Patient ID is required")
  if (!data.patientName) errors.push("Patient name is required")
  if (!data.doctorId) errors.push("Doctor ID is required")
  if (!data.doctorName) errors.push("Doctor name is required")
  if (!data.hospitalId) errors.push("Hospital ID is required")
  if (!data.diagnosisType) errors.push("Diagnosis type is required")
  if (!data.diagnosisSummary) errors.push("Diagnosis summary is required")
  if (!data.treatmentPlan) errors.push("Treatment plan is required")

  // Validate numeric fields
  if (data.neonatalMetrics?.heartRate !== undefined && typeof data.neonatalMetrics.heartRate !== "number") {
    errors.push("Heart rate must be a number")
  }
  if (data.neonatalMetrics?.respiratoryRate !== undefined && typeof data.neonatalMetrics.respiratoryRate !== "number") {
    errors.push("Respiratory rate must be a number")
  }
  if (data.neonatalMetrics?.temperature !== undefined && typeof data.neonatalMetrics.temperature !== "number") {
    errors.push("Temperature must be a number")
  }
  if (data.neonatalMetrics?.oxygenSaturation !== undefined && typeof data.neonatalMetrics.oxygenSaturation !== "number") {
    errors.push("Oxygen saturation must be a number")
  }

  // Validate lab results
  if (data.labResults?.wbcCount !== undefined && typeof data.labResults.wbcCount !== "number") {
    errors.push("WBC count must be a number")
  }
  if (data.labResults?.cReactiveProtein !== undefined && typeof data.labResults.cReactiveProtein !== "number") {
    errors.push("C-reactive protein must be a number")
  }
  if (data.labResults?.procalcitonin !== undefined && typeof data.labResults.procalcitonin !== "number") {
    errors.push("Procalcitonin must be a number")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Saves a diagnosis record to Firestore
 * Automatically cleans data and adds timestamps
 */
export async function saveDiagnosis(diagnosisData: Partial<Diagnosis>): Promise<string> {
  try {
    // Validate data
    const validation = validateDiagnosisData(diagnosisData)
    if (!validation.valid) {
      const errorMessage = `Validation failed: ${validation.errors.join(", ")}`
      console.error("saveDiagnosis validation error:", errorMessage)
      throw new Error(errorMessage)
    }

    // Clean data to remove undefined values
    const cleanedData = cleanDataForFirebase(diagnosisData)

    // Add timestamps
    const dataToSave = {
      ...cleanedData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      diagnosisDate: diagnosisData.diagnosisDate || new Date(),
    }

    // Save to Firestore
    const docRef = await addDoc(collection(db, "diagnoses"), dataToSave)
    console.log("Diagnosis saved successfully with ID:", docRef.id)
    return docRef.id
  } catch (error: any) {
    console.error("Error saving diagnosis:", error.message, error)
    throw new Error(`Failed to save diagnosis: ${error.message}`)
  }
}

/**
 * Updates an existing diagnosis record
 * Cleans data before updating
 */
export async function updateDiagnosis(diagnosisId: string, updates: Partial<Diagnosis>): Promise<void> {
  try {
    const cleanedData = cleanDataForFirebase(updates)

    const dataToUpdate = {
      ...cleanedData,
      updatedAt: serverTimestamp(),
    }

    await setDoc(doc(db, "diagnoses", diagnosisId), dataToUpdate, { merge: true })
    console.log("Diagnosis updated successfully:", diagnosisId)
  } catch (error: any) {
    console.error("Error updating diagnosis:", error.message, error)
    throw new Error(`Failed to update diagnosis: ${error.message}`)
  }
}

/**
 * Converts AssessmentData to Diagnosis format and saves it
 */
export async function saveAssessmentAsDiagnosis(
  assessmentData: Partial<AssessmentData>,
  userProfile: any, // User profile from auth context
  patientInfo: { id: string; name: string },
  hospitalId: string,
  state: string
): Promise<string> {
  try {
    // Build diagnosis from assessment data
    const diagnosis: Partial<Diagnosis> = {
      patientId: patientInfo.id,
      patientName: patientInfo.name,
      doctorId: userProfile.uid,
      doctorName: userProfile.name,
      hospitalId: hospitalId,
      state: state,
      diagnosisType: "Neonatal Sepsis Assessment",
      severity: "Pending", // Will be updated after ML prediction
      diagnosisSummary: "AI-assisted sepsis risk assessment",
      detailedNotes: `Assessment based on ${Object.keys(assessmentData).length} clinical parameters`,
      neonatalMetrics: {
        heartRate: assessmentData.heart_rate_bpm,
        respiratoryRate: assessmentData.temperature_celsius ? Math.round(40 + assessmentData.temperature_celsius * 2) : undefined,
        temperature: assessmentData.temperature_celsius,
        oxygenSaturation: undefined, // Not directly in assessment form
      },
      treatmentPlan: "Awaiting risk assessment results",
      status: "draft",
      diagnosisDate: new Date(),
    }

    // Save to Firestore
    return await saveDiagnosis(diagnosis)
  } catch (error: any) {
    console.error("Error saving assessment as diagnosis:", error.message)
    throw new Error(`Failed to save assessment: ${error.message}`)
  }
}

/**
 * Validates that neonatal metrics don't contain undefined values
 * Useful for checking data before calling saveDiagnosis
 */
export function validateNeonatalMetrics(metrics: any): boolean {
  if (!metrics) return true

  for (const [key, value] of Object.entries(metrics)) {
    if (value === undefined) {
      console.warn(`Neonatal metric '${key}' is undefined`)
      return false
    }
  }
  return true
}

/**
 * Safe wrapper to convert form data to diagnosis
 * Ensures all undefined values are properly handled
 */
export function buildDiagnosisFromForm(formData: any): Partial<Diagnosis> {
  // Only include fields that have actual values
  const diagnosis: any = {}

  // Basic info
  if (formData.patientId) diagnosis.patientId = formData.patientId
  if (formData.patientName) diagnosis.patientName = formData.patientName
  if (formData.doctorId) diagnosis.doctorId = formData.doctorId
  if (formData.doctorName) diagnosis.doctorName = formData.doctorName
  if (formData.hospitalId) diagnosis.hospitalId = formData.hospitalId
  if (formData.state) diagnosis.state = formData.state

  // Diagnosis info
  diagnosis.diagnosisType = formData.diagnosisType || "Assessment"
  diagnosis.severity = formData.severity || "Pending"
  diagnosis.diagnosisSummary = formData.diagnosisSummary || "Clinical assessment"
  diagnosis.detailedNotes = formData.detailedNotes || ""
  diagnosis.treatmentPlan = formData.treatmentPlan || ""
  diagnosis.status = formData.status || "draft"

  // Neonatal metrics - ONLY include if values are defined
  const neonatalMetrics: any = {}
  if (formData.heartRate !== undefined) neonatalMetrics.heartRate = formData.heartRate
  if (formData.respiratoryRate !== undefined) neonatalMetrics.respiratoryRate = formData.respiratoryRate
  if (formData.temperature !== undefined) neonatalMetrics.temperature = formData.temperature
  if (formData.oxygenSaturation !== undefined) neonatalMetrics.oxygenSaturation = formData.oxygenSaturation
  if (formData.bloodPressure) neonatalMetrics.bloodPressure = formData.bloodPressure
  if (formData.weight !== undefined) neonatalMetrics.weight = formData.weight

  // Only add neonatalMetrics if it has properties
  if (Object.keys(neonatalMetrics).length > 0) {
    diagnosis.neonatalMetrics = neonatalMetrics
  }

  // Lab results - ONLY include if values are defined
  const labResults: any = {}
  if (formData.wbcCount !== undefined) labResults.wbcCount = formData.wbcCount
  if (formData.cReactiveProtein !== undefined) labResults.cReactiveProtein = formData.cReactiveProtein
  if (formData.procalcitonin !== undefined) labResults.procalcitonin = formData.procalcitonin
  if (formData.bloodCulture) labResults.bloodCulture = formData.bloodCulture

  // Only add labResults if it has properties
  if (Object.keys(labResults).length > 0) {
    diagnosis.labResults = labResults
  }

  // Prescriptions
  if (formData.prescriptions && Array.isArray(formData.prescriptions)) {
    diagnosis.prescriptions = formData.prescriptions.filter((p: string) => p && p.trim())
  }

  // ML Prediction
  if (formData.mlPrediction) {
    diagnosis.mlPrediction = {
      riskScore: formData.mlPrediction.riskScore,
      prediction: formData.mlPrediction.prediction || "",
      confidence: formData.mlPrediction.confidence,
    }
  }

  // Dates
  diagnosis.diagnosisDate = formData.diagnosisDate || new Date()

  return diagnosis as Partial<Diagnosis>
}

export default {
  cleanDataForFirebase,
  validateDiagnosisData,
  saveDiagnosis,
  updateDiagnosis,
  saveAssessmentAsDiagnosis,
  validateNeonatalMetrics,
  buildDiagnosisFromForm,
}
