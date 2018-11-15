import React from "react";
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg'

import * as icons from 'const/icons.jsx';

//This will return an SVG component to render, e.g <SVGIcon />
const SVGIcon = props => {
    return (
        <ReactSVG
            {...props}
            src={icons.GetRawSvg(props.name)}
            evalScripts="always"
            onInjected={svg => {
                svg.setAttribute("viewBox", icons.GetViewbox(props.viewBox));
            }}
            id={props.id}
            renumerateIRIElements={false}
        />
    )
};

//Default Props here
SVGIcon.defaultProps = {
    style: {},
    className: "",
    svgClassName: "",
    id: "",
    viewBox: "",
    width: "100px",
    height: "100px",
};

SVGIcon.propTypes = {
    name: PropTypes.string.isRequired,
}
export default SVGIcon;