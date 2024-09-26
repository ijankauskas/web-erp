"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { DbConsultarUsuario } from "../lib/data";

// Definir el tipo de usuario
interface UserContextType {
  user: any;
  setUser: (user: any) => void;
}

// Crear el contexto del usuario
const UserContext = createContext<UserContextType | undefined>(undefined);

// Proveedor de usuario
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>();

  // Mover consultarUsuario fuera del hook para evitar redefinirla en cada render
  const consultarUsuario = async () => {
    if (session) {
      const response = await DbConsultarUsuario(session.user?.email);
      const data = await response.json();
      setUser(data); // Actualizar el estado del usuario cuando la sesión cambia
    }
  };

  useEffect(() => {
    if (session && !user) {
      consultarUsuario(); // Solo se ejecuta si hay una sesión y el usuario no está cargado
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acceder al contexto del usuario
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser debe estar dentro de un UserProvider");
  }
  return context;
};
