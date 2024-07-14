import { View, StyleSheet } from 'react-native';
import { BooksList } from './BooksList';
import { AppBar } from './AppBar';
import { BooksProvider } from '../context/BooksContext';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from "expo-constants"

export function Main() {
  
  return (
    <View style={styles.container}>
      <BooksProvider>
        <AppBar/>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.container}
        >
          <BooksList/>
        </LinearGradient>
      </BooksProvider>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
});
