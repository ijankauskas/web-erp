export async function DbConsultarArticulo(cod_articulo?: string | null, multiple?: string | null, descripcion?: string | null) {
       
    try {
        const response = await fetch('http://localhost:8080/articulos?codigo=' + cod_articulo + '&multiple=' + multiple + '&descripcion=' + descripcion, {
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


export async function DbConsultarCliente(codigo: number | null) {
    try {
        const response = await fetch('http://localhost:8080/clientes?codigo=' + codigo, {
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