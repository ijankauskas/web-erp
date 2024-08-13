export async function DbConsultarArticulo(cod_articulo:string | null) {
    try {
        const response = await fetch('http://localhost:8080/articulos?codigo='+cod_articulo, {
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


export async function DbConsultarCliente(cliente:string | null) {
    try {
        const response = await fetch('http://localhost:8080/clientes?codigo='+cliente, {
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

