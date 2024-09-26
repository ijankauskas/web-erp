'use client'
import { useEffect, useState } from "react";
import ButtonCommon from "../ButtonCommon";
import { DbConsultarListasCabe } from "@/app/lib/data";

export default function Paginado({ pagina, cambiarPagina }: any) {
    const [mostrando, setMostrando] = useState('Cargando...');
    const [totalClientes, setTotalClientes] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalxPagina, setTotalxPagina] = useState(50);

    useEffect(() => {
        cargarComponente();
    }, []);

    useEffect(() => {   
        const start = (pagina - 1) * totalxPagina + 1;
        const end = Math.min(pagina * totalxPagina, totalClientes);

        const message = `Mostrando ${start} - ${end} de ${totalClientes}`;
        setMostrando(message)
    }, [pagina]);

    async function cargarComponente() {
        const respuesta = await DbConsultarListasCabe(null);
        const data = await respuesta.json();
        if (!respuesta.ok) {
            throw new Error('Error al cargar las listas');
        }

        setTotalClientes(data.total)
        let total = data.total
        const start = (pagina - 1) * totalxPagina + 1;
        const end = Math.min(pagina * totalxPagina, total);
        setTotalPages(Math.ceil(total / totalxPagina));

        const message = `Mostrando ${start} - ${end} de ${total}`;
        setMostrando(message)
    }

    return (
        <nav className="flex items-center justify-between w-full p-4">
            <div className="text-sm text-ellipsis truncate">
                {mostrando}
            </div>
            <div className="text-sm flex items-center justify-end">
                <div className="mr-4">
                    <ButtonCommon
                        texto={"Anterior"}
                        onClick={() => cambiarPagina(-1)}
                        type={"button"}
                        desactivado={pagina == 1 ? true : false}
                    />
                </div>
                <div>
                    <ButtonCommon
                        texto={"Próximo"}
                        onClick={() => cambiarPagina(1)}
                        type={"button"}
                        desactivado={pagina == totalPages ? true : false}
                    />
                </div>
            </div>
        </nav>
    )
}