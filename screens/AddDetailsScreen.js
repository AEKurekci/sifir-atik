import React, {useCallback, useEffect, useReducer, useState} from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import Line from "../components/Line";
import {MaterialIcons} from "@expo/vector-icons";
import {Button, Text, TextInput} from "react-native-paper";
import Colors from "../constants/Colors";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Title from "../components/Title";
import {FORM_INPUT_UPDATE, formReducer} from "../components/formReducer";
import {useDispatch, useSelector} from "react-redux";
import {saveProduct} from "../store/product/product-actions";

const AddDetailsScreen = (props) => {
    const product = props.route.params ? props.route.params.product : null;
    const category = props.route.params ? props.route.params.category : null;
    const owner = useSelector(state => state.users.user)
    const [images, setImages] = useState([
        {id: -1},
        {id: 0, url: 'https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 1, url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 2, url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 3, url: 'https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 4, url: 'https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 5, url: 'https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}])
    const [address, setAddress] = useState('Konum Seç');
    const [titleTouched, setTitleTouched] = useState(false);
    const [descriptionTouched, setDescriptionTouched] = useState(false);
    const [mode, setMode] = useState('date');
    const [showDate, setShowDate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const getInitialExpire = () => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
    }

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: product ? product.title : '',
            description: product ? product.description : '',
            keywords: product ? product.keywords : '',
            amount: product ? product.amount : 1,
            expireTime: product ? product.expireTime : getInitialExpire(),
            images: images.filter(i => i.id >= 0)
        },
        inputValidities: {
            title: !!product,
            description: !!product,
            keywords: true,
            amount: true,
            expireTime: true,
            images: true
        },
        formIsValid: !!product
    })

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])

    const submitHandler = async () => {
        setError(null);
        if(!formState.formIsValid){
            setError('Lütfen tüm alanların doğru bir şekilde girildiğinden emin olunuz.');
            return;
        }
        setIsLoading(true);
        try{
            const body = {
                ...formState.inputValues,
                expireTime: formState.inputValues.expireTime.toLocaleString(),
                keywords: formState.inputValues.keywords.split(','),
                owner: {
                    ...owner,
                    messages: null
                },
                category}
            console.log(body)
            await dispatch(saveProduct(body))
        }catch (e) {
            setError(e.message)
        }
        setIsLoading(false);
    }

    const goToSelectAddress = () => {
        props.navigation.navigate('AddressScreen')
    }

    const onChangeDatePicker = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDate(false);
        inputChangeHandler('expireTime', currentDate, true);
    }

    const showMode = (currentMode) => {
        setShowDate(true);
        setMode(currentMode);
    }

    const showDatepicker = () => {
        showMode('date')
    }

    const showTimepicker = () => {
        showMode('time')
    }

    const decreaseAmount = () => {
        inputChangeHandler('amount', formState.inputValues.amount > 1 ? --formState.inputValues.amount : formState.inputValues.amount, true)
    }

    const increaseAmount = () => {
        inputChangeHandler('amount', ++formState.inputValues.amount, true)
    }

    const isEmpty = (text) => {
        let result = false;
        if(text !== undefined && typeof text === 'string' && text.length > 0){
            result = true
        }
        return result
    }

    const Images = (
        images.map(i => (
            i.id < 0 ?
            <TouchableOpacity key={i.id} style={styles.imageContainer}>
                <MaterialIcons name='add-a-photo' size={45} color='#ccc' />
            </TouchableOpacity>
                :
                <TouchableOpacity key={i.id} style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: i.url}} />
                </TouchableOpacity>
        ))
    )

    useEffect(() => {
        if (error) {
            Alert.alert("Bir hata oluştu ", error, [{ text: "Okey", onPress: () => {
                    setError(null);
                    setIsLoading(false);
                }
            }]);
        }
    }, [error]);

    if(isLoading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.screen}>
                    {!!error && (
                        <View style={styles.error}>
                            <Text> {error} </Text>
                        </View>)}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosContainer}>
                        {Images}
                    </ScrollView>
                    <Line />
                    <ScrollView style={styles.form}>
                        <TextInput
                            style={styles.input}
                            label='Başlık'
                            value={formState.inputValues.title}
                            key='title'
                            mode='outlined'
                            error={titleTouched && !formState.inputValidities.title}
                            theme={{
                                roundness: 10
                            }}
                            activeOutlineColor={Colors.primary}
                            cursorColor={Colors.secondary}
                            outlineColor={Colors.secondary}
                            onBlur={() => setTitleTouched(true)}
                            onChangeText={t => inputChangeHandler('title', t, isEmpty(t))}/>
                        <TextInput
                            style={styles.input}
                            label='Açıklama'
                            value={formState.inputValues.description}
                            key='description'
                            mode='outlined'
                            multiline={true}
                            error={descriptionTouched && !formState.inputValidities.description}
                            numberOfLines={5}
                            theme={{
                                roundness: 10
                            }}
                            activeOutlineColor={Colors.primary}
                            cursorColor={Colors.secondary}
                            outlineColor={Colors.secondary}
                            onBlur={() => setDescriptionTouched(true)}
                            onChangeText={d => inputChangeHandler('description', d, isEmpty(d))}/>
                        <TextInput
                            style={styles.input}
                            label='Etiketler'
                            value={formState.inputValues.keywords}
                            key='keywords'
                            mode='outlined'
                            multiline={true}
                            numberOfLines={3}
                            theme={{
                                roundness: 10
                            }}
                            activeOutlineColor={Colors.primary}
                            cursorColor={Colors.secondary}
                            outlineColor={Colors.secondary}
                            onChangeText={t => inputChangeHandler('keywords', t, true)}/>
                        <View style={styles.row}>
                            <Button
                                key='decrease'
                                style={styles.decr}
                                value={'-'}
                                buttonColor={Colors.primary}
                                textColor={'#fff'}
                                theme={{
                                    roundness: 3
                                }}
                                onPress={decreaseAmount}
                                mode='contained'>
                                -
                            </Button>
                            <TextInput
                                style={{...styles.input, ...styles.amount}}
                                label='Miktar'
                                value={formState.inputValues.amount.toString()}
                                inputMode='numeric'
                                key='amount'
                                mode='outlined'
                                theme={{
                                    roundness: 10
                                }}
                                activeOutlineColor={Colors.primary}
                                cursorColor={Colors.secondary}
                                outlineColor={Colors.secondary}
                                onChangeText={a => inputChangeHandler('amount', a, true)}/>
                            <Button
                                key='increase'
                                style={styles.decr}
                                value={'+'}
                                buttonColor={Colors.primary}
                                textColor={'#fff'}
                                theme={{
                                    roundness: 3
                                }}
                                onPress={increaseAmount}
                                mode='contained'>
                                +
                            </Button>
                        </View>
                        {showDate && <RNDateTimePicker
                            testID="dateTimePicker"
                            value={formState.inputValues.expireTime}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChangeDatePicker}
                        />}
                        <Title>Sona Erme Zamanı</Title>
                        <View style={styles.row}>
                            <Button
                                key='expireDate'
                                style={{...styles.input, ...styles.halfWidth}}
                                value={formState.inputValues.expireTime.toLocaleDateString('tr-TR', {day: 'numeric', month: 'short'})}
                                buttonColor={'#fff'}
                                textColor={'#000'}
                                textAlignments='left'
                                theme={{
                                    roundness: 3
                                }}
                                onPress={showDatepicker}
                                mode='outlined'>
                                {formState.inputValues.expireTime.toLocaleDateString('tr-TR', {day: 'numeric', month: 'short'})}
                            </Button>
                            <Button
                                key='expireTime'
                                style={{...styles.input, ...styles.halfWidth}}
                                value={formState.inputValues.expireTime.toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}
                                buttonColor={'#fff'}
                                textColor={'#000'}
                                textAlignments='left'
                                theme={{
                                    roundness: 3
                                }}
                                onPress={showTimepicker}
                                mode='outlined'>
                                {formState.inputValues.expireTime.toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}
                            </Button>
                        </View>
                        <Button
                            key='address'
                            style={styles.input}
                            value={address}
                            buttonColor={'#fff'}
                            textColor={'#000'}
                            textAlignments='left'
                            theme={{
                                roundness: 3
                            }}
                            contentStyle={{justifyContent: 'space-between', flexDirection: 'row-reverse'}}
                            onPress={goToSelectAddress}
                            icon='chevron-right'
                            mode='outlined'>
                            {address}
                        </Button>
                        <Button
                            key='save'
                            style={styles.input}
                            value={address}
                            buttonColor={Colors.primary}
                            textColor={'#fff'}
                            theme={{
                                roundness: 3
                            }}
                            onPress={submitHandler}
                            mode='contained'>
                            Kaydet
                        </Button>
                        <Text></Text>
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
    centered:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    error:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#da5454',
        borderRadius: 10,
        color: 'white',
        padding: 10,
        marginVertical: 5
    },
    screen:{
        display: "flex",
        flex: 1
    },
    photosContainer:{
        height: 100
    },
    form:{
        marginHorizontal: 3
    },
    input:{
        marginTop: 7
    },
    decr:{
        flex: 1,
        marginTop: 15
    },
    amount:{
        flex: 70,
        marginLeft: 4,
        marginRight: 4
    },
    imageContainer:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 0.1,
        marginVertical: 8,
        marginHorizontal: 2.5,
        width: 75
    },
    image:{
        height: 75,
        width: 75
    },
    row:{
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-around',
        width: '100%'
    },
    halfWidth:{
        width: '45%'
    }
})

export default AddDetailsScreen;