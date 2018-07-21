import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

class NavigationBar extends React.Component {
    logout(e) {
        e.preventDefault();
        this.props.logout();
        this.context.router.history.push('/')
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        let userName = '';

        if (isAuthenticated)
            userName  = this.props.auth.user.username;

        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <a
                        href="#"
                        onClick={this.logout.bind(this)}>
                        {'Logout (' + userName + ')'}
                    </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/signup">Sign up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        );


        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Note</Link>
                    </div>

                    <div>
                        { isAuthenticated ? userLinks : guestLinks }
                    </div>
                </div>
            </nav>
        );
    }
}

NavigationBar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

NavigationBar.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { logout })(NavigationBar);