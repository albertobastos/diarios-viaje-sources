import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"

export default ({ data }) => {
  const totalEur = getTotalEur(data);
  return (
    <div>
      <Helmet>
        <title>{data.site.siteMetadata.title} | Presupuesto</title>
        <meta name="Description" content="Presupuesto del viaje"></meta>
      </Helmet>
      <Layout>
        <div className="w3-container w3-center custom-banner-head">
          <h2 className="w3-wide">Presupuesto</h2>
        </div>        
        <div className="w3-container w3-content w3-padding-32 custom-inner custom-stage">
          <table className="custom-budget">
            {data.allBudgetJson.edges.map(({ node }) => {
              return (
                <tbody key={node.id}>
                  <tr className="custom-budget-section">
                    <td>{node.title}</td>
                    <td>EUR</td>
                  </tr>
                  {node.entries.map((entry, index) => {
                    return (
                      <tr key={`${node.id}_${index}`} className="custom-budget-item">
                        <td dangerouslySetInnerHTML={{ __html: entry.description }}></td>
                        <td>{currencyStr(entry.price_eur)} €</td>
                      </tr>
                    )
                  })}
                </tbody>
              );
            })}
            <tbody>
              <tr className="custom-budget-total">
                <td>TOTAL (2 personas)</td>
                <td>{currencyStr(totalEur)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
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
                price_cad
                price_usd
                price_eur
            }
        }
      }
    }
  }
`

function getTotalEur(data) {
  const sum = data.allBudgetJson.edges
    .map(({ node }) => node.entries)
    .reduce((arr, entries) => arr.concat(entries), [])
    .reduce((sum, entry) => sum + entry.price_eur, 0);
  return sum;
}

function currencyFor(entry) {
  if(entry.price_cad) return currencyStr(entry.price_cad) + ' $CAD';
  if(entry.price_usd) return currencyStr(entry.price_usd) + ' $USD';
}

function currencyStr(n) {
  return n.toFixed(2).toString().replace('.',',');
}