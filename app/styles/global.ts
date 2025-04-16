import { StyleSheet } from "react-native";
import colors from "./colors";
import { CurrentRenderContext } from "@react-navigation/native";

const baseButton = {
    borderRadius: 10,
    margin: 10,
    padding: 10,
    minWidth: 125,
    height: 45,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
};

const baseHeader = {
    fontSize: 30,
    fontWeight: '600' as const,
};

const globalStyles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        padding: 2,
        margin: 8,
        backgroundColor: colors.background
    },

    textDark: {
        color: colors.textDark,
        fontSize: 16
    },

    textLight: {
        color: colors.textLight,
        fontSize: 16
    },
    textLabel: {
        fontSize: 16,
        color: colors.secondary
    },

    floatingButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: colors.secondary,
        borderRadius: 30,
    },

    modalWindow: {
        flex: 1,
        backgroundColor: 'black'
    },

    contentContainer: {
        flex:1,
        margin: 30
    },
    infoContainer: {
        flexDirection: 'column',
        marginTop: 30,
        borderRadius: 20,
        // borderWidth: 2,
        // borderColor: colors.secondaryDarker,
        minHeight: 90,
        padding: 15,
        backgroundColor: colors.containerBackground
    },

    infoTextLight: {
        color: 'white',
        fontSize: 20
    },

    headerLight: {
        ...baseHeader,
        color: 'white',
      },
      headerDark: {
        ...baseHeader,
        color: 'black',
      },

    buttonPrimary: {
        ...baseButton,
        backgroundColor: colors.secondary,
    },

    buttonSecondary: {
        ...baseButton,
        backgroundColor: colors.secondaryDarker,
    },

    buttonViewH: {
        flexDirection: 'row'
    },

    buttonViewV: {
        flexDirection: 'column',
        marginTop: 20
    },

    buttonViewHR: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    optionsButton: {
      backgroundColor: colors.containerBackground,
      borderWidth: 0.2,
      borderColor: 'white',
      borderRadius: 10,
      height: 40,
      width: 40,  
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5
    },

    textInput: {
        backgroundColor: 'black',
        margin: 5,
        padding: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.secondary,
        color: 'white',
        fontSize: 20
    },
})

export default globalStyles;