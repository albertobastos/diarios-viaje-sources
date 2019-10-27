import React from "react"

export default ({ children }) => (
    <footer className="w3-container w3-padding-64 w3-center w3-opacity w3-light-grey w3-xlarge custom-footer">
        <a href="http://twitter.com/albertobastos" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter w3-hover-opacity"></i></a>
        <a href="https://www.instagram.com/albertobastos/" target="_blank" rel="noopener noreferrer"><i
            className="fa fa-instagram w3-hover-opacity"></i></a>
        <a href="http://www.youtube.com/user/albertobastos" target="_blank" rel="noopener noreferrer"><i
            className="fa fa-youtube w3-hover-opacity"></i></a>
        <p className="w3-medium">&copy; Alberto Bastos 2019 | <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">GatsbyJS</a> &amp;
      <a href="https://www.w3schools.com/CSS/css_rwd_templates.asp" target="_blank" rel="noopener noreferrer">W3.CSS</a></p>
    </footer>
)