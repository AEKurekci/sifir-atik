import {StyleSheet, View} from "react-native";

const Line = () => {
    return (
        <View style={styles.line}>
        </View>
    )
}

const styles = StyleSheet.create({
    line:{
        borderBottomWidth: 1,
        borderBottomColor: '#9a9999'
    }
})

export default Line;