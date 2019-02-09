import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { TextInputStandard } from "../common/TextInput-standard";
import { ButtonFull, BackgroundWrapper } from '../common';
import { onNameChange, onStartLogin, onEmailChange, onPwdChange, onStartSignup } from '../../actions/auth'

class SignupScreen extends React.Component {

  handleNameInput(name) {
    this.props.onNameChange(name)
  }

  handleEmailInput(email) {
    this.props.onEmailChange(email)
  }

  handlePwdInput(password) {
    this.props.onPwdChange(password)
  }

  handleSignupButton() {
    this.props.onStartSignup()
  }

  render() {
    const { name, email, password, isLoading, error } = this.props.auth
    const { smallTextStyle, indicatorStyle, errorStyle } = styles
    return (
      <BackgroundWrapper>
        <TextInputStandard
          label='Name'
          maxLenght={32}
          placeholder='Enter your name'
          value={name}
          onChangeText={name => this.handleNameInput(name)}
          error={error}
        />
        <TextInputStandard
          label='Email'
          maxLenght={32}
          placeholder='example@email.com'
          value={email}
          onChangeText={email => this.handleEmailInput(email)}
          error={error}
        />
        <TextInputStandard
          label='Password'
          placeholder='secret password'
          secureTextEntry={true}
          value={password}
          onChangeText={password => this.handlePwdInput(password)}
        />
        {!!error && <View style={errorStyle}><Text style={smallTextStyle}>{error}</Text></View>}
        <ButtonFull
          label='Sign up'
          onPress={this.handleSignupButton.bind(this)}
          disabled={isLoading}
        />
        {isLoading && <ActivityIndicator size='large' color='#fff' style={indicatorStyle} />}
      </BackgroundWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 32
  },
  smallTextStyle: {
    fontSize: 16,
    color: '#fff'
  },
  indicatorStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: 15
  },
  errorStyle: {
    color: '#fff',
    backgroundColor: 'rgba(204, 0, 0, 0.2)',
    padding: 16,
    borderRadius: 50,
  }
});

const mapStateToProps = state => ({ auth: state.auth })

export default connect(mapStateToProps, { onNameChange, onStartLogin, onEmailChange, onPwdChange, onStartSignup })(SignupScreen)