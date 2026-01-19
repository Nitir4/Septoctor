"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft } from "lucide-react"
import type { AssessmentData } from "@/app/page"

interface AssessmentFormProps {
  onSubmit: (data: AssessmentData) => void
  onBack: () => void
}

export function AssessmentForm({ onSubmit, onBack }: AssessmentFormProps) {
  const [formData, setFormData] = useState<Partial<AssessmentData>>({})
  const [openSections, setOpenSections] = useState<string[]>(["neonatal-info"])

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    onSubmit(formData as AssessmentData)
  }

  const YesNoRadio = ({ field, label }: { field: string; label: string }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <RadioGroup
        value={formData[field as keyof AssessmentData] as string}
        onValueChange={(value) => updateFormData(field, value)}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id={`${field}-yes`} />
          <Label htmlFor={`${field}-yes`}>Yes</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id={`${field}-no`} />
          <Label htmlFor={`${field}-no`}>No</Label>
        </div>
      </RadioGroup>
    </div>
  )

  const totalSections = 9
  const completedSections = openSections.length > 0 ? Math.min(openSections.length, totalSections) : 1
  const progress = (completedSections / totalSections) * 100

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-4 md:mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white hover:text-white hover:bg-white/10 flex items-center gap-2 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Data Input</span>
          <span className="sm:hidden">Back</span>
        </Button>
      </div>

      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <h2 className="text-xl md:text-3xl font-bold text-white">Neonatal Sepsis Risk Assessment</h2>
          <div className="text-white/80 text-xs md:text-sm">
            {completedSections} of {totalSections} sections
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="p-4 md:p-6">
          <Accordion type="multiple" value={openSections} onValueChange={setOpenSections}>
            {/* 1. Neonatal Information */}
            <AccordionItem value="neonatal-info">
              <AccordionTrigger className="text-base md:text-lg font-semibold">
                1. Neonatal Information
              </AccordionTrigger>
              <AccordionContent className="space-y-4 md:space-y-6 pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label>Sex</Label>
                    <Select onValueChange={(value) => updateFormData("sex", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Gestational Age (Weeks)</Label>
                    <Input
                      type="number"
                      placeholder="Enter weeks"
                      onChange={(e) => updateFormData("gestationalAge", Number.parseFloat(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Birth Weight (gm)</Label>
                    <Input
                      type="number"
                      placeholder="Enter weight in grams"
                      onChange={(e) => updateFormData("birthWeight", Number.parseFloat(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Gestational Status</Label>
                    <Select onValueChange={(value) => updateFormData("gestationalStatus", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="sga">10th Centile (SGA)</SelectItem>
                        <SelectItem value="aga">Appropriate for Gestational Age</SelectItem>
                        <SelectItem value="lga">Large for Gestational Age</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Apgar Score</Label>
                    <Input
                      type="number"
                      placeholder="Enter score"
                      onChange={(e) => updateFormData("apgarScore", Number.parseFloat(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Apgar Category</Label>
                    <Select onValueChange={(value) => updateFormData("apgarCategory", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<7">&lt;7</SelectItem>
                        <SelectItem value=">7">&gt;7</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <YesNoRadio field="multipleSeizures" label="Multiple Seizures" />
              </AccordionContent>
            </AccordionItem>

            {/* 2. Vital Signs */}
            <AccordionItem value="vital-signs">
              <AccordionTrigger className="text-base md:text-lg font-semibold">2. Vital Signs</AccordionTrigger>
              <AccordionContent className="space-y-4 md:space-y-6 pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label>Mean Blood Pressure (mmHg)</Label>
                    <Input
                      type="number"
                      placeholder="Enter pressure"
                      onChange={(e) => updateFormData("meanBloodPressure", Number.parseFloat(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Lowest Temperature (°F)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Enter temperature"
                      onChange={(e) => updateFormData("lowestTemperature", Number.parseFloat(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Lowest Serum pH</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter pH"
                      onChange={(e) => updateFormData("lowestSerumPH", Number.parseFloat(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Urine Output (mL/kg/hr)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Enter output"
                      onChange={(e) => updateFormData("urineOutput", Number.parseFloat(e.target.value))}
                    />
                  </div>
                </div>

                <YesNoRadio field="abnormalTemperature" label="Abnormal Temperature" />
              </AccordionContent>
            </AccordionItem>

            {/* 3. Respiratory & Circulatory Support */}
            <AccordionItem value="respiratory-circulatory">
              <AccordionTrigger className="text-base md:text-lg font-semibold">
                3. Respiratory & Circulatory Support
              </AccordionTrigger>
              <AccordionContent className="space-y-4 md:space-y-6 pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  <YesNoRadio field="incubatedAtSepsisEvaluation" label="Incubated at Sepsis Evaluation" />
                  <YesNoRadio field="inotropeAtSepsisEvaluation" label="Inotrope at Sepsis Evaluation" />
                  <YesNoRadio field="centralVenousLine" label="Central Venous Line" />
                  <YesNoRadio field="umbilicalArterialLine" label="Umbilical Arterial Line" />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="respiratory-oxygenation">
              <AccordionTrigger className="text-base md:text-lg font-semibold">
                4. Respiratory Support & Oxygenation
              </AccordionTrigger>
              <AccordionContent className="space-y-4 md:space-y-6 pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label>Oxygenation Method</Label>
                    <Select onValueChange={(value) => updateFormData("oxygenationMethod", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-support">No Support</SelectItem>
                        <SelectItem value="nasal-cannula">Nasal Cannula</SelectItem>
                        <SelectItem value="cpap">CPAP</SelectItem>
                        <SelectItem value="mechanical-ventilation">Mechanical Ventilation</SelectItem>
                        <SelectItem value="hfov">High Frequency Oscillation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <YesNoRadio field="hfov" label="HFOV" />

                  <div className="space-y-2">
                    <Label>SpO₂/FiO₂ Ratio</Label>
                    <Select onValueChange={(value) => updateFormData("spo2Fio2Ratio", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ratio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=">=300">≥300</SelectItem>
                        <SelectItem value="<300">&lt;300</SelectItem>
                        <SelectItem value="<200">&lt;200</SelectItem>
                        <SelectItem value="<150">&lt;150</SelectItem>
                        <SelectItem value="<100">&lt;100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>PaO₂/FiO₂ Ratio</Label>
                    <Select onValueChange={(value) => updateFormData("pao2Fio2Ratio", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ratio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=">2.5">&gt;2.5</SelectItem>
                        <SelectItem value="1-2.49">1–2.49</SelectItem>
                        <SelectItem value="0.3-0.99">0.3–0.99</SelectItem>
                        <SelectItem value="<0.3">&lt;0.3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <YesNoRadio field="apneicSpells" label="Apneic Spells" />
                  <YesNoRadio field="respiratoryDistress" label="Respiratory Distress" />
                  <YesNoRadio field="bradycardias" label="Bradycardias" />
                  <YesNoRadio field="fastBreathing" label="Fast Breathing" />
                  <YesNoRadio field="chestIndrawing" label="Chest Indrawing" />
                  <YesNoRadio field="grunting" label="Grunting" />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="comorbidities">
              <AccordionTrigger className="text-base md:text-lg font-semibold">5. Comorbidities</AccordionTrigger>
              <AccordionContent className="space-y-4 md:space-y-6 pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  <YesNoRadio field="necrotizingEnterocolitis" label="Necrotizing Enterocolitis" />
                  <YesNoRadio field="chronicLungDisease" label="Chronic Lung Disease" />
                  <YesNoRadio field="surgicalConditions" label="Surgical Conditions" />
                  <YesNoRadio field="intraventricularHemorrhage" label="Intraventricular Hemorrhage / Shunt" />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="circulatory-system">
              <AccordionTrigger className="text-base md:text-lg font-semibold">6. Circulatory System</AccordionTrigger>
              <AccordionContent className="space-y-4 md:space-y-6 pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label>Cardiovascular Status</Label>
                    <Select onValueChange={(value) => updateFormData("cardiovascularStatus", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-inotropes-no-steroids">No inotropes & no steroids</SelectItem>
                        <SelectItem value="no-inotropes-steroids">No inotropes & steroids</SelectItem>
                        <SelectItem value="one-inotrope-steroids">One inotrope & steroids</SelectItem>
                        <SelectItem value="multiple-inotropes-or-combo">
                          ≥2 inotropes or 1 inotrope + steroids
                        </SelectItem>
                        <SelectItem value="multiple-inotropes-steroids">≥2 inotropes + steroids</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Skin Colouration</Label>
                    <Select onValueChange={(value) => updateFormData("skinColouration", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select colouration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="moderate-change">Moderate Change</SelectItem>
                        <SelectItem value="considerable-change">Considerable Change</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Microcirculation</Label>
                    <Select onValueChange={(value) => updateFormData("microcirculation", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="impaired">Impaired</SelectItem>
                        <SelectItem value="considerably-impaired">Considerably Impaired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Liver Enlargement</Label>
                    <Select onValueChange={(value) => updateFormData("liverEnlargement", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0–2</SelectItem>
                        <SelectItem value="2-4">2–4</SelectItem>
                        <SelectItem value=">4">&gt;4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Prolonged Capillary Refill Time</Label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Enter time"
                      onChange={(e) =>
                        updateFormData("prolongedCapillaryRefillTime", Number.parseFloat(e.target.value))
                      }
                    />
                  </div>

                  <YesNoRadio field="cyanosis" label="Cyanosis" />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="hematologic-immune">
              <AccordionTrigger className="text-base md:text-lg font-semibold">
                7. Hematologic & Immune System
              </AccordionTrigger>
              <AccordionContent className="space-y-4 md:space-y-6 pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label>Platelet Count</Label>
                    <Select onValueChange={(value) => updateFormData("plateletCount", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=">=150k">≥150k</SelectItem>
                        <SelectItem value="100k-150k">100k–150k</SelectItem>
                        <SelectItem value="50k-100k">50k–100k</SelectItem>
                        <SelectItem value="<50k">&lt;50k</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Total WBC Count</Label>
                    <Select onValueChange={(value) => updateFormData("totalWBCCount", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<=5000">≤5000</SelectItem>
                        <SelectItem value=">=25000-birth">≥25000 at birth</SelectItem>
                        <SelectItem value=">=30000-12-24hrs">≥30000 (12–24 hrs)</SelectItem>
                        <SelectItem value=">=21000-day2+">≥21000 (Day 2+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Total PMN Count</Label>
                    <Select onValueChange={(value) => updateFormData("totalPMNCount", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-mature-pmn">No mature PMN</SelectItem>
                        <SelectItem value="increased-decreased">Increased/Decreased</SelectItem>
                        <SelectItem value="1800-5400">1800–5400</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Immature PMN Count</Label>
                    <Select onValueChange={(value) => updateFormData("immaturePMNCount", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<=600">≤600</SelectItem>
                        <SelectItem value=">600">&gt;600</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>I:T PMN Ratio</Label>
                    <Select onValueChange={(value) => updateFormData("itPMNRatio", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<=0.120">≤0.120</SelectItem>
                        <SelectItem value=">0.120">&gt;0.120</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>I:M PMN Ratio</Label>
                    <Select onValueChange={(value) => updateFormData("imPMNRatio", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<0.3">&lt;0.3</SelectItem>
                        <SelectItem value=">=0.3">≥0.3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Degenerative PMN Changes</Label>
                    <Select onValueChange={(value) => updateFormData("degenerativePMNChanges", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="toxic-granules">Toxic Granules</SelectItem>
                        <SelectItem value="vacuolations">Vacuolations</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Shift to Left</Label>
                    <Select onValueChange={(value) => updateFormData("shiftToLeft", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-0">No (0)</SelectItem>
                        <SelectItem value="moderate-2">Moderate (2)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="metabolic-neuromuscular">
              <AccordionTrigger className="text-base md:text-lg font-semibold">
                8. Metabolic & Neuromuscular Signs
              </AccordionTrigger>
              <AccordionContent className="space-y-4 md:space-y-6 pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label>Metabolic Acidosis</Label>
                    <Select onValueChange={(value) => updateFormData("metabolicAcidosis", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="ph->=7.2">pH ≥7.2</SelectItem>
                        <SelectItem value="ph-<7.2">pH &lt;7.2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Muscular Hypotonia</Label>
                    <Select onValueChange={(value) => updateFormData("muscularHypotonia", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="hypotonic">Hypotonic</SelectItem>
                        <SelectItem value="floppy">Floppy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <YesNoRadio field="stiffLimbs" label="Stiff Limbs" />
                  <YesNoRadio field="convulsion" label="Convulsion" />
                  <YesNoRadio field="lethargy" label="Lethargy" />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="gastrointestinal">
              <AccordionTrigger className="text-base md:text-lg font-semibold">9. Gastrointestinal</AccordionTrigger>
              <AccordionContent className="space-y-4 md:space-y-6 pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  <YesNoRadio field="giSymptoms" label="GI Symptoms" />
                  <YesNoRadio field="poorFeeding" label="Poor Feeding" />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-center mt-6 md:mt-8 pt-4 md:pt-6 border-t">
            <Button
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 md:px-12 py-3 text-base md:text-lg font-semibold shadow-lg min-h-[44px]"
              size="lg"
            >
              Submit Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
