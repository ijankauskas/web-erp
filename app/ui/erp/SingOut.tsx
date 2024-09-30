"use client"
import { PowerIcon } from "@heroicons/react/24/outline"
import { signOut } from "next-auth/react"

export function SignOut({ isOpen }: any) {

  const cerrar = (e: any) => {
    e.preventDefault()
    signOut()
  }

  return (
    <div className="p-2">
      <a
        onClick={(e) => cerrar(e)}
        className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-gray-700 p-2 "
      >
        <PowerIcon className="h-6 w-6 mr-2 text-white" aria-hidden="true" />
        {isOpen ? 'Sign Out' : ''}
      </a>
    </div>

  )


}