import React, {useState} from "react";
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback, View
} from "react-native";
import Line from "../components/Line";
import {MaterialIcons} from "@expo/vector-icons";
import {Button, Text, TextInput} from "react-native-paper";
import Colors from "../constants/Colors";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Title from "../components/Title";

const AddDetailsScreen = (props) => {
    const [images, setImages] = useState([
        {id: -1},
        {id: 0, url: 'https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 1, url: 'https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 2, url: 'https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 3, url: 'https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 4, url: 'https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        {id: 5, url: 'https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const [amount, setAmount] = useState(0);
    const [expireTime, setExpireTime] = useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
    });
    const [address, setAddress] = useState('Konum Seç');
    const [mode, setMode] = useState('date');
    const [showDate, setShowDate] = useState(false);

    const goToSelectAddress = () => {
        props.navigation.navigate('AddressScreen')
    }

    const onChangeDatePicker = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDate(false);
        setExpireTime(currentDate);
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
        setAmount(prevState => prevState > 1 ? --prevState : prevState)
    }

    const increaseAmount = () => {
        setAmount(prevState => ++prevState)
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

    return (
        <KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.screen}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosContainer}>
                        {Images}
                    </ScrollView>
                    <Line />
                    <ScrollView style={styles.form}>
                        <TextInput
                            style={styles.input}
                            label='Başlık'
                            value={title}
                            key='title'
                            mode='outlined'
                            theme={{
                                roundness: 10
                            }}
                            activeOutlineColor={Colors.primary}
                            cursorColor={Colors.secondary}
                            outlineColor={Colors.secondary}
                            onChangeText={t => setTitle(t)}/>
                        <TextInput
                            style={styles.input}
                            label='Açıklama'
                            value={description}
                            key='description'
                            mode='outlined'
                            multiline={true}
                            numberOfLines={5}
                            theme={{
                                roundness: 10
                            }}
                            activeOutlineColor={Colors.primary}
                            cursorColor={Colors.secondary}
                            outlineColor={Colors.secondary}
                            onChangeText={d => setDescription(d)}/>
                        <TextInput
                            style={styles.input}
                            label='Etiketler'
                            value={tag}
                            key='tag'
                            mode='outlined'
                            multiline={true}
                            numberOfLines={3}
                            theme={{
                                roundness: 10
                            }}
                            activeOutlineColor={Colors.primary}
                            cursorColor={Colors.secondary}
                            outlineColor={Colors.secondary}
                            onChangeText={t => setTag(t)}/>
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
                                value={amount.toString()}
                                inputMode='numeric'
                                key='amount'
                                mode='outlined'
                                theme={{
                                    roundness: 10
                                }}
                                activeOutlineColor={Colors.primary}
                                cursorColor={Colors.secondary}
                                outlineColor={Colors.secondary}
                                onChangeText={a => setAmount(a)}/>
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
                            value={expireTime}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChangeDatePicker}
                        />}
                        <Title>Sona Erme Zamanı</Title>
                        <View style={styles.row}>
                            <Button
                                key='expireDate'
                                style={{...styles.input, ...styles.halfWidth}}
                                value={expireTime.toLocaleDateString('tr-TR', {day: 'numeric', month: 'short'})}
                                buttonColor={'#fff'}
                                textColor={'#000'}
                                textAlignments='left'
                                theme={{
                                    roundness: 3
                                }}
                                onPress={showDatepicker}
                                mode='outlined'>
                                {expireTime.toLocaleDateString('tr-TR', {day: 'numeric', month: 'short'})}
                            </Button>
                            <Button
                                key='expireTime'
                                style={{...styles.input, ...styles.halfWidth}}
                                value={expireTime.toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}
                                buttonColor={'#fff'}
                                textColor={'#000'}
                                textAlignments='left'
                                theme={{
                                    roundness: 3
                                }}
                                onPress={showTimepicker}
                                mode='outlined'>
                                {expireTime.toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}
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
                            onPress={goToSelectAddress}
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
    screen:{
        display: "flex",
        flex: 1
    },
    photosContainer:{
        height: 110
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
        borderRadius: 7,
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