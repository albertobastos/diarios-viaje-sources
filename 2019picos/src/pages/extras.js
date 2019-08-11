import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"

export default ({ data }) => {
  return (
    <div>
      <Helmet>
        <title>{data.site.siteMetadata.title} | Multimedia</title>
        <meta name="Description" content="Contenidos adicionales del diario tales como vídeos, etc."></meta>
      </Helmet>
      <Layout>
      <div className="w3-container w3-center custom-banner-head">
        <h2 className="w3-wide">Multimedia</h2>
        <h3 className="w3-wide custom-date">Videos del viaje</h3>
      </div>
      <div className="w3-container w3-content w3-padding-32 custom-inner custom-stage"> 
        {data.allMultimediaJson.edges.map(({ node }) => (
          <div key={node.id} className={`custom-video-item ${node.big ? 'big' : ''}`}>
            <p>{node.title}</p>
            <div className="iframe-outer">
              <div><iframe title={`video_${node.youtube}`} src={`https://www.youtube.com/embed/${node.youtube}?rel=0`} allowfullscreen></iframe></div>
            </div>
          </div>
        ))}
      </div>
      </Layout>
    </div>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMultimediaJson {
      edges {
        node {
            title
            youtube
            big
        }
      }
    }
  }
`
