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
        <DiscussionEmbed shortname={data.site.siteMetadata.disqus}></DiscussionEmbed>
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
