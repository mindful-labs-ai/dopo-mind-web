export interface ConsultationFormData {
  // Step 1: 기본 정보
  name: string;
  phone: string;
  birthYear: string;
  gender: "male" | "female" | "other";

  // Step 2: 상담 방식 및 희망 일정
  consultationType: "face-to-face" | "online" | "any";
  preferredRegion?: string;
  availableDays: string[];
  availableTimes: string[];

  // Step 3: 호소 문제 & 스크리닝
  concerns: string[];
  additionalDescription?: string;
  hasSuicidalRisk: boolean;
  hasPsychiatricTreatment: boolean;

  // Step 4: 동의
  agreePrivacy: boolean;
  agreeRecording: boolean;
  agreeCancelPolicy: boolean;
}

export interface FormStep {
  title: string;
  description?: string;
}
