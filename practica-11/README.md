# Práctica 11 – Componentes con TypeScript puro

Catálogo de productos hecho con Vite (vanilla-ts) y componentes propios, sin ningún framework.

Para correrlo:

```
npm install
npm run dev
```

## Ejercicio 1: un botón reutilizable

**Cambié la variante en el HTML y anoté qué pasó sin tocar el TypeScript**

Le cambié el atributo `variante` a uno de los botones en el `index.html` (por ejemplo de `primario` a `peligro`) y guardé. El botón cambió de color solo: de azul a rojo. No tuve que abrir ni modificar nada del archivo `.ts`. Esto pasa porque el componente lee el atributo y según lo que diga le pone una clase de CSS distinta, así que para cambiarle el aspecto basta con cambiar una palabra en el HTML.

**¿Por qué el nombre de una etiqueta propia debe llevar guion?**

Porque así el navegador sabe que es una etiqueta inventada por nosotros y no una de las suyas. HTML ya trae muchas etiquetas con nombres sin guion (`button`, `div`, `video`...) y en el futuro pueden agregar más. Si nos dejaran inventar etiquetas sin guion, algún día podría salir una oficial con el mismo nombre que la nuestra y se nos rompería el proyecto. Con el guion queda garantizado que nunca van a chocar, porque las etiquetas oficiales no llevan.

## Ejercicio 2: la tarjeta de producto

**Un atributo llega siempre como texto, ¿qué hice?**

Aunque en `main.ts` yo mande el precio y la existencia como números, cuando la tarjeta los lee con `getAttribute` le llegan como texto (`"8"` en vez de `8`). Por eso en la tarjeta los convierto con `Number(...)` antes de usarlos. Si no lo hiciera, cosas como revisar si la existencia es cero o darle formato de dinero al precio no funcionarían bien.

**Si el evento no puede salir del árbol de sombra, el contador no se mueve y no hay ningún error**

Cuando presiono el botón, la tarjeta avisa con un evento llamado `agregar`, y el contenedor de las tarjetas lo escucha para subir el contador. Al crear el evento le puse `bubbles: true` y `composed: true`.

Probé quitando cada uno:

- **Sin `composed`:** el contador siguió subiendo y no hubo ningún error. Creo que es porque la tarjeta manda el evento desde ella misma.
- **Sin `bubbles`:** el contador se quedó en cero y tampoco salió ningún error en la consola entonces puede ser difícil encontrar que falla.

## Evidencias

En la carpeta `evidencias/` están las capturas de:

- `variantes.png`: el botón en sus variantes.
- `agotadas.png`: el catálogo con las tarjetas agotadas.
- `contador.png`: el contador después de agregar productos.

---

# Asignación 3 – Tabla genérica y un componente más

Se trabajó sobre el mismo catálogo de la práctica 11. Los dos componentes nuevos se usan en la misma página.

## Parte A: la tabla genérica

La tabla es el componente `<tabla-generica>` (`src/tabla-generica.ts` y `src/tabla-generica.css`). Recibe las `columnas` (la clave del dato y el título que se muestra) y las `filas` (una lista de objetos) como propiedades, porque son arreglos y un atributo solo guarda texto. Cada vez que se le asignan, la tabla se dibuja otra vez. Si no hay filas muestra «Sin datos».

En el catálogo la uso para mostrar el carrito (producto, precio y cantidad). Se actualiza con cada «Agregar» y con «Vaciar». Si agrego el mismo producto dos veces, no crea otra fila, solo le sube la cantidad.

**¿Por qué esta tabla se puede llamar «genérica»?**

Porque la tabla no sabe qué datos está mostrando. En su código nunca aparece la palabra «producto» ni «precio»: solo recorre las columnas que le mandan y para cada una busca en cada objeto el dato que tiene esa clave. 

**¿Qué tendría que cambiar para mostrar alumnos en lugar de productos?**

Nada del componente. Solo tendría que mandarle otras columnas y otras filas. Por ejemplo, columnas como `{ clave: 'nombre', titulo: 'Nombre' }` y `{ clave: 'carrera', titulo: 'Carrera' }`, y filas con objetos de alumnos. El archivo de la tabla se queda igual.

## Parte B: la insignia de estado

Escogí la insignia de estado: el componente `<insignia-estado>` (`src/insignia-estado.ts` y `src/insignia-estado.css`). Muestra una pastilla que cambia de color y de texto según el estado: `disponible` (verde), `pocas-piezas` (amarillo) y `agotado` (rojo). Está en la página en la sección «Estados de la insignia».

**Contrato del componente**

- **Qué recibe:** el atributo `estado`, que puede ser `disponible`, `pocas-piezas` o `agotado`. Es el atributo que el componente "vigila" si lo cambio en el HTML, la insignia cambia sola de color y de texto. Si le pongo un estado que no existe, muestra `disponible`.
- **Qué avisa:** nada porque la insignia es la excepción y no necesita un evento propio porque solo muestra información y no tiene nada que avisar.
- **Qué guarda adentro:** su propio Shadow DOM, con un `<span>` y sus estilos, y el objeto con el texto que va con cada estado.

## Evidencias de la asignación 3

En la carpeta `evidencias/asignacion-03/` están las capturas de:

- `tabla-vacia.png`: la tabla diciendo «Sin datos».
- `tabla-carrito.png`: la tabla con productos en el carrito.
- `insignia-estados.png`: la insignia en sus tres estados.
