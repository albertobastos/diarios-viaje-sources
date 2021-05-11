import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"

export default ({ data }) => (
  <Layout>
    <div className="w3-display-container w3-container w3-center custom-banner-head">
      <h2 className="w3-wide">{data.site.siteMetadata.title.toUpperCase()}</h2>
      <h3>{data.site.siteMetadata.subtitle}</h3>
    </div>

    <div className="w3-container w3-content w3-center w3-padding-32 custom-max-width-800">
      <p className="w3-justify">Bienvenido a nuestra colección de fotografías en recuerdo de una estancia de cuatro semanas en el <strong>Principado de Asturias</strong>.</p>
      <p className="w3-justify">En esta ocasión dejamos de lado el relato cronológico para dar paso a una serie de álbumes fotográficos con cada uno de los enclaves que visitamos durante el tiempo en el que jugamos a ser asturianos.</p>
    </div>

    <div className="w3-light-grey">
      <div className="w3-container w3-content w3-padding-64 custom-inner">
        <div className="w3-row-padding w3-padding-32 custom-offset-sides">
          {(data.allMarkdownRemark.edges.map(({ node }) => (
            <div className="w3-third w3-margin-bottom custom-index-tile">
              <Link to={node.fields.slug}>
                <img
                  src={data.site.siteMetadata.photoCdn + '/' + data.site.siteMetadata.photoThumbFolder + '/' + node.frontmatter.prefix + node.frontmatter.cover + '.jpg'}
                  alt={node.frontmatter.title}
                  className="w3-hover-opacity"
                />
              </Link>
              <div className="w3-container w3-white w3-center">
                <p>{node.frontmatter.title}</p>
              </div>
           </div>
        )))}
        </div>
      </div>
    </div>
  </Layout>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        subtitle
        photoCdn
        photoThumbFolder
        flags {
          showBudget
          showExtras
        }
      }
    }
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___title]}
      filter: { frontmatter: {private: {ne:true}}}
    ) {
      edges {
        node {
          frontmatter {
            title,
            prefix,
            cover
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
