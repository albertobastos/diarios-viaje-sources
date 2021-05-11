import React from "react"
import { Link } from "gatsby"

export default (props) => {
    const { map } = props;
    if (!map) {
        //return null;
        return (<div>MAP IS NULL</div>)
    }

    return (
        <div className="custom-stage-nav">
            <Link to={map} target="_blank"><i className="fa fa-globe"></i>&nbsp;&nbsp;Ver en Google Maps</Link>
        </div>
    )
}