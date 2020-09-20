import React from "react"
import { graphql, Link } from "gatsby"

export default ({ data }) => (
  <div>
    <div className="">
      <div className="w3-bar w3-light-grey w3-card custom-m-b-10">
        <Link to="/" className="w3-bar-item w3-button w3-padding-large">{data.site.siteMetadata.title.toUpperCase()}</Link>
      </div>
    </div>

    <div id="navDemo" className="w3-bar-block w3-white">
      <Link to="/" className="w3-bar-item w3-button w3-padding-large">INICIO</Link>
      {(data.allMarkdownRemark.edges.map(({ node }) => (
        <Link key={node.id} to={node.fields.slug} className="w3-bar-item w3-button w3-padding-large">{node.frontmatter.title}</Link>
      )))}
      {data.site.siteMetadata.flags.showBudget ? <Link to="/presupuesto/" className="w3-bar-item w3-button w3-padding-large">PRESUPUESTO</Link> : null}
      {data.site.siteMetadata.flags.showExtras ? <Link to="/extras/" className="w3-bar-item w3-button w3-padding-large">VIDEO</Link> : null}
      {data.site.siteMetadata.flags.showComments && data.site.siteMetadata.disqus ? <Link to="/comentarios/" className="w3-bar-item w3-button w3-padding-large">COMENTARIOS</Link> : null}
      <a href={data.site.siteMetadata.rootUrl} className="w3-bar-item w3-button w3-padding-large">ab.info</a>
    </div>
  </div>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        rootUrl
        disqus
        flags {
          showBudget
          showExtras
          showComments
        }
      }
    }
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___index]}
      filter: { frontmatter: {private: {ne:true}}}
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            index
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
