import estilos from './boton-app.css?raw';

// Variantes que puede tener nuestro botón
type VarianteBoton =
    | 'primario'
    | 'secundario'
    | 'peligro';

export class BotonApp extends HTMLElement {

    // Estos son los atributos que queremos observar
    // Si alguno cambia en el HTML, el componente se actualiza
    static get observedAttributes() {
        return [
            'variante',
            'deshabilitado',
        ];
    }

    private readonly boton: HTMLButtonElement;

    constructor() {
        super();

        // Creamos el Shadow DOM para que el contenido y
        // los estilos del componente queden separados
        const sombra = this.attachShadow({
            mode: 'open',
        });

        // El slot permite poner el texto desde el HTML
        sombra.innerHTML = `
      <style>
        ${estilos}
      </style>

      <button class="secundario">
        <slot>Botón</slot>
      </button>
    `;

        this.boton =
            sombra.querySelector('button')!;
    }

    // Se ejecuta cuando el componente aparece en la página
    connectedCallback() {
        this.actualizar();
    }

    // Se ejecuta cuando cambia alguno de los atributos observados
    attributeChangedCallback() {
        this.actualizar();
    }

    private actualizar() {

        // Si no se manda una variante usamos secundario
        const variante =
            this.getAttribute('variante') ??
            'secundario';

        const variantesValidas:
            VarianteBoton[] = [
                'primario',
                'secundario',
                'peligro',
            ];

        // Evitamos utilizar una variante que no exista
        const clase =
            variantesValidas.includes(
                variante as VarianteBoton,
            )
                ? variante
                : 'secundario';

        this.boton.className = clase;

        // Si existe el atributo "deshabilitado",
        // también deshabilitamos el botón real
        this.boton.disabled =
            this.hasAttribute(
                'deshabilitado',
            );
    }
}

// Registramos nuestra etiqueta <boton-app>.
if (!customElements.get('boton-app')) {
    customElements.define(
        'boton-app',
        BotonApp,
    );
}