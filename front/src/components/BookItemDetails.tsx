import React from "react";
import { Modal, Text, StyleSheet, Image, View, TouchableWithoutFeedback } from "react-native";
import { BookModalProps } from "../config/types";

export const BookItemDetails: React.FC<BookModalProps> = ({ onHide, ...props }) => {
  const { id, title, author, year, type, description, img } = props
  const defaultImg = 'https://via.placeholder.com/240x200?text=No+Image';

  const style = StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },

    modalView: {
      marginVertical: 80,
      width: 320,
      height: "auto",
      marginHorizontal: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      gap: 10,
      overflow: "hidden",
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

    img: {
      width: '100%',
      height: 300,
      resizeMode: 'cover',
      marginBottom: 10,
    },

    strong: {
      fontWeight: "bold"
    },

    main: {
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 5
    },
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
    >
        <View style={style.modalBackground}>
            <TouchableWithoutFeedback onPress={onHide}>
                <View style={style.modalBackground}>
                    <TouchableWithoutFeedback>
                        <View style={style.modalView}>
                        <Image
                            style={style.img}
                            source={{ uri: img || defaultImg }}
                        />
                        <View style={style.main}>
                            <Text><Text style={style.strong}>Title:</Text> {title}</Text>
                            <Text><Text style={style.strong}>Author:</Text> {author}</Text>
                            <Text><Text style={style.strong}>Publication year:</Text> {year}</Text>
                            <Text><Text style={style.strong}>Type:</Text> {type}</Text>
                            <Text><Text style={style.strong}>Description:</Text> {description}</Text>
                        </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </View>
    </Modal>
  );
};
