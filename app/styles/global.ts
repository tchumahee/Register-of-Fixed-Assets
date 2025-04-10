import { StyleSheet } from "react-native";
import colors from "./colors";

const globalStyles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.background
    },

    textDark: {
        color: colors.textDark,
        fontSize: 16
    },

    textLight: {
        color: colors.textLight,
        fontSize: 16
    }
})

export default globalStyles;