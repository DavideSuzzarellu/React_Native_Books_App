import { useState, useContext } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native"
import { BookProps } from "../config/types"
import { deleteBook, bookDetails } from "../helpers/functions"
import { BookItemDetails } from "./BookItemDetails"
import { BooksContext } from "../context/BooksContext"
import { EditBookModal } from "./EditBookModal"

export const BookItem = (props: BookProps) => {
    const { books, setBooks } = useContext(BooksContext);
    const { title, author, year, type, description, img, id } = props
    const defaultImg = 'https://via.placeholder.com/240x200?text=No+Image';
    const [ showDetails, setShowDetails ] = useState(false)
    const [ shotEditModal, setShowEditModal ] = useState(false)

    const style = StyleSheet.create({
        container: {
            backgroundColor: "white",
            borderStyle: "solid",
            borderColor: "black",
            borderWidth: 1,
            marginBottom: 30,
            borderRadius: 4,
            overflow: "hidden",
            width: 260,
            height: "auto", 
            gap: 2,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,     
        },
        red: {
            color: "red"
        },

        img: {
            width: '100%',
            height: 300,
            resizeMode: 'cover',
            marginBottom: 10,
        },

        text: {
            paddingHorizontal: 12
        },

        button: {   
            alignSelf: 'flex-start',
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
        },

        textButton: {
            color: "white",
        },

        deleteButton: {
            backgroundColor: "red"
        },

        editButton: {
            backgroundColor: "blue"
        },
        
        detailsButton: {
            backgroundColor: "#5f9ea0"
        },

        buttonContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingBottom: 20,
            marginTop: 10
        },

        strong: {
            fontWeight: "bold"
        },

        details: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            paddingVertical: 2
        }

    })

    const handleDelete = (id: string) => {
        Alert.alert(
          'Confirmation',
          'Are you sure you want to delete this book?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: async () => {
                await deleteBook(id);
                setBooks((prevBooks: BookProps[]) => prevBooks.filter((book) => book.id !== id));
              },
            },
          ],
          { cancelable: true }
        );
      };

    const handleDetails = async (id: string) => {
        await bookDetails(id);
        setShowDetails(true);
    };

    return (
        <View style={style.container}>
            <Image
                style={style.img}
                source={{ uri: img || defaultImg }}
            />
            <View style={style.details}>
                <Text style={style.text}><Text style={style.strong}>Title:</Text> {title}</Text>
                <Text style={style.text}><Text style={style.strong}>Author:</Text> {author}</Text>
                <Text style={style.text}><Text style={style.strong}>Publication year:</Text> {year}</Text>
                <Text style={style.text}><Text style={style.strong}>Type:</Text> {type}</Text>
            </View>
            <View style={style.buttonContainer}>
                <TouchableOpacity style={[style.button, style.detailsButton]} onPress={() => handleDetails(id)}>
                    <Text style={style.textButton}>Details</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(id)} style={[style.button, style.deleteButton]}>
                    <Text style={style.textButton}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.button, style.editButton]} onPress={() => setShowEditModal(true)}>
                    <Text style={style.textButton}>Edit</Text>
                </TouchableOpacity>
                {shotEditModal && <EditBookModal onHide={() => setShowEditModal(false)} {...props}/>}
                {showDetails && <BookItemDetails onHide={() => setShowDetails(false)} {...props} />}         
                </View>
        </View>
    )
}