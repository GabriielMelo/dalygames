"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { BsSearch } from "react-icons/bs";
export default function Input() {
  const [input, setInput] = useState("");
  const router = useRouter();

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    if (input === "") return;
    router.push(`/game/search/${input}`);
  }
  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-2"
      >
        <input
          type="text"
          placeholder="Procurando algum jogo? ... "
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          className="bg-slate-200 outline-none w-11/12"
        />
        <button type="submit">
          <BsSearch size={22} color="#ea580c" />
        </button>
      </form>
    </div>
  );
}
