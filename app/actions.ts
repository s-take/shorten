"use server";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import type { Database } from "@/database.types";
import * as base62 from "base62-ts";

type Url = Database["public"]["Tables"]["urls"]["Row"];

const schema = z.object({
  longUrl: z.string().url(),
});

export async function requestShortUrl(
  prevState: {
    shortUrl?: string;
    error?: { message: string; status: number };
    inputErrors?: { longUrl: string };
  },
  formData: FormData
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const longUrl = formData.get("longUrl");
  try {
    const { data: selectData, error: selectError } = await supabase
      .from("urls")
      .select()
      .eq("url", longUrl);

    if (selectData && selectData?.length !== 0) {
      const url: Url = selectData[0];
      return {
        shortUrl:
          "https://" + process.env.NEXT_PUBLIC_DOMAIN + "/" + url.short_id,
      };
    }

    const { data, error } = await supabase
      .from("urls")
      .insert({ url: longUrl })
      .select();
    if (error !== null) {
      throw error;
    }
    const url: Url = data[0];
    const shortId = base62.encode(url.id + 100000000000);
    const { error: updateError } = await supabase
      .from("urls")
      .update({ short_id: shortId })
      .eq("id", url.id);
    if (updateError !== null) {
      throw error;
    }
    // return { res };
    return {
      shortUrl: "https://" + process.env.NEXT_PUBLIC_DOMAIN + "/" + shortId,
    };
  } catch (e) {
    console.log(e);
    if (e instanceof z.ZodError) {
      return { inputErrors: { longUrl: "URLの形式が不正です" } };
    }
    return {
      error: {
        message: "エラーが発生しました",
        status: 500,
      },
    };
  }
  //   try {
  //     await doSomething();
  //     return { message: null };
  //   } catch (e) {
  //     return { message: "Something went wrong" };
  //   }
}