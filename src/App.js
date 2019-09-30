import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import {
    getLoggedIn,
    logout
} from './actions'
import {
    loginData,
    usersData
} from './utils'


class App extends React.Component {

    state = {
        username: '',
        password: '',
        validationMsg: '',
        isValidUser: false
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        console.log(loginData);
        let bool = false;
        let msg = '';

        if (nextProps.username !== '' && nextProps.password !== '') {
            for (var key in loginData) {
                if (loginData.username === nextProps.username && loginData.password === nextProps.password) {
                    console.log('true');
                    bool = true;
                } else {
                    console.log('false');
                    bool = false;
                    msg = 'Invalid login';
                }
            }
        }

        this.setState({
            isValidUser: bool,
            validationMsg: msg
        });
    }

    getInputUserName(e) {
        this.setState({
            username: e.target.value
        })
    }

    getInputPassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    getBtnLoggedIn() {
        const { username, password } = this.state;

        if (username === '') {
            this.setState({
                validationMsg: 'Please enter the username.'
            });
        } else if (password === '') {
            this.setState({
                validationMsg: 'Please enter the password.'
            });
        } else {
            this.setState({
                validationMsg: ''
            });
            this.props.getLoggedIn(username, password);
        }
    }

    logout() {
        this.props.logout();
    }

    render() {
        return (
            <div className="App">
                {this.state.isValidUser ?
                    <div>
                        <h2>Users data</h2>
                        <table className='dataTable'>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Phone No.</th>
                            </tr>
                            {usersData.user.map((item) =>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phoneNo}</td>
                                </tr>
                            )}
                        </table>
                        <div>
                            <input type='button'
                                value='logout'
                                onClick={this.logout.bind(this)} />
                        </div>
                    </div>
                    :
                    <div>
                        <h2>Login</h2>
                        <div>
                            <input type='Text'
                                placeholder='Login'
                                onChange={this.getInputUserName.bind(this)}
                                value={this.state.username} />
                        </div>
                        <div>
                            <input type='password'
                                placeholder='Password'
                                onChange={this.getInputPassword.bind(this)}
                                value={this.state.password} />
                        </div>
                        <div>
                            <input type='button'
                                value='Login'
                                onClick={this.getBtnLoggedIn.bind(this)} />
                        </div>
                        {
                            this.state.validationMsg !== '' &&
                            <div>
                                <p className='errorText'>{this.state.validationMsg}</p>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }

}

const mapStateToProps = state => {
    const { username, password, validationMsg } = state;

    return {
        username,
        password,
        validationMsg
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLoggedIn: (username, password) => dispatch(getLoggedIn(username, password)),
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);