import {StyleSheet, Text, View} from "react-native";

const Animals = () => {
    return (
        <View style={styles.screen}>
            <Text>Animals</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1
    }
})

export default Animals;