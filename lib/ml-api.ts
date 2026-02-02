import type { AssessmentData } from "@/app/page"

// ---- Response types ----
export type RiskLabel = "LOW" | "MODERATE" | "HIGH"

export interface TopContributingFactor {
  feature: string
  shap_value: number
}

export interface PredictResponse {
  sepsis_probability: number
  risk_label: RiskLabel
  top_contributing_factors: TopContributingFactor[]
}

// ---- API call ----
export async function predictSepsis(
  payload: AssessmentData
): Promise<PredictResponse> {
  const response = await fetch("/api/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`ML API error (${response.status}): ${text}`)
  }

  return response.json()
}
