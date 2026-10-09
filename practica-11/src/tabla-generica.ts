import estilos from './tabla-generica.css?raw';

import type { Columna, Fila } from './tipos';

export class TablaGenerica extends HTMLElement {

    // las columnas y las filas son arreglos y un atributo solo guarda texto
    private _columnas: Columna[] = [];
    private _filas: Fila[] = [];

    private readonly encabezado: HTMLTableRowElement;
    private readonly cuerpo: HTMLTableSectionElement;

    constructor() {
        super();

        // shadow dom para que la tabla y sus estilos 
        // queden separados del resto de la página
        const sombra = this.attachShadow({
            mode: 'open',
        });

        // estructura vacía pq los datos se pintan en dibujar()
        sombra.innerHTML = `
      <style>
        ${estilos}
      </style>

      <table>
        <thead>
          <tr></tr>
        </thead>
        <tbody></tbody>
      </table>
    `;

        this.encabezado =
            sombra.querySelector('thead tr')!;

        this.cuerpo =
            sombra.querySelector('tbody')!;
    }

    // se ejecuta cuando la tabla aparece en la página
    connectedCallback() {
        this.dibujar();
    }

    // propiedad "columnas" cada vez que se asigna se vuelve a dibujar
    set columnas(valor: Columna[]) {
        this._columnas = valor;
        this.dibujar();
    }

    get columnas(): Columna[] {
        return this._columnas;
    }

    // propiedad "filas" cada vez que se asigna se vuelve a dibujar
    set filas(valor: Fila[]) {
        this._filas = valor;
        this.dibujar();
    }

    get filas(): Fila[] {
        return this._filas;
    }

    private dibujar() {
        this.encabezado.replaceChildren();
        this.cuerpo.replaceChildren();

        // una celda de encabezado por cada columna
        for (const columna of this._columnas) {
            const th = document.createElement('th');
            th.textContent = columna.titulo;
            this.encabezado.append(th);
        }

        // si no hay filas se muestar «Sin datos»
        // ocupando todas las columnas de la tabla
        if (this._filas.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');

            td.textContent = 'Sin datos';
            td.className = 'vacio';
            td.colSpan = Math.max(this._columnas.length, 1);

            tr.append(td);
            this.cuerpo.append(tr);
            return;
        }

        // una fila por cada objeto
        for (const fila of this._filas) {
            const tr = document.createElement('tr');

            // busca en el objeto la clave de cada columna
            for (const columna of this._columnas) {
                const td = document.createElement('td');
                td.textContent = String(fila[columna.clave] ?? '');
                tr.append(td);
            }

            this.cuerpo.append(tr);
        }
    }
}

// registrar etiqueta <tabla-generica>
if (!customElements.get('tabla-generica')) {
    customElements.define(
        'tabla-generica',
        TablaGenerica,
    );
}
