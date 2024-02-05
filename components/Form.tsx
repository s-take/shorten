"use client";

import copy from "clipboard-copy";
import { State, requestShortUrl } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";

const initialState: State = {};

const CopyButton = ({ copyText }: { copyText: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    copy(copyText).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    });
  };

  return (
    <button
      className="bg-indigo-500 rounded-md px-2 py-0.5 text-white w-20"
      disabled={isCopied}
      onClick={handleCopy}
    >
      {isCopied ? "Copied!" : "Copy"}
    </button>
  );
};

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
        <div className="flex gap-4 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring">
          <div>
            {state.shortUrl === undefined ? "https://" : state.shortUrl}
          </div>
          <div>
            {state.shortUrl && <CopyButton copyText={state.shortUrl} />}
          </div>
        </div>
      </div>
    </form>
  );
}
