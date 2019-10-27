import React from "react"
import Stage from "../components/stage"

export default ({ pageContext }) => {
  const { stage, prev, next } = pageContext
  return (
    <Stage stage={stage} prev={prev} next={next}></Stage>
  )
}
