import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"

import img_start from '../img/start.jpg'
//import img_extras from '../img/extras.jpg'
import img_budget from '../img/budget.jpg'

export default ({ data }) => (
  <Layout>
    <div className="w3-display-container w3-container w3-center custom-banner-head">
      <h2 className="w3-wide">{data.site.siteMetadata.title.toUpperCase()}</h2>
      <h3>{data.site.siteMetadata.subtitle}</h3>
    </div>

    <div className="w3-container w3-content w3-center w3-padding-32 custom-max-width-800">
      <p className="w3-justify">Relato de un viaje de tres días a las ciudades de <strong>Milán</strong>, <strong>Bérgamo</strong> y <strong>Como</strong>.</p>
      <p className="w3-justify">Utiliza el menú superior o las secciones inferiores para leer una extensa descripción de cada etapa, ver las fotografías y videos que lo acompañan o saber cual fue el coste final de nuestro viaje.</p>
      <p className="w3-justify">Fotografías tomadas con un Google Pixel 7 Pro.</p>
    </div>

    <div className="w3-light-grey">
      <div className="w3-container w3-content w3-padding-64 custom-inner">
        <div className="w3-row-padding w3-padding-32 custom-offset-sides">
          <div className="w3-half w3-margin-bottom">
            <Link to={data.allMarkdownRemark.edges[0].node.fields.slug}><img src={img_start} alt="Iniciar diario"
              className="w3-hover-opacity custom-full-width" /></Link>
            <div className="w3-container w3-white w3-center">
              <p><b>Diario de viaje</b></p>
              <Link to={data.allMarkdownRemark.edges[0].node.fields.slug} className="w3-button w3-black w3-margin-bottom">Empezar</Link>
            </div>
          </div>
          {data.site.siteMetadata.flags.showExtras ?
            <div className="w3-third w3-margin-bottom">
              <Link to="/extras/"><img src="" alt="Ver multimedia"
                className="w3-hover-opacity custom-full-width" /></Link>
              <div className="w3-container w3-white w3-center">
                <p><b>Videos</b></p>
                <p>-</p>
                <Link to="/extras/" className="w3-button w3-black w3-margin-bottom">Ver</Link>
              </div>
            </div> : null}
          {data.site.siteMetadata.flags.showBudget ? <div className="w3-half w3-margin-bottom">
            <Link to="/presupuesto/"><img src={img_budget} alt="Abrir presupuesto"
              className="w3-hover-opacity custom-full-width" /></Link>
            <div className="w3-container w3-white w3-center">
              <p><b>Presupuesto</b></p>
              <Link to="/presupuesto/" className="w3-button w3-black w3-margin-bottom">Abrir</Link>
            </div>
          </div> : null}
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
      sort: { order: ASC, fields: [frontmatter___index]}
      filter: { frontmatter: {private: {ne:true}}}
      limit:1
    ) {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
  }
`
