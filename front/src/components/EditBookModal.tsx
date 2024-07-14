import { View, Modal, Text, Button, Pressable, StyleSheet, GestureResponderEvent, ScrollView } from "react-native"
import { Formik } from "formik"
import { putBook } from "../helpers/functions"
import { BookProps, BookModalProps } from "../config/types"
import { FormikInputValue } from "./FormikInputValue"
import { useContext } from "react"
import { BooksContext } from "../context/BooksContext"


export const EditBookModal: React.FC<BookModalProps> = ({ onHide, ...props }) => {
    const { books, setBooks } = useContext(BooksContext)
    const { id, title, author, year, type, description, img } = props
    const initialValues: BookProps = {
        id: id,
        title: title,
        author: author,
        year: year,
        type: type,
        description: description,
        img: img,
    }    

    const style = StyleSheet.create({
        modalBackground: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalView: {
            marginVertical: 80,
            marginHorizontal: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 30,
            gap: 10,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        
        button: {
            borderRadius: 2,
            padding: 10,
            elevation: 2,
            backgroundColor: 'green',
        },

        buttonClose: {
            backgroundColor: 'red',
        },

        textButton: {
            color: 'white',
            fontWeight: 'bold',
            textTransform: 'uppercase',
        },

        modalTitle: {
            fontWeight: "bold",
            fontSize: 20,
            color: "blue",
            marginBottom: 10
        },

        inputLabel: {
            fontWeight: "400",
            fontStyle: "italic"
        }
    });

    const handlePress = (handleSubmit: () => void) => (event: GestureResponderEvent) => {
        handleSubmit();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            onRequestClose={onHide}
        >
            <ScrollView style={style.modalBackground}>
                <Formik 
                    initialValues={initialValues} 
                    onSubmit={ async (values, actions) => {
                        try {
                            const updatedBook = await putBook(values, id);
                            const updatedBooks = books.map((book: BookProps )=> (book.id === id ? updatedBook : book)); 
                            setBooks(updatedBooks); 
                            actions.resetForm();
                            onHide();           
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                >
                    {({ handleSubmit }) => (
                        <View style={style.modalView}>
                            <Text style={style.modalTitle}>Edit Book</Text>
                            <Text style={style.inputLabel}>Title:</Text>
                            <FormikInputValue
                                name="title"
                                placeholder="Title"
                            />
                            <Text style={style.inputLabel}>Author:</Text>
                            <FormikInputValue 
                                name="author"
                                placeholder="Author"
                            />
                            <Text style={style.inputLabel}>Description:</Text>
                            <FormikInputValue 
                                name="description"
                                placeholder="Description"
                            />
                            <Text style={style.inputLabel}>Image:</Text>
                            <FormikInputValue 
                                name="img"
                                placeholder="Image URL"
                            />
                            <Text style={style.inputLabel}>Type</Text>
                            <FormikInputValue 
                                name="type"
                                placeholder="Type"
                            />
                            <Text style={style.inputLabel}>Publication year:</Text>
                            <FormikInputValue
                                name="year" 
                                placeholder="Year"
                            />
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 5 }}>
                                <Button
                                    color={"green"}
                                    onPress={handlePress(handleSubmit)}
                                    title="Edit"
                                />
                                <Pressable
                                    onPress={onHide}
                                    style={[style.button, style.buttonClose]}
                                >
                                    <Text style={style.textButton}>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </Modal>
    )
}
