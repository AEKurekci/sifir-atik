import React, {useCallback, useReducer, useState} from "react";
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform, SafeAreaView,
    ScrollView, StyleSheet, TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import Colors from "../constants/Colors";
import {Button, Text, TextInput} from "react-native-paper";
import {FORM_INPUT_ON_BLUR, FORM_INPUT_UPDATE, formReducer} from "../components/formReducer";
import {useDispatch} from "react-redux";
import {signUp} from "../store/auth/auth-actions";

const SignUpScreen = props => {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const [hidePassword, setHidePassword] = useState(true)
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            phoneNo: ''
        },
        inputValidities: {
            name: false,
            surname: false,
            email: false,
            password: false,
            phoneNo: false,
            imageURL: true
        },
        touches:{
            name: false,
            surname: false,
            email: false,
            phoneNo: false,
            password: false
        },
        formIsValid: false
    })

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            input: inputIdentifier,
            isValid: inputValidity,
            value: inputValue
        })
    }, [])

    const inputOnBlurHandler = useCallback((inputIdentifier) => {
        dispatchFormState({
            type: FORM_INPUT_ON_BLUR,
            input: inputIdentifier
        })
    }, [dispatchFormState])

    const isEmpty = (text) => {
        let result = false;
        if(text !== undefined && typeof text === 'string' && text.length > 0){
            result = true
        }
        return result
    }

    const submitHandler = async () => {
        setError(null);
        if(!formState.formIsValid){
            setError('Lütfen tüm alanların doğru bir şekilde girildiğinden emin olunuz.');
            return;
        }
        setIsLoading(true);
        try{
            let body = {
                ...formState.inputValues,
                signDate: new Date()
            }
            console.log(body)
            await dispatch(signUp(body))
            props.navigation.navigate('SignInScreen')
        }catch (err) {
            setError(err.message)
        }finally {
            setIsLoading(false);
        }
    }

    if(isLoading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    return(
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.screen}>
                    {!!error && (
                        <TouchableOpacity style={styles.error} onPress={() => setError(null)}>
                            <Text style={styles.errorText}> {error} </Text>
                        </TouchableOpacity>)}
                    <ScrollView style={styles.form}>
                        <TextInput
                            style={styles.input}
                            label='İsim'
                            value={formState.inputValues.name}
                            key='name'
                            mode='outlined'
                            error={(formState.touches.name || !!error) && !formState.inputValidities.name}
                            theme={{
                                roundness: 10
                            }}
                            activeOutlineColor={Colors.primary}
                            cursorColor={Colors.secondary}
                            outlineColor={Colors.secondary}
                            onBlur={() => inputOnBlurHandler('name')}
                            onChangeText={n => inputChangeHandler('name', n, isEmpty(n))}/>
                        <TextInput
                            style={styles.input}
                            label='Soyisim'
                            value={formState.inputValues.surname}
                            key='surname'
                            mode='outlined'
                            error={(formState.touches.surname || !!error) && !formState.inputValidities.surname}
                            theme={{
                                roundness: 10
                            }}
                            activeOutlineColor={Colors.primary}
                            cursorColor={Colors.secondary}
                            outlineColor={Colors.secondary}
                            onBlur={() => inputOnBlurHandler('surname')}
                            onChangeText={s => inputChangeHandler('surname', s, isEmpty(s))}/>
                        <TextInput
                            style={styles.input}
                            label='Email'
                            value={formState.inputValues.email}
                            key='email'
                            mode='outlined'
                            error={(formState.touches.email || !!error) && !formState.inputValidities.email}
                            theme={{
                                roundness: 10
                            }}
                            activeOutlineColor={Colors.primary}
                            cursorColor={Colors.secondary}
                            outlineColor={Colors.secondary}
                            onBlur={() => inputOnBlurHandler('email')}
                            onChangeText={e => inputChangeHandler('email', e, isEmpty(e))}/>
                        <TextInput
                            style={styles.input}
                            label='Şifre'
                            value={formState.inputValues.password}
                            key='password'
                            mode='outlined'
                            error={(formState.touches.password || !!error) && !formState.inputValidities.password}
                            theme={{
                                roundness: 10
                            }}
                            activeOutlineColor={Colors.primary}
                            cursorColor={Colors.secondary}
                            outlineColor={Colors.secondary}
                            onBlur={() => inputOnBlurHandler('password')}
                            secureTextEntry={hidePassword}
                            right={<TextInput.Icon
                                icon="eye"
                                forceTextInputFocus={false}
                                onPress={() => setHidePassword(!hidePassword)}
                            />}
                            onChangeText={p => inputChangeHandler('password', p, isEmpty(p))}/>
                        <TextInput
                            style={styles.input}
                            label='Telefon No'
                            value={formState.inputValues.phoneNo}
                            key='phoneNo'
                            mode='outlined'
                            error={(formState.touches.phoneNo || !!error) && !formState.inputValidities.phoneNo}
                            theme={{
                                roundness: 10
                            }}
                            activeOutlineColor={Colors.primary}
                            cursorColor={Colors.secondary}
                            outlineColor={Colors.secondary}
                            onBlur={() => inputOnBlurHandler('phoneNo')}
                            onChangeText={e => inputChangeHandler('phoneNo', e, isEmpty(e))}/>
                        <Button
                            key='signup'
                            style={styles.input}
                            buttonColor={Colors.primary}
                            textColor={'#fff'}
                            theme={{
                                roundness: 3
                            }}
                            onPress={submitHandler}
                            mode='contained'>
                            Kaydol
                        </Button>
                        <Button
                            key='signIn'
                            style={styles.input}
                            buttonColor={Colors.primary}
                            textColor={'#fff'}
                            theme={{
                                roundness: 3
                            }}
                            onPress={() => {props.navigation.navigate('SignInScreen')}}
                            mode='contained'>
                            Giriş
                        </Button>
                    </ScrollView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    screen:{
        display: "flex",
        flex: 1
    },
    form:{
        marginHorizontal: 3
    },
    error:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#da5454',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5
    },
    errorText:{
        color: '#fff'
    },
    input:{
        marginTop: 7
    }
});

export default SignUpScreen;