import estilos from './insignia-estado.css?raw';

import type { EstadoInsignia } from './tipos';

// el texto que se muestra para cada estado
const textos: Record<EstadoInsignia, string> = {
    'disponible': 'Disponible',
    'pocas-piezas': 'Pocas piezas',
    'agotado': 'Agotado',
};

export class InsigniaEstado extends HTMLElement {

    // el atributo que se observa
    // si "estado" cambia en el html la insignia se actualiza sola
    static get observedAttributes() {
        return [
            'estado',
        ];
    }

    private readonly insignia: HTMLSpanElement;

    constructor() {
        super();

        // shadow dom para que la insignia y
        // sus estilos queden separados del resto de la página
        const sombra = this.attachShadow({
            mode: 'open',
        });

        // span vacío pa el texto y el color se ponen en actualizar()
        sombra.innerHTML = `
      <style>
        ${estilos}
      </style>

      <span></span>
    `;

        this.insignia =
            sombra.querySelector('span')!;
    }

    // se ejecuta cuando la insignia aparece en la página
    connectedCallback() {
        this.actualizar();
    }

    // se ejecuta cuando cambia el atributo observado
    attributeChangedCallback() {
        this.actualizar();
    }

    private actualizar() {

        // si no se manda un estado se usa disponible
        const estado =
            this.getAttribute('estado') ??
            'disponible';

        // evitar usar un estado que no exista
        const estadoValido =
            estado in textos
                ? (estado as EstadoInsignia)
                : 'disponible';

        // la clase cambia el color y el texto cambia el mensaje
        this.insignia.className = estadoValido;
        this.insignia.textContent = textos[estadoValido];
    }
}

// registar nuestra etiqueta <insignia-estado>
if (!customElements.get('insignia-estado')) {
    customElements.define(
        'insignia-estado',
        InsigniaEstado,
    );
}
