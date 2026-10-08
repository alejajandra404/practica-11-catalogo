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
