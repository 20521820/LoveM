import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Image, Keyboard } from 'react-native'
import React, { createRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/style';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext("");
    if (!email) {
      alert("Please enter your email");
      return;
    }
    if (!password) {
      alert("Please enter your password");
      return;
    }
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        if (user) navigation.replace("Home");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-email")
          setErrortext(error.message);
        else if (error.code === "auth/user-not-found")
          setErrortext("No User Found");
        else {
          setErrortext("Please check your email or password");
        }
      });
  }

  // forgot password
  const forgotPassword = () => {
    if (!email) {
      alert("Please enter your email!");
    }
    firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        alert("Password reset email sent")
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.pageStyle}>
          <View style={styles.main}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.imgStyle} />
            <Text style={styles.titleName}>Login</Text>
            <View style={styles.sectionStyle}>
              <Icon name="mail-outline" size={27} style={styles.iconStyle} />
              <TextInput
                placeholder="Enter Email"
                onChangeText={(email) => setEmail(email)}
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()}
                style={styles.textInput}
              />
            </View>
          </View>

          <View style={styles.sectionStyle}>
            <Icon
              name="lock-closed-outline"
              size={27}
              style={styles.iconStyle}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter Password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              autoCapitalize='none'
              autoCorrect={false}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>

          {errortext != "" ? (
            <Text style={styles.errorTextStyle}>
              {" "}
              {errortext}{" "}
            </Text>
          ) : null}

          <TouchableOpacity onPress={() => { forgotPassword() }} >
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: 'red',
                margin: 5,
              }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <View style={styles.formatButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmitPress}>
              <Text style={styles.textButton}>LOGIN</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}
          >

            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: COLORS.white,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              Don't have an account?
              <Text style={{ color: COLORS.logo }}>Register Now</Text>
            </Text>

          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  titleName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  imgStyle: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 10,
  },
  textInput: {
    width: 300,
  },
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
  },
  sectionStyle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 0.5,
    height: 50,
    marginTop: 10,
    borderRadius: 10,
  },
  pageStyle: {
    flexDirection: 'column',
    margin: 10,
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  formatButton: {
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
    width: 320,
    height: 50,
    backgroundColor: COLORS.logo,
  },
  textButton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  textCheckBox: {
    margin: 10,
    color: 'white',
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});

export default LoginScreen;