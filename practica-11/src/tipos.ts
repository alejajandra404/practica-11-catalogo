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

// Le indicamos a TypeScript qué información
// lleva un evento personalizado "agregar"
declare global {
    interface HTMLElementEventMap {
        agregar:
        CustomEvent<DetalleAgregar>;
    }
}