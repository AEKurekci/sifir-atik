import React, {useState} from "react";
import {Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import Line from "../components/Line";
import {MaterialIcons} from "@expo/vector-icons";
import {Button, TextInput} from "react-native-paper";
import Colors from "../constants/Colors";

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
    const [address, setAddress] = useState('Konum Seç');

    const goToSelectAddress = () => {
        props.navigation.navigate('AddressScreen')
    }

    const Images = (
        images.map(i => (
            i.id < 0 ?
            <TouchableOpacity key={i.id} style={styles.imageContainer}>
                <MaterialIcons name='add-a-photo' size={45} color='#ccc' />
            </TouchableOpacity>
                :
                <TouchableOpacity style={styles.imageContainer}>
                    <Image key={i.id} style={styles.image} source={{uri: i.url}} />
                </TouchableOpacity>
        ))
    )

    return (
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
                    activeOutlineColor={Colors.primary}
                    cursorColor={Colors.secondary}
                    outlineColor={Colors.secondary}
                    onChangeText={t => setTag(t)}/>
                <View key='address'>
                    <Button
                        style={styles.input}
                        value={address}
                        buttonColor={'#fff'}
                        textColor={'#000'}
                        textAlignments='left'
                        contentStyle={{justifyContent: 'space-between', flexDirection: 'row-reverse'}}
                        onPress={goToSelectAddress}
                        icon='chevron-right'
                        mode='outlined'>
                        {address}
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen:{
        display: "flex"
    },
    photosContainer:{
        height: 91
    },
    form:{
        marginHorizontal: 3
    },
    input:{
        marginTop: 7
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
    }
})

export default AddDetailsScreen;