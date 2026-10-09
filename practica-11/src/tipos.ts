// Forma que deben tener los productos del catálogo
export interface Producto {
    id: string;
    nombre: string;
    precio: number;
    categoria: string;
    imagen: string;
    existencia: number;
}

// Datos que enviamos cuando se agrega un producto
export interface DetalleAgregar {
    id: string;
    nombre: string;
    precio: number;
}

// una columna de la tabla genérica
// "clave" es el nombre del dato dentro de cada objeto
// "titulo" es el texto que se muestra en el encabezado
export interface Columna {
    clave: string;
    titulo: string;
}

// un producto dentro del carrito con cuántas piezas lleva
export type ItemCarrito = {
    id: string;
    producto: string;
    precio: number;
    cantidad: number;
};

// los tres estados que puede mostrar la insignia
export type EstadoInsignia =
    | 'disponible'
    | 'pocas-piezas'
    | 'agotado';

// una fila de la tabla puede ser cualquier objeto
export type Fila = Record<string, string | number>;

// Le indicamos a TypeScript qué información
// lleva un evento personalizado "agregar"
declare global {
    interface HTMLElementEventMap {
        agregar:
        CustomEvent<DetalleAgregar>;
    }
}