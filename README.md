# Diario de viaje generado con Gatsby

Proyecto que genera un diario de viaje a partir de ficheros Markdown y JSON utilizando la herramienta [GatsbyJS](http://www.gatsbyjs.org).

## Preparación

`npm install -g gatsby && npm install`

## Comandos

`npm start`

Realiza un `gatsby clean` seguido de un `gatsby develop` para arrancar el generador en modo de desarrollo.

El site estará disponible en http://localhost:8000.

La consola web para consultar el GraphQL generado por Gatsby se podrá acceder acceder en http://localhost:8000/___graphql.

`npm run serve-build`

Genera la versión para producción del site sin tener en cuenta el posible contexto configurado en pathPrefix.

Lanza un navegador en http://localhost:9000 para visualizar el resultado.

`npm run build`

Genera la versión para producción del site teniendo en cuenta el contexto final configurado en pathPrefix.

El resultado se encuentra en la carpeta /public listo para subir al servicio deseado.

## Configuración del site

Toda la configuración parametrizable del site se encuentra concentrada en el objeto `siteMetadata` del fichero `gatsby-config.js`:

* *title* y *subtitle*: Título y subtítulo del diario a mostrar en la portada y los menús.
* *description*: Descripción para SEO del diario.
* *rootUrl*: URL absoluta a la que apuntar la opción de menú de "Más diarios".
* *siteUrl*: URL absoluta a la portada del diario, necesaria para el plugin que genera el sitemap.
* *disqus*: Identificador de Disqus para alojar los comentarios del diario.
* *photoCdn*: Ruta al CDN en el que se encuentran las fotografías e imágenes de mapas del diario.
* *photoFullFolder* y *photoThumbFolder*: Carpetas del CDN de fotografías en las que se encuentran las versiones a tamaño completo y las miniaturas respectivamente.

Otra configuración relevante repartida por otras partes del fichero `gatsby-config.js` es la siguiente:

* *pathPrefix*: Ruta relativa al dominio en la que se encontrará el diario cuando se suba a un servidor. Solo se tendrá en cuenta al generar la versión final para producción.
* *trackingId* (gatsby-plugin-google-analytics): Identificador del site en Google Analytics.

## Contenidos del diario

Las distintas etapas se encuentran en formato Markdown en la carpeta src/stages.

### Fotografías

Las fotos de la etapa deben incluirse como enlaces referidos a simplemente el nombre del archivo de imagen. Tanto la extensión como el prefijo con la ruta del CDN en el que se encuentra serán añadidos durante la generación. El siguiente Markdown:

```
![Pie de foto 1](FOTO001)
![Pie de foto 2](FOTO002)
```

Asumiendo una ruta al CDN configurada en http://micdn.com/miviaje/ y las carpetas de imágenes en miniatura y pantalla completa en /thumb y /large, se transformará en el siguiente HTML para el site final:

```html
<p class="custom-stage-media">
  <a class="stage-gallery" href="http://micdn.com/large/FOTO001.jpg"><img src="lazyimg.gif" data-echo="http://micdn.com/thumb/FOTO001.jpg" alt="Pie de foto 1"></a>
  <a class="stage-gallery" href="http://micdn.com/large/FOTO002.jpg"><img src="lazyimg.gif" data-echo="http://micdn.com/thumb/FOTO002.jpg" alt="Pie de foto 2"></a>
</p>
```

### Videos (Youtube)

Los videos embedidos de YouTube deben incluirse como simples enlaces, y el generador se encargará de transformarlos en los iframe necesarios. El siguiente Markdown:

`[Rickrolled!](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`

Se transformará en el siguiente HTML en el site final:

```html
<div class="custom-stage-video">
  <div>
    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</div>
```

### Meta-datos de etapa

Cada etapa viene acompañada de unos meta-datos en formato FrontMatter:

* *title*: El título de la etapa.
* *description*: Descripción para SEO de la etapa.
* *date*: La fecha en la que tiene lugar la etapa, en formato libre.
* *index*: La posición que la etapa ocupa en el diario.
* *map*: (opcional) El nombre de la imagen en el CDN con el mapa de la etapa.
* *private*: (opcional) Si existe y tiene el valor `true` la etapa será ignorada durante la generación (útil para etapas que no queremos ver todavía publicadas).