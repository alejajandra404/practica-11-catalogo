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

Cada tarjeta tiene su propio árbol de sombra (Shadow DOM), que es como una cajita cerrada. Cuando le doy clic al botón, la tarjeta avisa con un evento propio llamado `agregar`, pero ese evento se queda atrapado dentro de la cajita a menos que le diga que puede salir. Para eso le puse `bubbles: true` y `composed: true`:

- `bubbles` hace que el evento suba por los elementos, de la tarjeta hasta el contenedor.
- `composed` hace que pueda atravesar la pared de la sombra.

Si le quito `composed: true`, el contador deja de subir cuando presiono el botón y la consola no muestra ningún error, simplemente no pasa nada. Eso lo hace difícil de detectar, porque no hay ningún mensaje que te diga qué está mal.

Gracias a que el evento sí sale, en `main.ts` basta con **un solo** listener en el contenedor de las tarjetas para escuchar las doce, en lugar de uno por tarjeta.

## Evidencias

En la carpeta `evidencias/` están las capturas de:

- El botón en sus variantes.
- El catálogo con las tarjetas agotadas.
- El contador después de agregar productos.
