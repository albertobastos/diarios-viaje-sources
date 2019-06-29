import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"

export default ({ data }) => {
  const headStyle = { fontWeight: 'bold' }
  const totalStyle = { fontWeight: 'bold', fontSize: '3em' }
  const totalEurStyle = { textAlign: 'right' }
  const totalEur = getTotalEur(data);
  return (
    <div>
      <Helmet>
        <title>{data.site.siteMetadata.title} | Presupuesto</title>
        <meta name="Description" content="Presupuesto del viaje"></meta>
      </Helmet>
      <Layout>
        <p>Presupuesto</p>
        <table>
          {data.allBudgetJson.edges.map(({ node }) => {
            return (
              <tbody key={node.id}>
                <tr style={headStyle}>
                  <td>{node.title}</td>
                  <td>USD</td>
                  <td>EUR</td>
                </tr>
                {node.entries.map((entry, index) => {
                  return (
                    <tr key={`${node.id}_${index}`}>
                      <td>{entry.description}</td>
                      <td>{entry.price_for}</td>
                      <td>{entry.price_eur}</td>
                    </tr>
                  )
                })}
              </tbody>
            );
          })}
          <tbody style={totalStyle}>
            <tr>
              <td>TOTAL</td>
              <td colSpan={2} style={totalEurStyle}>{totalEur}</td>
            </tr>
          </tbody>
        </table>
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
    allBudgetJson {
      edges {
        node {
            id
            title
            entries {
                description
                price_for
                price_eur
            }
        }
      }
    }
  }
`

function getTotalEur(data) {
  return data.allBudgetJson.edges
    .map(({ node }) => node.entries)
    .reduce((arr, entries) => arr.concat(entries), [])
    .reduce((sum, entry) => sum + entry.price_eur, 0);
}