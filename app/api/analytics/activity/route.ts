import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const days = Number.parseInt(searchParams.get("days") || "30")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const activity = await DatabaseService.getDailyActivity(userId, days)
    return NextResponse.json(activity)
  } catch (error) {
    console.error("Failed to fetch daily activity:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
