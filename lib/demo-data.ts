/**
 * Demo/Fallback Data for Firebase Quota Limitations
 * This data will be used when Firebase quota is exceeded
 */

export const demoHospitals = [
  { id: 'HOSP_KARNATAKA_1', name: 'Bangalore Medical College and Research Institute', state: 'Karnataka', address: 'Bangalore, Karnataka', totalBeds: 1200, nicuBeds: 0, contactNumber: '+91-XXXXXXXXXX', createdAt: new Date() },
  { id: 'HOSP_KARNATAKA_2', name: 'St Johns Medical College Hospital', state: 'Karnataka', address: 'Bangalore, Karnataka', totalBeds: 800, nicuBeds: 0, contactNumber: '+91-XXXXXXXXXX', createdAt: new Date() },
  { id: 'HOSP_MAHARASHTRA_1', name: 'KEM Hospital', state: 'Maharashtra', address: 'Mumbai, Maharashtra', totalBeds: 1500, nicuBeds: 0, contactNumber: '+91-XXXXXXXXXX', createdAt: new Date() },
  { id: 'HOSP_MAHARASHTRA_2', name: 'Sassoon General Hospital', state: 'Maharashtra', address: 'Pune, Maharashtra', totalBeds: 1000, nicuBeds: 0, contactNumber: '+91-XXXXXXXXXX', createdAt: new Date() },
  { id: 'HOSP_DELHI_1', name: 'AIIMS Delhi', state: 'Delhi', address: 'New Delhi, Delhi', totalBeds: 2500, nicuBeds: 0, contactNumber: '+91-XXXXXXXXXX', createdAt: new Date() },
  { id: 'HOSP_DELHI_2', name: 'Safdarjung Hospital', state: 'Delhi', address: 'New Delhi, Delhi', totalBeds: 1800, nicuBeds: 0, contactNumber: '+91-XXXXXXXXXX', createdAt: new Date() },
  { id: 'HOSP_TAMILNADU_1', name: 'Stanley Medical College', state: 'Tamil Nadu', address: 'Chennai, Tamil Nadu', totalBeds: 900, nicuBeds: 0, contactNumber: '+91-XXXXXXXXXX', createdAt: new Date() },
  { id: 'HOSP_TAMILNADU_2', name: 'Madras Medical College', state: 'Tamil Nadu', address: 'Chennai, Tamil Nadu', totalBeds: 1100, nicuBeds: 0, contactNumber: '+91-XXXXXXXXXX', createdAt: new Date() },
  { id: 'HOSP_WEST_BENGAL_1', name: 'Medical College Kolkata', state: 'West Bengal', address: 'Kolkata, West Bengal', totalBeds: 1400, nicuBeds: 0, contactNumber: '+91-XXXXXXXXXX', createdAt: new Date() },
  { id: 'HOSP_GUJARAT_1', name: 'Civil Hospital Ahmedabad', state: 'Gujarat', address: 'Ahmedabad, Gujarat', totalBeds: 1300, nicuBeds: 0, contactNumber: '+91-XXXXXXXXXX', createdAt: new Date() },
  { id: 'HOSP_RAJASTHAN_1', name: 'SMS Hospital', state: 'Rajasthan', address: 'Jaipur, Rajasthan', totalBeds: 1600, nicuBeds: 0, contactNumber: '+91-XXXXXXXXXX', createdAt: new Date() },
  { id: 'HOSP_TELANGANA_1', name: 'Gandhi Hospital', state: 'Telangana', address: 'Hyderabad, Telangana', totalBeds: 1000, nicuBeds: 0, contactNumber: '+91-XXXXXXXXXX', createdAt: new Date() },
  { id: 'HOSP_UTTAR_PRADESH_1', name: 'King Georges Medical University', state: 'Uttar Pradesh', address: 'Lucknow, Uttar Pradesh', totalBeds: 1200, nicuBeds: 0, contactNumber: '+91-XXXXXXXXXX', createdAt: new Date() },
  { id: 'HOSP_PUNJAB_1', name: 'Government Medical College Patiala', state: 'Punjab', address: 'Patiala, Punjab', totalBeds: 700, nicuBeds: 0, contactNumber: '+91-XXXXXXXXXX', createdAt: new Date() },
  { id: 'HOSP_KERALA_1', name: 'Medical College Thiruvananthapuram', state: 'Kerala', address: 'Thiruvananthapuram, Kerala', totalBeds: 850, nicuBeds: 0, contactNumber: '+91-XXXXXXXXXX', createdAt: new Date() },
];

export const demoDoctors = [
  { uid: 'DOC_1', name: 'Dr. Rajesh Kumar', email: 'rajesh@hospital.in', role: 'CLINICIAN', state: 'Karnataka', hospitalId: 'HOSP_KARNATAKA_1', createdAt: new Date(), updatedAt: new Date() },
  { uid: 'DOC_2', name: 'Dr. Priya Sharma', email: 'priya@hospital.in', role: 'CLINICIAN', state: 'Maharashtra', hospitalId: 'HOSP_MAHARASHTRA_1', createdAt: new Date(), updatedAt: new Date() },
  { uid: 'DOC_3', name: 'Dr. Amit Patel', email: 'amit@hospital.in', role: 'CLINICIAN', state: 'Gujarat', hospitalId: 'HOSP_GUJARAT_1', createdAt: new Date(), updatedAt: new Date() },
  { uid: 'DOC_4', name: 'Dr. Sunita Singh', email: 'sunita@hospital.in', role: 'CLINICIAN', state: 'Delhi', hospitalId: 'HOSP_DELHI_1', createdAt: new Date(), updatedAt: new Date() },
  { uid: 'DOC_5', name: 'Dr. Mohammed Ali', email: 'ali@hospital.in', role: 'CLINICIAN', state: 'Tamil Nadu', hospitalId: 'HOSP_TAMILNADU_1', createdAt: new Date(), updatedAt: new Date() },
];

export const demoPatients = [
  { id: 'PAT_1', name: 'Baby A', age: 0.1, gender: 'Male', state: 'Karnataka', hospitalId: 'HOSP_KARNATAKA_1', assignedDoctorId: 'DOC_1', status: 'Admitted', condition: 'Stable', admissionDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
  { id: 'PAT_2', name: 'Baby B', age: 0.05, gender: 'Female', state: 'Maharashtra', hospitalId: 'HOSP_MAHARASHTRA_1', assignedDoctorId: 'DOC_2', status: 'Critical', condition: 'Critical', admissionDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
  { id: 'PAT_3', name: 'Baby C', age: 0.08, gender: 'Male', state: 'Gujarat', hospitalId: 'HOSP_GUJARAT_1', assignedDoctorId: 'DOC_3', status: 'Admitted', condition: 'Stable', admissionDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
  { id: 'PAT_4', name: 'Baby D', age: 0.12, gender: 'Female', state: 'Delhi', hospitalId: 'HOSP_DELHI_1', assignedDoctorId: 'DOC_4', status: 'Critical', condition: 'Critical', admissionDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
];

export const demoDiagnoses = [
  {
    id: 'DIAG_1',
    patientId: 'PAT_1',
    patientName: 'Baby A',
    doctorId: 'DOC_1',
    doctorName: 'Dr. Rajesh Kumar',
    hospitalId: 'HOSP_KARNATAKA_1',
    state: 'Karnataka',
    diagnosisType: 'Neonatal Sepsis',
    severity: 'Moderate',
    diagnosisSummary: 'Suspected neonatal sepsis',
    detailedNotes: 'Patient showing signs of infection',
    status: 'Active',
    diagnosisDate: new Date(),
    mlPrediction: { riskScore: 0.72, confidence: 0.85, predictedOutcome: 'High Risk' }
  },
  {
    id: 'DIAG_2',
    patientId: 'PAT_2',
    patientName: 'Baby B',
    doctorId: 'DOC_2',
    doctorName: 'Dr. Priya Sharma',
    hospitalId: 'HOSP_MAHARASHTRA_1',
    state: 'Maharashtra',
    diagnosisType: 'Respiratory Distress',
    severity: 'Critical',
    diagnosisSummary: 'Severe respiratory distress syndrome',
    detailedNotes: 'Requires immediate intervention',
    status: 'Active',
    diagnosisDate: new Date(),
    mlPrediction: { riskScore: 0.89, confidence: 0.92, predictedOutcome: 'Critical Risk' }
  },
];

export function getDemoStats() {
  return {
    totalHospitals: demoHospitals.length,
    totalDoctors: demoDoctors.length,
    totalPatients: demoPatients.length,
    criticalPatients: demoPatients.filter(p => p.condition === 'Critical').length,
    totalBeds: demoHospitals.reduce((sum, h) => sum + h.totalBeds, 0),
    totalNicuBeds: demoHospitals.reduce((sum, h) => sum + h.nicuBeds, 0),
    occupiedBeds: Math.floor(demoHospitals.reduce((sum, h) => sum + h.totalBeds, 0) * 0.65),
    bedOccupancyRate: 65
  };
}
