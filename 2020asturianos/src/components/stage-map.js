import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default (props) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            photoCdn
            photoThumbFolder
          }
        }
      } 
    `
    }
    render={data => {
      const { map: mapUrl } = props;
      if (!mapUrl) {
        return null;
      }

      return (
        <a className="custom-stage-map" href={mapUrl}>Ver en Mapa</a>
      )
    }}
  />
)