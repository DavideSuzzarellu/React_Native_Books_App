import { useContext, useEffect, useState } from "react"
import { StyleSheet, FlatList, Text, View, ActivityIndicator  } from "react-native"
import { BookItem } from "./BookItem"
import { BooksContext } from "../context/BooksContext"
import { getAllBooks } from "../helpers/functions"
import { Spinner } from "./Spinner"

export const BooksList = () => { 
    const { books, setBooks } = useContext(BooksContext);
    const [loading, setLoading] = useState(true);

    const styles = StyleSheet.create({ 
        container: {
            flex: 1,
            padding: 20,
        },

        contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        },
        
        text: {
            display: "flex",
            justifyContent: "center",
            alignContent: "center"
        },

        noBookText: {
            color: "white",
        },

        containerNoBooks: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 200
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await getAllBooks();
            setBooks(data);
            setLoading(false)
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <Spinner/>
        );
    }

    return books.length > 0 
    ? (
        <FlatList 
            style={styles.container}
            data={books}
            contentContainerStyle={styles.contentContainer}
            ItemSeparatorComponent={Text}
            renderItem={({item: book}) => (
                <BookItem key={book.id} {...book} />
            )}
        />
    ) : (

        <View style={styles.containerNoBooks}>
            <Text style={styles.noBookText}>No Books available</Text>
        </View>
    );
}