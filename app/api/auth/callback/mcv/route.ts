import { getAccessToken } from "@/action/mcv";
import { checkIsOnBoard } from "@/action/onboard";
import { concatLocale } from "@/lib/locale";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const code = params.get("code");

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  try {
    await getAccessToken(code);
  } catch (err) {
    console.log(err);
    redirect("/auth");
  }

  const isOnBoard = await checkIsOnBoard();
  if (!isOnBoard) {
    redirect("/onboard");
  }
  redirect(concatLocale("/", req).toString());
}
