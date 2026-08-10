# POST//GLOSARIO

Glosario interactivo y estático de postproducción audiovisual para el toolkit de **No todo se arregla en post**.

## Uso local

Abre `index.html` en un navegador. No necesita instalar nada ni conectarse a un servidor.

## Publicación en GitHub Pages

1. Copia esta carpeta dentro del repositorio de tu web.
2. Mantén juntos `index.html`, `styles.css`, `glossary.js` y `app.js`.
3. Publica el repositorio o la carpeta mediante GitHub Pages.

## Añadir un término

Edita `glossary.js` y añade un objeto con esta estructura:

```js
{
  term: "Nombre",
  category: "Workflow",
  aliases: ["sinónimo"],
  definition: "Definición técnica clara.",
  note: "Traducción casual con humor."
}
```

Las categorías actuales son: `Workflow`, `Editorial`, `Imagen y color`, `Finishing` y `Entrega`.
