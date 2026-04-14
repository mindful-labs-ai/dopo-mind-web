import { NextRequest, NextResponse } from "next/server";

interface ConsultationData {
  name: string;
  phone: string;
  birthYear: string;
  gender: string;
  consultationType: string;
  preferredRegion?: string;
  availableDays: string[];
  availableTimes: string[];
  concerns: string[];
  additionalDescription?: string;
  hasSuicidalRisk: boolean;
  hasPsychiatricTreatment: boolean;
}

function sendSlackNotification(data: ConsultationData) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const text = [
    "[새로운 상담 문의가 도착했습니다! :bell:]",
    "",
    `- 이름: ${data.name}`,
    `- 연락처: ${data.phone}`,
    `- 성별: ${data.gender}`,
    `- 생년월일: ${data.birthYear}`,
    "",
    `- 상담 방식: ${data.consultationType}`,
    `- 지역: ${data.preferredRegion || ""}`,
    `- 시간: ${data.availableTimes.join(", ")}`,
    `- 요일: ${data.availableDays.join(", ")}`,
    "",
    `- 고민 내용: ${data.concerns.join(", ")}`,
    `- 세부 내용: ${data.additionalDescription || ""}`,
  ].join("\n");

  const message = { text };

  fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  }).catch((error) => {
    console.error("Slack notification failed:", error);
  });
}

export async function POST(request: NextRequest) {
  try {
    const data: ConsultationData = await request.json();

    const BASEROW_API_TOKEN = process.env.BASEROW_API_TOKEN;
    const BASEROW_TABLE_ID = process.env.BASEROW_TABLE_ID;

    if (!BASEROW_API_TOKEN || !BASEROW_TABLE_ID) {
      console.error("Missing Baserow environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const baserowPayload = {
      name: data.name,
      phone: data.phone,
      birthYear: data.birthYear,
      gender: data.gender,
      consultationType: data.consultationType,
      preferredRegion: data.preferredRegion || "",
      availableDays: data.availableDays.join(", "),
      availableTimes: data.availableTimes.join(", "),
      concerns: data.concerns.join(", "),
      additionalDescription: data.additionalDescription || "",
      hasSuicidalRisk: data.hasSuicidalRisk,
      hasPsychiatricTreatment: data.hasPsychiatricTreatment,
      createdAt: new Date().toISOString(),
    };

    const response = await fetch(
      `https://api.baserow.io/api/database/rows/table/${BASEROW_TABLE_ID}/?user_field_names=true`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${BASEROW_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(baserowPayload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Baserow API error:", errorText);
      return NextResponse.json(
        { error: "Failed to save consultation" },
        { status: response.status }
      );
    }

    const result = await response.json();

    // Slack 알림 (fire-and-forget: 실패해도 사용자 응답에 영향 없음)
    sendSlackNotification(data);

    return NextResponse.json(
      { success: true, id: result.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Consultation API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
