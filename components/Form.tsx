"use client";

import { requestShortUrl } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {};

function Submit() {
  const status = useFormStatus();
  return (
    <div className="flex items-center justify-center sm:col-span-2">
      <button
        type="submit"
        disabled={status.pending}
        className="inline-block rounded-lg bg-indigo-500 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
      >
        変換
      </button>
    </div>
  );
}

export default function Form() {
  const [state, formAction] = useFormState(requestShortUrl, initialState);

  return (
    <form action={formAction} className="mx-auto grid max-w-screen-md gap-4">
      <div className="sm:col-span-2">
        <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
          短縮したいURL
        </label>
        <input
          name="longUrl"
          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
        />
      </div>
      {state.inputErrors && <p>{state.inputErrors.longUrl}</p>}
      <Submit />
      {state.error && <p>{state.error.message}</p>}
      <div className="sm:col-span-2">
        <div className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring">
          {state.shortUrl === undefined ? "https://" : state.shortUrl}
        </div>
      </div>
    </form>
  );
}