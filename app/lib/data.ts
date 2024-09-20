export async function DbConsultarArticulo(
    cod_articulo?: string | null,
    multiple?: string | null,
    descripcion?: string | null,
    columnaOrden?: string | null,
    dir?: string | null,
    page?: any | null,
    limit?: any | null,
    activos?: string | null,
) {

    try {
        const response = await fetch('http://localhost:8080/articulos?codigo=' + cod_articulo + '&multiple=' + multiple + '&descripcion=' + descripcion + '&columnaOrden=' + columnaOrden + '&dir=' + dir + '&page=' + page + '&limit=' + limit + '&activos=' + activos, {
            method: 'GET',
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
        const response = await fetch('http://localhost:8080/articulos', {
            method: 'POST',
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
        const response = await fetch('http://localhost:8080/proveedores', {
            method: 'POST',
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

export async function DbConsultarProveedor(codigo: number | null) {
    try {
        const response = await fetch('http://localhost:8080/proveedores?codigo=' + codigo, {
            method: 'GET',
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
        const response = await fetch('http://localhost:8080/signIn', {
            method: 'POST',
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
    page?: string | null,
    limit?: string | null,
    activos?: string | null,
) {
    try {
        const response = await fetch('http://localhost:8080/clientes?codigo=' + codigo + '&multiple=' + multiple + '&razon=' + razon + '&orden=' + columnaOrden + '&dir=' + dir + '&page=' + page + '&limit=' + limit + '&activos=' + activos, {
            method: 'GET',
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
        const response = await fetch('http://localhost:8080/clientes', {
            method: 'POST',
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
        const response = await fetch('http://localhost:8080/facturas', {
            method: 'POST',
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
) {
    try {
        const response = await fetch('http://localhost:8080/comp_emitidos?cliente=' + cliente + '&pagina=' + pagina + '&orden=' + columnaOrden + '&dir=' + dir, {
            method: 'GET',
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
        const response = await fetch('http://localhost:8080/saldos_clientes?servicio=' + servicio + '&pagina=' + pagina + '&parametro=' + parametro + '&orden=' + columnaOrden + '&dir=' + dir + '&cliente=' + cliente, {
            method: 'GET',
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
        const response = await fetch('http://localhost:8080/valores?activo=' + activos, {
            method: 'GET',
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
        const response = await fetch('http://localhost:8080/monedas', {
            method: 'GET',
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
        const response = await fetch('http://localhost:8080/comp?tipo=' + tipo + '&activo=' + activo, {
            method: 'GET',
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
        const response = await fetch('http://localhost:8080/imprimirPDF?tipoReporte' + tipoReporte + 'tipo=' + tipo + '&num=' + num, {
            method: 'GET',
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
        const response = await fetch('http://localhost:8080/nota_credito', {
            method: 'POST',
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
