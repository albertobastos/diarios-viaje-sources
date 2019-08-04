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
        <p>Multimedia</p>
        {data.allMultimediaJson.edges.map(({ node }) => (
          <div key={node.id}>
            <p>{node.title}</p>
            <p><iframe title={`video_${node.youtube}`} className="video" src={`https://www.youtube.com/embed/${node.youtube}?rel=0`} allowfullscreen></iframe></p>
          </div>
        ))}
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
        }
      }
    }
  }
`
