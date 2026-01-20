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

export async function POST(request: NextRequest) {
  console.log("=== Consultation API Called ===");

  try {
    const data: ConsultationData = await request.json();
    console.log("Received data:", JSON.stringify(data, null, 2));

    const BASEROW_API_TOKEN = process.env.BASEROW_API_TOKEN;
    const BASEROW_TABLE_ID = process.env.BASEROW_TABLE_ID;

    console.log("ENV Check - Token exists:", !!BASEROW_API_TOKEN);
    console.log("ENV Check - Table ID:", BASEROW_TABLE_ID);

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
