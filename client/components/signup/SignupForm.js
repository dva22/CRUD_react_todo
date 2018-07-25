import React from 'react';
import validateInput from '../../../server/validations/signup';
import axios from "axios";
import PropTypes from "prop-types";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirmation: '',
            errors: {
                username: '',
                password: '',
                passwordConfirmation: '',
                onSubmit: ''
            },
            isDisabledButtonLogin: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getClassName = this.getClassName.bind(this);
    }

    getClassName(field) {
        return "form-control" +
            (this.state.errors[field].length > 0
                ?
                " is-invalid"
                :
                ""
            );
    }

    onSubmit(e) {

        e.preventDefault();

        const {errors, isValid} = validateInput('allForm', this.state);

        if (isValid) {

            this.setState({
                errors: {
                    username: '',
                    password: '',
                    passwordConfirmation: '',
                    onSubmit: ''
                },
                isDisabledButtonLogin: true
            });

            axios.post('/api/users', this.state)
                .then(
                    (res) => this.context.router.history.push('/')
                )
                .catch(err => {
                    let error = '';
                    if (err.response) {
                        if (err.response.data.error)
                            error += ' ' + err.response.data.error;
                        error += ' ' + err.response.request.responseURL +
                            ' ' +
                            err.response.status +
                            ' ' +
                            err.response.statusText
                    } else {
                        error ='Error with server';
                    }

                    this.setState({
                        errors:{
                            username: '',
                            password: '',
                            passwordConfirmation: '',
                            onSubmit: error
                        }
                    })
                });

        } else
            this.setState({
                errors: errors,
                isDisabledButtonLogin: false
            });

    }

    onChange(e) {

        let state = {};
        let isDisabledButtonLogin = false;
        Object.assign(state, this.state);
        state[e.target.name] = e.target.value;
        state.errors['onSubmit'] = '';

        const {errors, isValid} = validateInput(e.target.name, state);

        if (isValid) {
            state.errors[e.target.name] = '';
        } else {
            state.errors[e.target.name] = errors[e.target.name];
        }

        for (let key in state.errors) {
            if (state.errors[key].length > 0)
                isDisabledButtonLogin = true;
        }

        this.setState({
            errors: state.errors,
            isDisabledButtonLogin: isDisabledButtonLogin,
            [e.target.name]: e.target.value
        });
    }

    render() {

        const {errors, isDisabledButtonLogin} = this.state;

        return (
            <form onSubmit={this.onSubmit}>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className={this.getClassName("username")}
                        name="username"
                        placeholder="Username"
                        onChange={this.onChange}/>
                    <div className="invalid-feedback">
                        {errors["username"]}
                    </div>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className={this.getClassName("password")}
                        name="password"
                        placeholder="Password"
                        onChange={this.onChange}
                        autoComplete='new-password'/>
                    <div className="invalid-feedback">
                        {errors["password"]}
                    </div>
                </div>

                <div className="form-group">
                    <label>PasswordConfirmation</label>
                    <input
                        type="password"
                        className={this.getClassName("passwordConfirmation")}
                        name="passwordConfirmation"
                        placeholder="PasswordConfirmation"
                        onChange={this.onChange}
                        autoComplete='new-password'/>
                    <div className="invalid-feedback">
                        {errors["passwordConfirmation"]}
                    </div>
                </div>

                <label
                    hidden
                    className={this.getClassName("onSubmit")}/>
                <div className="invalid-feedback">
                    {errors["onSubmit"]}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isDisabledButtonLogin}>Submit
                </button>

            </form>
        )

    }
}

SignupForm.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SignupForm;