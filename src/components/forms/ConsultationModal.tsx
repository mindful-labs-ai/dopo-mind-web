"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, ChevronRight, ChevronLeft, Check, Users, Video, Phone } from "lucide-react";
import { CONCERN_OPTIONS, DAY_OPTIONS, TIME_OPTIONS } from "@/constants/form-options";

const formSchema = z.object({
  name: z.string({ required_error: "이름을 입력해주세요" }).min(2, "이름은 2글자 이상 입력해주세요"),
  phone: z.string({ required_error: "연락처를 입력해주세요" }).regex(/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/, "올바른 연락처를 입력해주세요"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "성별을 선택해주세요",
    invalid_type_error: "성별을 선택해주세요"
  }),
  age: z.string({ required_error: "나이를 입력해주세요" }).min(1, "나이를 입력해주세요"),
  consultationType: z.enum(["face-to-face", "video", "phone"], {
    required_error: "상담 방식을 선택해주세요",
    invalid_type_error: "상담 방식을 선택해주세요"
  }),
  preferredRegion: z.string().optional(),
  availableDays: z.array(z.string()).min(1, "가능한 요일을 선택해주세요"),
  availableTimes: z.array(z.string()).min(1, "가능한 시간대를 선택해주세요"),
  concerns: z.array(z.string()).min(1, "고민을 선택해주세요"),
  detailedSituation: z.string().optional(),
  hasPsychiatricExperience: z.boolean({ required_error: "선택해주세요" }),
});

type FormData = z.infer<typeof formSchema>;

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOTAL_STEPS = 4;

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      hasPsychiatricExperience: false,
    },
  });

  const watchedValues = watch();

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];

    if (step === 1) {
      fieldsToValidate = ["name", "phone", "gender", "age"];
    } else if (step === 2) {
      fieldsToValidate = ["consultationType", "availableDays", "availableTimes"];
    } else if (step === 3) {
      fieldsToValidate = ["concerns", "hasPsychiatricExperience"];
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
    console.log("Form submitted:", data);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setStep(1);
    setIsSubmitted(false);
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

  const consultationTypeIcons = {
    "face-to-face": Users,
    "video": Video,
    "phone": Phone,
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

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg bg-background-dark rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] border border-white/10 flex flex-col"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-background-dark z-10 px-6 py-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🫂</span>
                  <span className="font-bold text-dopo-purple">도포의 마음</span>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Progress bar */}
              {!isSubmitted && (
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((s) => (
                    <div
                      key={s}
                      className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? "bg-dopo-purple" : "bg-white/10"
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
                        <h3 className="text-xl font-bold text-white mb-2">
                          반가워요! 👋
                        </h3>
                        <p className="text-gray-400">
                          연락받으실 정보를 알려주세요.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            이름
                          </label>
                          <input
                            {...register("name")}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-background-card text-white placeholder-gray-500 focus:border-dopo-purple focus:ring-2 focus:ring-dopo-purple/20 outline-none transition-all"
                            placeholder="홍길동"
                          />
                          {errors.name && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            연락처
                          </label>
                          <input
                            {...register("phone")}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-background-card text-white placeholder-gray-500 focus:border-dopo-purple focus:ring-2 focus:ring-dopo-purple/20 outline-none transition-all"
                            placeholder="010-1234-5678"
                          />
                          {errors.phone && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            성별
                          </label>
                          <div className="flex gap-3">
                            {[
                              { value: "male", label: "남성" },
                              { value: "female", label: "여성" },
                              { value: "other", label: "기타" },
                            ].map((option) => (
                              <label
                                key={option.value}
                                className={`flex-1 py-3 px-4 rounded-xl border-2 text-center cursor-pointer transition-all ${watchedValues.gender === option.value
                                    ? "border-dopo-purple bg-dopo-purple/20 text-dopo-purple-light"
                                    : "border-white/10 text-gray-400 hover:border-dopo-purple/50"
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

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            나이
                          </label>
                          <input
                            {...register("age")}
                            type="number"
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-background-card text-white placeholder-gray-500 focus:border-dopo-purple focus:ring-2 focus:ring-dopo-purple/20 outline-none transition-all"
                            placeholder="25"
                          />
                          {errors.age && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.age.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Consultation Logistics */}
                  {step === 2 && !isSubmitted && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          편안한 상담을 위해 🌿
                        </h3>
                        <p className="text-gray-400">
                          환경을 선택해주세요.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            선호하는 상담 방식
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { value: "face-to-face", label: "대면" },
                              { value: "video", label: "화상" },
                              { value: "phone", label: "전화" },
                            ].map((option) => {
                              const Icon = consultationTypeIcons[option.value as keyof typeof consultationTypeIcons];
                              return (
                                <label
                                  key={option.value}
                                  className={`flex flex-col items-center gap-2 py-4 px-3 rounded-xl border-2 cursor-pointer transition-all ${watchedValues.consultationType === option.value
                                      ? "border-dopo-purple bg-dopo-purple/20 text-dopo-purple-light"
                                      : "border-white/10 text-gray-400 hover:border-dopo-purple/50"
                                    }`}
                                >
                                  <input
                                    type="radio"
                                    value={option.value}
                                    {...register("consultationType")}
                                    className="sr-only"
                                  />
                                  <Icon className="w-6 h-6" />
                                  <span className="text-sm font-medium">
                                    {option.label}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                          {errors.consultationType && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.consultationType.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            선호하는 지역
                          </label>
                          <input
                            {...register("preferredRegion")}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-background-card text-white placeholder-gray-500 focus:border-dopo-purple focus:ring-2 focus:ring-dopo-purple/20 outline-none transition-all"
                            placeholder="예: 서울, 경기 수원 등 / 비대면의 경우 생략 가능"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            가능한 요일 (복수 선택)
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {DAY_OPTIONS.map((day) => (
                              <button
                                key={day.value}
                                type="button"
                                onClick={() => toggleArrayValue("availableDays", day.value)}
                                className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${watchedValues.availableDays?.includes(day.value)
                                    ? "border-dopo-purple bg-dopo-purple text-white"
                                    : "border-white/10 text-gray-400 hover:border-dopo-purple/50"
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
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            가능한 시간대 (복수 선택)
                          </label>
                          <div className="space-y-2">
                            {TIME_OPTIONS.map((time) => (
                              <button
                                key={time.value}
                                type="button"
                                onClick={() => toggleArrayValue("availableTimes", time.value)}
                                className={`w-full py-3 px-4 rounded-xl border-2 text-left transition-all ${watchedValues.availableTimes?.includes(time.value)
                                    ? "border-dopo-purple bg-dopo-purple/20 text-dopo-purple-light"
                                    : "border-white/10 text-gray-400 hover:border-dopo-purple/50"
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

                  {/* Step 3: Intake Interview */}
                  {step === 3 && !isSubmitted && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          어떤 고민 때문에 💜
                        </h3>
                        <p className="text-gray-400">
                          도포를 찾아오셨나요?
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            해당하는 고민을 선택해주세요 (복수 선택)
                          </label>
                          <div className="space-y-2">
                            {CONCERN_OPTIONS.map((concern) => (
                              <button
                                key={concern.value}
                                type="button"
                                onClick={() => toggleArrayValue("concerns", concern.value)}
                                className={`w-full py-3 px-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${watchedValues.concerns?.includes(concern.value)
                                    ? "border-dopo-purple bg-dopo-purple/20"
                                    : "border-white/10 hover:border-dopo-purple/50"
                                  }`}
                              >
                                <div
                                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${watchedValues.concerns?.includes(concern.value)
                                      ? "border-dopo-purple bg-dopo-purple"
                                      : "border-gray-500"
                                    }`}
                                >
                                  {watchedValues.concerns?.includes(concern.value) && (
                                    <Check className="w-3 h-3 text-white" />
                                  )}
                                </div>
                                <span
                                  className={
                                    watchedValues.concerns?.includes(concern.value)
                                      ? "text-dopo-purple-light"
                                      : "text-gray-400"
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

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            구체적인 상황 (선택사항)
                          </label>
                          <textarea
                            {...register("detailedSituation")}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-background-card text-white placeholder-gray-500 focus:border-dopo-purple focus:ring-2 focus:ring-dopo-purple/20 outline-none transition-all resize-none h-24"
                            placeholder="짧게 적어주시면 매칭에 도움이 돼요."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            정신건강의학과 진료 경험이 있으신가요?
                          </label>
                          <div className="flex gap-3">
                            {[
                              { value: true, label: "네" },
                              { value: false, label: "아니오" },
                            ].map((option) => (
                              <button
                                key={String(option.value)}
                                type="button"
                                onClick={() =>
                                  setValue("hasPsychiatricExperience", option.value, {
                                    shouldValidate: true,
                                  })
                                }
                                className={`flex-1 py-3 px-4 rounded-xl border-2 text-center transition-all ${watchedValues.hasPsychiatricExperience === option.value
                                    ? "border-dopo-purple bg-dopo-purple/20 text-dopo-purple-light"
                                    : "border-white/10 text-gray-400 hover:border-dopo-purple/50"
                                  }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Submit */}
                  {step === 4 && !isSubmitted && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6 text-center py-8"
                    >
                      <div className="text-6xl mb-4">🎉</div>
                      <h3 className="text-xl font-bold text-white">
                        거의 다 왔어요!
                      </h3>
                      <p className="text-gray-400">
                        아래 버튼을 눌러 신청을 완료해주세요.
                      </p>
                    </motion.div>
                  )}

                  {/* Submitted */}
                  {isSubmitted && (
                    <motion.div
                      key="submitted"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6 text-center py-8"
                    >
                      <motion.div
                        className="w-20 h-20 bg-dopo-purple/20 rounded-full flex items-center justify-center mx-auto border border-dopo-purple/30"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                      >
                        <Check className="w-10 h-10 text-dopo-purple" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white">
                        신청이 완료되었어요! 💜
                      </h3>
                      <p className="text-gray-400">
                        담당 매니저가
                        <br />
                        <span className="font-medium text-dopo-purple">
                          24시간 내로
                        </span>{" "}
                        연락드릴게요.
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
                <div className="flex-shrink-0 bg-background-dark border-t border-white/10 px-6 py-4">
                  <div className="flex gap-3">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center justify-center gap-1 px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        이전
                      </button>
                    )}
                    {step < TOTAL_STEPS ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex-1 flex items-center justify-center gap-1 py-3 rounded-xl bg-dopo-purple hover:bg-dopo-purple-dark text-white font-medium transition-colors"
                      >
                        다음
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="flex-1 py-3 rounded-xl bg-dopo-purple hover:bg-dopo-purple-dark text-white font-semibold transition-colors glow-sm"
                      >
                        제출하기
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
