import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"

export default ({ children }) => (
  <StaticQuery
    query={graphql`
    {
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
        sort: {fields: [frontmatter___index], order: ASC}
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
    }
    render={data => (
      <div className="w3-top">
        <div className="w3-bar w3-light-grey w3-card">
          <Link className="w3-bar-item w3-button w3-padding-large w3-hide-large w3-right" to="/menu/"><i
            className="fa fa-bars"></i></Link>
          <Link to="/" className="w3-bar-item w3-button w3-padding-large">{data.site.siteMetadata.title.toUpperCase()}</Link>
          <div className="w3-dropdown-hover w3-hide-small">
            <button className="w3-padding-large w3-button" title="More">ETAPAS<i
              className="fa fa-caret-down custom-m-l-10"></i></button>
            <div className="w3-dropdown-content w3-bar-block w3-card-4">
              {(data.allMarkdownRemark.edges.map(({ node }) => (
                <Link key={node.id} to={node.fields.slug} className="w3-bar-item w3-button">{node.frontmatter.index}: {node.frontmatter.title}</Link>
              )))}
            </div>
          </div>
          {data.site.siteMetadata.flags.showBudget ? <Link to="/presupuesto/" className="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-small">PRESUPUESTO</Link> : null}
          {data.site.siteMetadata.flags.showExtras ? <Link to="/extras/" className="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-small">VIDEO</Link> : null}
          {data.site.siteMetadata.flags.showComments && data.site.siteMetadata.disqus ? <Link to="/comentarios/" className="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-small">COMENTARIOS</Link> : null}
          <a href={data.site.siteMetadata.rootUrl} className="w3-button w3-padding-large w3-hover-red w3-hide-medium w3-hide-small w3-right">+</a>
        </div>
      </div>
    )}
  />
)