import { getAccessToken } from "@/action/mcv";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const code = params.get("code");

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  await getAccessToken(code);
  redirect(process.env.HOST! + "/th");
}
