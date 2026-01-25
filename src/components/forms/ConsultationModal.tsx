"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, ChevronRight, ChevronLeft, Check, AlertTriangle, Phone } from "lucide-react";
import { CONCERN_OPTIONS, DAY_OPTIONS, TIME_OPTIONS, GENDER_OPTIONS } from "@/constants/form-options";

const formSchema = z.object({
  // Step 1: 기본 정보
  name: z.string({ required_error: "이름을 입력해주세요" }).min(2, "이름은 2글자 이상 입력해주세요"),
  phone: z.string({ required_error: "연락처를 입력해주세요" }).regex(/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/, "올바른 연락처를 입력해주세요"),
  birthYear: z.string({ required_error: "출생연도를 입력해주세요" }).min(4, "출생연도 4자리를 입력해주세요"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "성별을 선택해주세요",
  }),
  // Step 2: 상담 방식 및 희망 일정
  consultationType: z.enum(["face-to-face", "online", "any"], {
    required_error: "상담 방식을 선택해주세요",
  }),
  preferredRegion: z.string().optional(),
  availableDays: z.array(z.string()).min(1, "가능한 요일을 선택해주세요"),
  availableTimes: z.array(z.string()).min(1, "가능한 시간대를 선택해주세요"),
  // Step 3: 호소 문제 & 스크리닝
  concerns: z.array(z.string()).min(1, "고민을 선택해주세요"),
  additionalDescription: z.string().optional(),
  hasSuicidalRisk: z.boolean(),
  hasPsychiatricTreatment: z.boolean(),
  // Step 4: 동의 - 주석 처리됨
  // agreePrivacy: z.literal(true, { errorMap: () => ({ message: "개인정보 수집 이용에 동의해주세요" }) }),
  // agreeRecording: z.boolean(),
  // agreeCancelPolicy: z.literal(true, { errorMap: () => ({ message: "취소/환불 규정을 확인해주세요" }) }),
});

type FormData = z.infer<typeof formSchema>;

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOTAL_STEPS = 3;

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availableDays: [],
      availableTimes: [],
      concerns: [],
      hasSuicidalRisk: false,
      hasPsychiatricTreatment: false,
      // Step 4 주석 처리됨
      // agreePrivacy: false as unknown as true,
      // agreeRecording: false,
      // agreeCancelPolicy: false as unknown as true,
    },
  });

  const watchedValues = watch();

  // 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];

    if (step === 1) {
      fieldsToValidate = ["name", "phone", "birthYear", "gender"];
    } else if (step === 2) {
      fieldsToValidate = ["consultationType", "availableDays", "availableTimes"];
    } else if (step === 3) {
      fieldsToValidate = ["concerns"];

      // 자살 위기 체크
      if (watchedValues.hasSuicidalRisk) {
        setShowCrisisAlert(true);
        return;
      }
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("신청 중 오류가 발생했습니다.");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitError(
        error instanceof Error ? error.message : "신청 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setIsSubmitted(false);
    setShowCrisisAlert(false);
    setSubmitError(null);
    reset();
    onClose();
  };

  const toggleArrayValue = (field: "availableDays" | "availableTimes" | "concerns", value: string) => {
    const current = watchedValues[field] || [];
    const newValue = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setValue(field, newValue, { shouldValidate: true });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Crisis Alert Modal */}
          <AnimatePresence>
            {showCrisisAlert && (
              <motion.div
                className="absolute inset-0 z-60 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-background-card rounded-2xl p-8 max-w-md mx-auto border border-divider text-center">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-bold text-text mb-4">
                    위기상담 안내
                  </h3>
                  <p className="text-text-muted mb-6 leading-relaxed">
                    자살 위기나 심각한 자해 위험이 있으신 경우,
                    <br />
                    즉각적인 전문 지원이 필요합니다.
                  </p>
                  <div className="bg-background p-4 rounded-xl mb-6">
                    <p className="text-sm text-text-muted mb-2">24시간 위기상담 전화</p>
                    <a
                      href="tel:1393"
                      className="flex items-center justify-center gap-2 text-sage text-xl font-bold"
                    >
                      <Phone className="w-5 h-5" />
                      1393 (자살예방상담전화)
                    </a>
                  </div>
                  <button
                    onClick={() => setShowCrisisAlert(false)}
                    className="text-text-muted hover:text-text transition-colors text-sm"
                  >
                    닫기
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg bg-background-dark rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] border border-divider flex flex-col"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-background-dark z-10 px-6 py-4 border-b border-divider">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sage">앤아더라이프 상담문의</span>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-text-muted" />
                </button>
              </div>

              {/* Progress bar */}
              {!isSubmitted && (
                <div className="flex gap-2">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        s <= step ? "bg-sage" : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  {/* Step 1: Basic Info */}
                  {step === 1 && !isSubmitted && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-text mb-2">
                          기본 정보
                        </h3>
                        <p className="text-text-muted text-sm">
                          상담 연락을 위해 정보를 입력해주세요.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-text-muted mb-1">
                            이름
                          </label>
                          <input
                            {...register("name")}
                            className="w-full px-4 py-3 rounded-xl border border-divider bg-background-card text-text placeholder-text-subtle focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
                            placeholder="홍길동"
                          />
                          {errors.name && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-muted mb-1">
                            연락처
                          </label>
                          <input
                            {...register("phone")}
                            className="w-full px-4 py-3 rounded-xl border border-divider bg-background-card text-text placeholder-text-subtle focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
                            placeholder="010-1234-5678"
                          />
                          {errors.phone && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-muted mb-1">
                            출생연도
                          </label>
                          <input
                            {...register("birthYear")}
                            type="number"
                            className="w-full px-4 py-3 rounded-xl border border-divider bg-background-card text-text placeholder-text-subtle focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
                            placeholder="1995"
                          />
                          {errors.birthYear && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.birthYear.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-muted mb-1">
                            성별
                          </label>
                          <div className="flex gap-3">
                            {GENDER_OPTIONS.map((option) => (
                              <label
                                key={option.value}
                                className={`flex-1 py-3 px-4 rounded-xl border-2 text-center cursor-pointer transition-all ${
                                  watchedValues.gender === option.value
                                    ? "border-sage bg-sage/20 text-sage-light"
                                    : "border-divider text-text-muted hover:border-sage/50"
                                }`}
                              >
                                <input
                                  type="radio"
                                  value={option.value}
                                  {...register("gender")}
                                  className="sr-only"
                                />
                                {option.label}
                              </label>
                            ))}
                          </div>
                          {errors.gender && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.gender.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Schedule */}
                  {step === 2 && !isSubmitted && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-text mb-2">
                          상담 방식 및 일정
                        </h3>
                        <p className="text-text-muted text-sm">
                          상담은 매주 같은 요일/시간에 진행됩니다.
                        </p>
                      </div>

                      <div className="space-y-4">
                        {/* 상담 방식 선택 */}
                        <div>
                          <label className="block text-sm font-medium text-text-muted mb-2">
                            상담 방식
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { value: "face-to-face", label: "대면" },
                              { value: "online", label: "비대면" },
                              { value: "any", label: "상관없음" },
                            ].map((option) => (
                              <label
                                key={option.value}
                                className={`py-3 px-4 rounded-xl border-2 text-center cursor-pointer transition-all ${
                                  watchedValues.consultationType === option.value
                                    ? "border-sage bg-sage/20 text-sage-light"
                                    : "border-divider text-text-muted hover:border-sage/50"
                                }`}
                              >
                                <input
                                  type="radio"
                                  value={option.value}
                                  {...register("consultationType")}
                                  className="sr-only"
                                />
                                {option.label}
                              </label>
                            ))}
                          </div>
                          {errors.consultationType && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.consultationType.message}
                            </p>
                          )}
                        </div>

                        {/* 선호 지역 (대면 선택 시) */}
                        {(watchedValues.consultationType === "face-to-face" || watchedValues.consultationType === "any") && (
                          <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">
                              선호하는 지역 (선택)
                            </label>
                            <input
                              {...register("preferredRegion")}
                              className="w-full px-4 py-3 rounded-xl border border-divider bg-background-card text-text placeholder-text-subtle focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
                              placeholder="예: 홍대, 강남 등"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-text-muted mb-2">
                            가능한 요일 (복수 선택)
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {DAY_OPTIONS.map((day) => (
                              <button
                                key={day.value}
                                type="button"
                                onClick={() => toggleArrayValue("availableDays", day.value)}
                                className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                                  watchedValues.availableDays?.includes(day.value)
                                    ? "border-sage bg-sage text-white"
                                    : "border-divider text-text-muted hover:border-sage/50"
                                }`}
                              >
                                {day.label}
                              </button>
                            ))}
                          </div>
                          {errors.availableDays && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.availableDays.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-muted mb-2">
                            가능한 시간대 (복수 선택)
                          </label>
                          <div className="space-y-2">
                            {TIME_OPTIONS.map((time) => (
                              <button
                                key={time.value}
                                type="button"
                                onClick={() => toggleArrayValue("availableTimes", time.value)}
                                className={`w-full py-3 px-4 rounded-xl border-2 text-left transition-all ${
                                  watchedValues.availableTimes?.includes(time.value)
                                    ? "border-sage bg-sage/20 text-sage-light"
                                    : "border-divider text-text-muted hover:border-sage/50"
                                }`}
                              >
                                {time.label}
                              </button>
                            ))}
                          </div>
                          {errors.availableTimes && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.availableTimes.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Concerns & Screening */}
                  {step === 3 && !isSubmitted && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-text mb-2">
                          상담 주제
                        </h3>
                        <p className="text-text-muted text-sm">
                          어떤 고민으로 상담을 원하시나요?
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-text-muted mb-2">
                            해당하는 고민을 선택해주세요 (복수 선택)
                          </label>
                          <div className="space-y-2">
                            {CONCERN_OPTIONS.map((concern) => (
                              <button
                                key={concern.value}
                                type="button"
                                onClick={() => toggleArrayValue("concerns", concern.value)}
                                className={`w-full py-3 px-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                                  watchedValues.concerns?.includes(concern.value)
                                    ? "border-sage bg-sage/20"
                                    : "border-divider hover:border-sage/50"
                                }`}
                              >
                                <div
                                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                    watchedValues.concerns?.includes(concern.value)
                                      ? "border-sage bg-sage"
                                      : "border-text-subtle"
                                  }`}
                                >
                                  {watchedValues.concerns?.includes(concern.value) && (
                                    <Check className="w-3 h-3 text-white" />
                                  )}
                                </div>
                                <span
                                  className={
                                    watchedValues.concerns?.includes(concern.value)
                                      ? "text-sage-light"
                                      : "text-text-muted"
                                  }
                                >
                                  {concern.label}
                                </span>
                              </button>
                            ))}
                          </div>
                          {errors.concerns && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.concerns.message}
                            </p>
                          )}
                        </div>

                        {/* Additional Description */}
                        <div>
                          <label className="block text-sm font-medium text-text-muted mb-2">
                            부가 설명 (선택)
                          </label>
                          <textarea
                            {...register("additionalDescription")}
                            className="w-full px-4 py-3 rounded-xl border border-divider bg-background-card text-text placeholder-text-subtle focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all resize-none h-24"
                            placeholder="상담사에게 미리 전달하고 싶은 내용이 있다면 적어주세요."
                          />
                        </div>

                        {/* Screening Questions */}
                        <div className="pt-4 border-t border-divider">
                          <p className="text-sm font-medium text-text-muted mb-4">
                            사전 확인 질문
                          </p>

                          <div className="space-y-3">
                            <label className="flex items-center gap-3 p-3 rounded-xl bg-background-card cursor-pointer">
                              <input
                                type="checkbox"
                                {...register("hasSuicidalRisk")}
                                className="w-4 h-4 rounded border-white/20 bg-background text-sage focus:ring-sage"
                              />
                              <span className="text-sm text-text-muted">
                                자살 위기나 심각한 자해 위험이 있습니다.
                              </span>
                            </label>

                            <label className="flex items-center gap-3 p-3 rounded-xl bg-background-card cursor-pointer">
                              <input
                                type="checkbox"
                                {...register("hasPsychiatricTreatment")}
                                className="w-4 h-4 rounded border-white/20 bg-background text-sage focus:ring-sage"
                              />
                              <span className="text-sm text-text-muted">
                                현재 정신과 진료 또는 약물 복용 중입니다.
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Consent - 주석 처리됨
                  {step === 4 && !isSubmitted && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-text mb-2">
                          동의 및 제출
                        </h3>
                        <p className="text-text-muted text-sm">
                          상담 진행을 위해 아래 사항에 동의해주세요.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <label className="flex items-start gap-3 p-4 rounded-xl bg-background-card cursor-pointer border border-divider-light">
                          <input
                            type="checkbox"
                            {...register("agreePrivacy")}
                            className="mt-1 w-4 h-4 rounded border-white/20 bg-background text-sage focus:ring-sage"
                          />
                          <div>
                            <span className="text-sm text-text font-medium">
                              개인정보 수집 이용 동의 (필수)
                            </span>
                            <p className="text-xs text-text-subtle mt-1">
                              상담 진행 및 연락을 위해 개인정보를 수집합니다.
                            </p>
                          </div>
                        </label>
                        {errors.agreePrivacy && (
                          <p className="text-red-400 text-sm">
                            {errors.agreePrivacy.message}
                          </p>
                        )}

                        <label className="flex items-start gap-3 p-4 rounded-xl bg-background-card cursor-pointer border border-divider-light">
                          <input
                            type="checkbox"
                            {...register("agreeRecording")}
                            className="mt-1 w-4 h-4 rounded border-white/20 bg-background text-sage focus:ring-sage"
                          />
                          <div>
                            <span className="text-sm text-text font-medium">
                              상담 녹음 및 슈퍼비전 활용 동의 (선택)
                            </span>
                            <p className="text-xs text-text-subtle mt-1">
                              상담의 질 향상을 위해 녹음 및 교육 목적으로 활용될 수 있습니다. 철저히 익명 처리됩니다.
                            </p>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 p-4 rounded-xl bg-background-card cursor-pointer border border-divider-light">
                          <input
                            type="checkbox"
                            {...register("agreeCancelPolicy")}
                            className="mt-1 w-4 h-4 rounded border-white/20 bg-background text-sage focus:ring-sage"
                          />
                          <div>
                            <span className="text-sm text-text font-medium">
                              취소/환불 규정 확인 (필수)
                            </span>
                            <p className="text-xs text-text-subtle mt-1">
                              당일 취소/노쇼 시 환불 불가, 1일 전 50%, 2일 전 100% 환불
                            </p>
                          </div>
                        </label>
                        {errors.agreeCancelPolicy && (
                          <p className="text-red-400 text-sm">
                            {errors.agreeCancelPolicy.message}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                  */}

                  {/* Submitted */}
                  {isSubmitted && (
                    <motion.div
                      key="submitted"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6 text-center py-8"
                    >
                      <motion.div
                        className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto border border-sage/30"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                      >
                        <Check className="w-10 h-10 text-sage" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-text">
                        신청이 완료되었습니다.
                      </h3>
                      <p className="text-text-muted">
                        담당 상담사가
                        <br />
                        <span className="font-medium text-sage">
                          48시간 내로
                        </span>{" "}
                        연락드릴 예정입니다.
                      </p>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="btn-primary"
                      >
                        확인
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer buttons */}
              {!isSubmitted && (
                <div className="flex-shrink-0 bg-background-dark border-t border-divider px-6 py-4">
                  {submitError && (
                    <p className="text-red-400 text-sm mb-3 text-center">
                      {submitError}
                    </p>
                  )}
                  <div className="flex gap-3">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-1 px-6 py-3 rounded-xl border border-divider text-text-muted hover:bg-white/5 transition-colors disabled:opacity-50"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        이전
                      </button>
                    )}
                    {step < TOTAL_STEPS ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex-1 flex items-center justify-center gap-1 py-3 rounded-xl bg-sage hover:bg-sage-dark text-white font-medium transition-colors"
                      >
                        다음
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3 rounded-xl bg-sage hover:bg-sage-dark text-white font-semibold transition-colors glow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "신청 중..." : "신청 완료"}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
