import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default (props) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            photoCdn
          }
        }
      } 
    `
    }
    render={data => {
      const { map } = props;
      if (!map) {
        return null;
      }

      const { photoCdn } = data.site.siteMetadata;
      const largeUrl = `${photoCdn}/large/${map}.jpg`;
      const thumbUrl = `${photoCdn}/thumb/${map}.jpg`;

      return (
        <a className="custom-stage-map" href={largeUrl}><img src={thumbUrl} alt="Mapa de la etapa" /></a>
      )
    }}
  />
)