import {StyleSheet, View} from "react-native";

const Card = (props) => {
    return (
        <View style={{...styles.screen, ...props.style}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        borderRadius: 10,
        overflow: "hidden",
        padding: 0,
        backgroundColor: 'white',
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
    }
})

export default Card;