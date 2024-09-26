"use client"
import { signOut } from "next-auth/react"

export function SignOut() {

  const cerrar = (e: any) => {
    e.preventDefault()
    signOut()
  }
  
  return (
    <a
      onClick={(e) => cerrar(e)}
      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
    >
      Sign Out
    </a>

  )


}