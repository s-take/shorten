import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import type { Database } from "@/database.types";

type Url = Database["public"]["Tables"]["urls"]["Row"];

export async function GET(
  req: NextRequest,
  { params }: { params: { shortId: string } }
) {
  const shortId = params.shortId;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("urls")
    .select()
    .eq("short_id", shortId);

  if (data && data.length !== 0) {
    const url: Url = data[0];
    return NextResponse.redirect(url.url, { status: 302 });
  }
  return NextResponse.redirect("https://www.google.co.jp/", { status: 302 });
}
