// La tarjeta usa por dentro nuestro componente de botón
import './boton-app';

import estilos
    from './tarjeta-producto.css?raw';

import type {
    DetalleAgregar,
} from './tipos';

// Lo usamos para mostrar los precios 
const pesos =
    new Intl.NumberFormat(
        'es-MX',
        {
            style: 'currency',
            currency: 'MXN',
        },
    );

export class TarjetaProducto
    extends HTMLElement {
    // Atributos que puede recibir una tarjeta desde el HTML
    static get observedAttributes() {
        return [
            'producto-id',
            'nombre',
            'precio',
            'imagen',
            'existencia',
        ];
    }

    constructor() {
        super();

        // Cada tarjeta también tiene su propio Shadow DOM
        this.attachShadow({
            mode: 'open',
        });
    }

    // Cuando la tarjeta entra a la página se dibuja
    connectedCallback() {
        this.render();
    }

    // Si cambia un atributo, volvemos a dibujarla
    attributeChangedCallback() {
        this.render();
    }

    private render() {
        if (!this.shadowRoot) {
            return;
        }

        // Obtenemos los datos enviados como atributos
        const id =
            this.getAttribute(
                'producto-id',
            ) ?? '';

        const nombre =
            this.getAttribute(
                'nombre',
            ) ?? '';

        const imagen =
            this.getAttribute(
                'imagen',
            ) ?? '';

        // Los atributos de HTML llegan como texto,
        // por eso precio y existencia se convierten a número
        const precio =
            Number(
                this.getAttribute(
                    'precio',
                ) ?? '0',
            );

        const existencia =
            Number(
                this.getAttribute(
                    'existencia',
                ) ?? '0',
            );

        // Revisamos si ya no quedan productos
        const agotado =
            existencia === 0;

        const textoExistencia =
            agotado
                ? 'Agotado'
                : `${existencia} disponibles`;

        const claseExistencia =
            agotado
                ? 'existencia agotado'
                : 'existencia';

        // Si está agotado agregamos el atributo
        // que deshabilita nuestro boton-app
        const deshabilitado =
            agotado
                ? 'deshabilitado'
                : '';

        // Dibujamos la tarjeta dentro de su Shadow DOM
        this.shadowRoot.innerHTML = `
      <style>
        ${estilos}
      </style>

      <article class="tarjeta">
        <img
          src="${imagen}"
          alt="${nombre}"
        >

        <div class="cuerpo">
          <h3>${nombre}</h3>

          <p class="precio">
            ${pesos.format(precio)}
          </p>

          <p class="${claseExistencia}">
            ${textoExistencia}
          </p>

          <boton-app
            variante="primario"
            ${deshabilitado}>
            Agregar al carrito
          </boton-app>
        </div>
      </article>
    `;

        const boton =
            this.shadowRoot
                .querySelector(
                    'boton-app',
                );

        // Cuando presionamos el botón avisamos hacia afuera
        // qué producto fue agregado
        boton?.addEventListener(
            'click',
            () => {

                // Un producto agotado no se puede agregar
                if (agotado) {
                    return;
                }

                const detalle:
                    DetalleAgregar = {
                    id,
                    nombre,
                    precio,
                };

                // Evento propio de nuestra tarjeta
                this.dispatchEvent(
                    new CustomEvent(
                        'agregar',
                        {
                            detail: detalle,

                            // Permite que el evento suba por el DOM
                            bubbles: true,

                            // Permite que salga del Shadow DOM
                            composed: true,
                        },
                    ),
                );
            },
        );
    }
}

// Registramos nuestra etiqueta <tarjeta-producto>
if (
    !customElements.get(
        'tarjeta-producto',
    )
) {
    customElements.define(
        'tarjeta-producto',
        TarjetaProducto,
    );
}