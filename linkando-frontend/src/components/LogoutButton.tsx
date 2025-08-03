// src/components/.tsx
'use client';

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition text-sm font-medium"
    >
      <FiLogOut className="w-4 h-4" />
      Sair
    </button>
  );
}
