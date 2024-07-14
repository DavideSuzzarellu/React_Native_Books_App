import { useState } from "react"
import { Text, View, StyleSheet, Pressable } from "react-native"
import Constants from "expo-constants"
import { CreateBookModal } from './CreateBookModal';

export const AppBar = () => {
    const [ show, setShow ] = useState(false)

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#EF6C00",
            paddingTop: Constants.statusBarHeight + 10,
            paddingBottom: 15,
            paddingHorizontal: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },

        text: {
            fontWeight: "bold",
            color: "white",
            textTransform: 'uppercase',
        },

        button: {
            backgroundColor: "green",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
            marginLeft: "auto",
        },
    })

    return ( 
        <View style={styles.container}>
            <CreateBookModal show={show} onHide={() => setShow(false)}/> 
            <Text style={styles.text}>Books List</Text>
            <Pressable
                style={styles.button}
                onPress={() => setShow(true)}
            >
                <Text style={styles.text}>Create Book</Text>
            </Pressable>
        </View>
    )
}