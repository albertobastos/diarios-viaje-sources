import React from "react"
import Layout from "../components/layout";
import { Link } from "gatsby"

export default ({ data }) => (
  <Layout>
    <h1>Esta página no existe.</h1>
    <p><Link to="/">Volver al inicio</Link></p>
  </Layout>
)