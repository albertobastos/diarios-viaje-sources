import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"

import img_start from '../img/start.jpg'
import img_extras from '../img/extras.jpg'
import img_budget from '../img/budget.jpg'

export default ({ data }) => (
  <Layout>
    <div className="w3-display-container w3-container w3-center custom-banner-head">
      <h2 className="w3-wide">{data.site.siteMetadata.title.toUpperCase()}</h2>
      <h3>{data.site.siteMetadata.subtitle}</h3>
    </div>

    <div className="w3-container w3-content w3-center w3-padding-32 custom-max-width-800">
      <p className="w3-justify">Bienvenido a nuestra colección de fotografías en recuerdo de una estancia de cuatro semanas en el <strong>Principado de Asturias</strong>.</p>
      <p className="w3-justify">A diferencia de anteriores diarios de viaje, esta vez el relato cronológico da lugar a una serie de álbumes fotográficos de cada uno de los enclaves que visitamos durante una estancia en la que jugamos a ser asturianos durante un tiempo.</p>
    </div>

    <div className="w3-light-grey">
      <div className="w3-container w3-content w3-padding-64 custom-inner">
        <div className="w3-row-padding w3-padding-32 custom-offset-sides">
          {(data.allMarkdownRemark.edges.map(({ node }) => (
            <div className="w3-third w3-margin-bottom">
            <Link to={node.fields.slug}><img src={img_start} alt={node.frontmatter.title}
              className="w3-hover-opacity custom-full-width" /></Link>
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
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
