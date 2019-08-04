import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"
import Header from "./header"
import Footer from "./footer"

export default ({ children }) => (
  <StaticQuery
    query={graphql`
          {
            site {
              siteMetadata {
                title
                description
              }
            }
          }       
      `
    }
    render={data => (
      <div>
        <Helmet>
          <title>{data.site.siteMetadata.title}</title>
          <meta name="Description" content={data.site.siteMetadata.description}></meta>
        </Helmet>
        <Header></Header>
        <div className="w3-content custom-outer">
          {children}
        </div>
        <Footer></Footer>
      </div>
    )}
  />
)