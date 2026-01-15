export interface ConsultationFormData {
  // Step 1: 기본 정보
  name: string;
  phone: string;
  gender: "male" | "female" | "other";
  age: string;

  // Step 2: 상담 물류
  consultationType: "face-to-face" | "video" | "phone";
  availableDays: string[];
  availableTimes: string[];

  // Step 3: 접수 면접
  concerns: string[];
  detailedSituation?: string;
  hasPsychiatricExperience: boolean;
}

export interface FormStep {
  title: string;
  description?: string;
}
