import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { DiscussionEmbed } from "disqus-react"
import Layout from "../components/layout"

export default ({ data }) => (
  (
    <div>
      <Helmet>
        <title>{data.site.siteMetadata.title} | Comentarios</title>
        <meta name="Description" content="Comentarios de los usuarios"></meta>
      </Helmet>
      <Layout>
        <div className="w3-container w3-center custom-banner-head">
          <h2 className="w3-wide">Comentarios</h2>
          <h3 className="w3-wide custom-date">Pregunta lo que quieras</h3>
        </div>        
        <div className="w3-container w3-content w3-padding-32 custom-inner custom-stage">
          <DiscussionEmbed shortname={data.site.siteMetadata.disqus}></DiscussionEmbed>
        </div>
      </Layout>
    </div>
  )
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title,
        disqus
      }
    }
  }
`
