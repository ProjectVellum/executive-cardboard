import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'reactstrap';
import cookie from 'react-cookie';

import { OPEN, OpenMenu, CloseMenu, ToggleMenu } from 'redux/menu/r_menu_actions.jsx';


class MenuButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpened: false,
        }

        this.toggleState = this.toggleState.bind(this);
    }//constructor


    componentDidMount() {
        // this.toggleState();
    }//componentDidMount


    toggleState() {
        this.props.DispatchToggle(this.props.menuToToggle);
    }//toggleState


    render() {
        return (
            <button
                className={this.props.className}
                onClick={() => this.toggleState()}
            >{this.props.name}</button>
        );
    }//render
}//app


MenuButton.defaultProps = {
    initState: false,
    style: {}
}

MenuButton.propTypes = {
    name: PropTypes.string.isRequired,
    menuToToggle: PropTypes.string.isRequired,
    initState: PropTypes.bool
}


function mapStateToProps(state) {
    return {
        openedList: state.opened,
    }
}//mapStateToProps


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        DispatchOpen: OpenMenu,
        DispatchClose: CloseMenu,
        DispatchToggle: ToggleMenu
    },
        dispatch);
}//matchDispatchToProps


export default connect(mapStateToProps, matchDispatchToProps)(MenuButton);