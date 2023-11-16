import React from "react"
import { Link } from "gatsby"

export default (props) => {
    const { prev, next } = props;
    if (!prev && !next) {
        return null;
    }

    return (
        <div className="custom-stage-nav">
            {prev && <Link to={prev}><i className="fa fa-caret-left"></i>&nbsp;&nbsp;Anterior</Link>}
            {next && <Link to={next}>Siguiente&nbsp;&nbsp;<i className="fa fa-caret-right"></i></Link>}
        </div>
    )
}