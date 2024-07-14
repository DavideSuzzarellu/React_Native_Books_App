import { useState } from "react"
import { TextInput, StyleSheet, Text, View } from "react-native"
import { useField } from "formik"


interface FormikInputValueProps {
    name: string;
    placeholder: string;
}

export const FormikInputValue: React.FC<FormikInputValueProps> = ({ name, placeholder }) => {
    const [field, meta] = useField(name);
    const [focused, setFocused] = useState(false);

    return (
        <View>
            <TextInput
                style={[styles.input, focused && styles.inputFocused]}
                onFocus={() => setFocused(true)} 
                onBlur={() => setFocused(false)} 
                placeholder={placeholder}
                value={field.value}
                onChangeText={field.onChange(name)}
            />
            {meta.touched && meta.error ? (
                <Text style={styles.errorText}>{meta.error}</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    },

    inputFocused: {
        borderColor: 'black',  
        borderWidth: 1,      
        padding: 10,
    },

    errorText: {
        color: 'red',
        marginTop: 0,
        fontSize: 12
    },
});