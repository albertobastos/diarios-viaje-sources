import React from "react"
import PropTypes from "prop-types"
import { withPrefix } from "gatsby"

/**
 * Customizations compared to default-html.js:
 * - Translated no-script message
 * - Added luminous.js script tag at the end of body
 * - Added echo.js script tag at the end of body
 */

export default function HTML(props) {
  return (
    <html lang="es-ES" {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {props.headComponents}
        <link rel="stylesheet" href="//www.w3schools.com/w3css/4/w3.css"></link>
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></link>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link rel="stylesheet" href={withPrefix('ext/luminous/luminous-basic.min.css')}></link>
        {/* start cookie consent */}
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css" />
        <script src="//cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"></script>
        {/* end cookie consent */}    
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          Esta página web tiene un mejor comportamiento si dispones de JavaScript en el navegador.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
      <script src={withPrefix('ext/luminous/luminous.min.js')}></script>
      <script src={withPrefix('ext/echo/echo.min.js')}></script>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
