import { View, Modal, Text, Button, Pressable, StyleSheet, GestureResponderEvent, ScrollView } from "react-native"
import { Formik } from "formik"
import { BookProps } from "../config/types"
import { postBook } from "../helpers/functions"
import { ShowModalProps } from "../config/types"
import { FormikInputValue } from "./FormikInputValue"
import { formikFormSchema } from "../validationSchemas/formikForm"
import { useContext } from "react"
import { BooksContext } from "../context/BooksContext"


const initialValues: BookProps = {
    id: "",
    title: "",
    author: "",
    year: "",
    type: "",
    description: "",
    img: "",
}

export const CreateBookModal: React.FC<ShowModalProps> = ({ show, onHide }) => {
    const { books, setBooks } = useContext(BooksContext)
    
    const styles = StyleSheet.create({
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
            color: "green",
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
            visible={show}
            onRequestClose={onHide}
        >
            <ScrollView style={styles.modalBackground}>
                <Formik
                    validationSchema={formikFormSchema} 
                    initialValues={initialValues} 
                    onSubmit={ async (values, actions) => {
                        try {
                            const data = await postBook(values);
                            setBooks([...books, data])
                            actions.resetForm()
                            onHide()            
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                >
                    {({ handleSubmit }) => (
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Create new Book</Text>
                            <Text style={styles.inputLabel}>Title:</Text>
                            <FormikInputValue
                                name="title"
                                placeholder="Harry Potter"
                            />
                            <Text style={styles.inputLabel}>Author:</Text>
                            <FormikInputValue 
                                name="author"
                                placeholder="J.W.Rowling"
                            />
                            <Text style={styles.inputLabel}>Description:</Text>
                            <FormikInputValue 
                                name="description"
                                placeholder="Fantasy films..."
                            />
                            <Text style={styles.inputLabel}>Image:</Text>
                            <FormikInputValue 
                                name="img"
                                placeholder="http://www.example.com"
                            />
                            <Text style={styles.inputLabel}>Type:</Text>
                            <FormikInputValue 
                                name="type"
                                placeholder="Fantasy, Aventure"
                            />
                            <Text style={styles.inputLabel}>Publication year:</Text>
                            <FormikInputValue
                                name="year" 
                                placeholder="2004"
                            />
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 5 }}>
                                <Button
                                    color={"green"}
                                    onPress={handlePress(handleSubmit)}
                                    title="Create"
                                />
                                <Pressable
                                    onPress={onHide}
                                    style={[styles.button, styles.buttonClose]}
                                >
                                    <Text style={styles.textButton}>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </Modal>
    );
};

