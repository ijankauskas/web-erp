let produccion = true;
let url = '';
if (produccion) {
    url = 'https://api.ecomsolver.com.ar'
} else {
    url = 'http://localhost:8080'
}

export async function DbConsultarArticulo(
    cod_articulo?: string | null,
    multiple?: string | null,
    descripcion?: string | null,
    columnaOrden?: string | null,
    dir?: string | null,
    page?: any | null,
    limit?: any | null,
    activos?: string | null,
    total?: string | null,
) {

    try {
        const response = await fetch(url + '/articulos?codigo=' + cod_articulo + '&multiple=' + multiple + '&descripcion=' + descripcion + '&columnaOrden=' + columnaOrden + '&dir=' + dir + '&page=' + page + '&limit=' + limit + '&activos=' + activos + '&total=' + total, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }

}

export async function DbGrabartarArticulo(data: string | null) {
    try {
        const response = await fetch(url + '/articulos', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

export async function DbGrabartarProveedor(data: string | null) {
    try {
        const response = await fetch(url + '/proveedores', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}


export async function DbConsultarProveedor(
    codigo: number | null,
    multiple?: string | null,
    razon?: string | null,
    columnaOrden?: string | null,
    dir?: string | null,
    page?: number | null,
    limit?: string | null,
    activos?: string | null,
) {
    try {
        const response = await fetch(url + '/proveedores?codigo=' + codigo + '&multiple=' + multiple + '&razon=' + razon + '&orden=' + columnaOrden + '&dir=' + dir + '&page=' + page + '&limit=' + limit + '&activos=' + activos, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}


export async function DbSingIn(data: any) {
    try {
        const response = await fetch(url + '/signIn', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}


export async function DbConsultarCliente(
    codigo: number | null,
    multiple?: string | null,
    razon?: string | null,
    columnaOrden?: string | null,
    dir?: string | null,
    page?: number | null,
    limit?: string | null,
    activos?: string | null,
) {
    try {
        const response = await fetch(url + '/clientes?codigo=' + codigo + '&multiple=' + multiple + '&razon=' + razon + '&orden=' + columnaOrden + '&dir=' + dir + '&page=' + page + '&limit=' + limit + '&activos=' + activos, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

export async function DbGrabartarCliente(data: string | null) {
    try {
        const response = await fetch(url + '/clientes', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}

export async function DbGrabartarFactura(data: string | null) {
    try {
        const response = await fetch(url + '/facturas', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}

export async function DbCompEmitidosConsul(
    cliente: string | null,
    pagina?: any | null,
    columnaOrden?: string | null,
    dir?: string | null,
    fechaDesde?: string | null,
    fechaHasta?: string | null,
    tipos?: string | null,
) {
    try {
        const response = await fetch(`${url}/comp_emitidos?cliente=${cliente}&pagina=${pagina}&orden=${columnaOrden}&dir=${dir}&fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&tipos=${tipos}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}

export async function DbSaldosClientes(
    servicio: string | null,
    pagina?: string | null,
    parametro?: string | null,
    columnaOrden?: string | null,
    dir?: string | null,
    cliente?: string | null,
) {
    try {
        const response = await fetch(url + '/saldos_clientes?servicio=' + servicio + '&pagina=' + pagina + '&parametro=' + parametro + '&orden=' + columnaOrden + '&dir=' + dir + '&cliente=' + cliente, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}
export async function DbValoresConsul(
    activos: string | null,
) {
    try {
        const response = await fetch(url + '/valores?activo=' + activos, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}


export async function DbMonedasConsul() {
    try {
        const response = await fetch(url + '/monedas', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}

export async function DbCompConsul(activo?: string, tipo?: string) {
    try {
        const response = await fetch(url + '/comp?tipo=' + tipo + '&activo=' + activo, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}
export async function imprimirPDF(tipoReporte: string, tipo?: string, num?: number) {
    try {
        const response = await fetch(`${url}/imprimirPDF?tipoReporte=${tipoReporte}&tipo=${tipo}&num=${num}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/pdf',
            }
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}
export async function DbGrabarNotaCredito(data: string | null) {
    try {
        const response = await fetch(url + '/nota_credito', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}

export async function DbGrabarComp(data: string | null) {
    try {
        const response = await fetch(url + '/comp', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

export async function DbBorrarComp(data: string | null) {
    try {
        const response = await fetch('http://localhost:8080/comp', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}

export async function DbBorrarArticulo(data: any | null) {
    try {
        const response = await fetch('http://localhost:8080/articulos', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}

export async function DbBorrarCliente(data: any | null) {
    try {
        const response = fetch(url + '/clientes', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}


export async function DbBorrarProveedor(data: any | null) {
    try {
        const response = await fetch('http://localhost:8080/proveedores', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}
export async function DbConsultarListasCabe(
    lista_codi: string | null,
    multiple?: string | null,
    lista_descrip?: string | null,
    columnaOrden?: string | null,
    dir?: string | null,
    page?: number | null,
    limit?: string | null,
    activos?: string | null,
    mostrar_total?: string | null
) {
    try {
        const response = await fetch(url + '/listas_cabe?lista_codi=' + lista_codi + '&multiple=' + multiple + '&lista_descrip=' + lista_descrip + '&orden=' + columnaOrden + '&dir=' + dir + '&page=' + page + '&limit=' + limit + '&activos=' + activos + '&mostrar_total=' + mostrar_total, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

export async function DbListasItems(
    servicio: string | null,
    pagina?: string | null,
    parametro?: string | null,
    columnaOrden?: string | null,
    dir?: string | null,
    lista_codi?: string | null,
) {
    try {
        const response = await fetch(url + '/listas_items?servicio=' + servicio + '&pagina=' + pagina + '&parametro=' + parametro + '&orden=' + columnaOrden + '&dir=' + dir + '&lista_codi=' + lista_codi, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

export async function DbConsultarFactura(tipo: string, num: number) {
    try {
        const response = await fetch(url + '/facturas?tipo=' + tipo + '&num=' + num, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

export async function DbConsultarUsuario(
    email?: string | null,
) {
    try {
        const response = await fetch(url + '/usuarios?email=' + email, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}
export async function dbConsultarToken(data: any) {
    try {
        const response = await fetch(url + '/signIn/token', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}
export async function DbDepositosConsul(activo?: string, depo_codi?: string) {
    try {
        const response = await fetch(url + '/depositos?depo_codi=' + depo_codi + '&activo=' + activo, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}

export async function DbGrabarDepositos(data: string | null) {
    try {
        const response = await fetch(url + '/depositos', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}

export async function DbBorrarDepositos(data: string | null) {
    try {
        const response = await fetch('http://localhost:8080/depositos', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}
export async function DbConsultarNotaCredito(tipo: string, num: number) {
    try {
        const response = await fetch(url + '/nota_credito?tipo=' + tipo + '&num=' + num, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response;
    } catch (error) {

        throw new Error('Failed to fetch card data.');
    }
}
export async function DbEliminarCompEmitidos(data: any) {
    try {
        const response = await fetch(`${url}/facturas`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}

export async function DbGrabarRecibo(data: string | null) {
    try {
        const response = await fetch(`${url}/recibo`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}

export async function DbGrabartarRemito(data: string | null) {
    try {
        const response = await fetch(`${url}/remitos`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}

export async function DbConsultarRemito(tipo: string, num: number) {
    try {
        const response = await fetch(`${url}/remitos?tipo=${tipo}&num=${num}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}
export async function DbEliminarRemito(data: any) {
    try {
        const response = await fetch(`${url}/remitos`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}
export async function DbObtenerCae(data:any) {
    try {
        const response = await fetch(`${url}/afip/cae`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}
export async function DbAutorizacionWSAA() {
    try {
        const response = await fetch(`${url}/afip/autorizacion`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        throw new Error('Failed to fetch card data.');
    }
}