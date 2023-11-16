import React from "react"
import { Helmet } from "react-helmet"
import { StaticQuery, graphql, withPrefix } from "gatsby"
import Layout from "../components/layout"
import StageNavigation from "../components/stage-navigation"
import StageMap from "../components/stage-map"

const CUSTOM_CLASS_MEDIA_CONTAINER = 'custom-stage-media';
const CUSTOM_CLASS_VIDEO_CONTAINER = 'custom-stage-video';

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            photoCdn
            photoFullFolder
            photoThumbFolder
          }
        }
      }
    `
    }
    render={data => {
      const { stage, prev, next } = props;
      const { title: siteTitle } = data.site.siteMetadata;
      const { title: stageTitle, date: stageDate, description: stageSEODescription } = stage.frontmatter;
      const stageFinalHtml = processStageHtml(
        data.site.siteMetadata,
        stage.html
      );

      return (
        <Layout>
          <Helmet>
            <title>{stageTitle} | {siteTitle}</title>
            <meta name="Description" content={stageSEODescription}></meta>
          </Helmet>
          <div className="w3-container w3-center custom-banner-head">
            <h2 className="w3-wide">{stageTitle}</h2>
            <h3 className="w3-wide custom-date">{stageDate}</h3>
            <StageMap map={stage.frontmatter.map}></StageMap>
          </div>

          <div className="w3-container w3-content w3-padding-32 custom-inner custom-stage">
            <StageNavigation prev={prev} next={next}></StageNavigation>
            <div className="custom-stage-body" dangerouslySetInnerHTML={{ __html: stageFinalHtml }}></div>
            <StageNavigation prev={prev} next={next}></StageNavigation>
            <div className="custom-stage-links-footer">
              <h3>Enlaces de interés:</h3>
              <ul>

              </ul>
            </div>
          </div>
        </Layout>
      )
    }}
  />
)

/**
 * Aplica transformaciones al HTML de una etapa generado a partir del Markdown.
 */
function processStageHtml({ photoCdn, photoFullFolder, photoThumbFolder }, html) {
  // Imágenes:
  // - Añadimos el prefijo de la miniatura en el CDN y la extensión .jpg
  // - Las envolvemos en un enlace a la versión grande del CDN
  // - Añadimos los meta-atributos necesarios para el lightbox
  //    <img src="xxx" alt="yyy"> --> <a class="stage-gallery" href="${photoCdn}/large/xxx.jpg"><img src="${photoCdn}/thumb/xxx.jpg" alt="yyy"></a>
  // - Añadimos una clase a los <p> contenedores de fotos necesarios para estilar.
  html = html.replace(
    /<img src="(\w*)"(.*)>/g,
    `<a class="stage-gallery" href="${photoCdn}/${photoFullFolder}/$1.jpg"><img src="${withPrefix('img/lazyimg.gif')}" data-echo="${photoCdn}/${photoThumbFolder}/$1.jpg"$2></a>`
  );
  html = html.replace(
    /<p><a class="stage-gallery" /g,
    `<p class="${CUSTOM_CLASS_MEDIA_CONTAINER}"><a class="stage-gallery"`
  );

  // Youtube:
  // - Sustituimos los enlaces a YouTube por videos embedidos
  //    <a href="https://www.youtube.com/watch?v=xxx">yyy</a> --> <iframe width="560" height="315" src="https://www.youtube.com/embed/xxx" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  // - Cambiamos el contenedor del <p> al <div ...><div> necesario para estilar.
  html = html.replace(
    /<a href="https:\/\/www.youtube.com\/watch\?v=(.*)">(.*)<\/a>/g,
    '<iframe src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
  );
  html = html.replace(
    /<p><iframe (.*)><\/iframe><\/p>/g,
    `<div class="${CUSTOM_CLASS_VIDEO_CONTAINER}"><div><iframe $1></iframe></div></div>`
  );

  return html;
}