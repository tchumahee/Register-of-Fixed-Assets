import { StyleSheet, ViewStyle } from "react-native";
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

const baseFloatingButton = {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 30,
};

const globalStyles = StyleSheet.create({

    listItem: {
        margin: 3,
        padding: 10,
        height: 50,
        flex: 1,
        borderBottomWidth: 1,
        backgroundColor: colors.cardBackground,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
      },

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
        fontSize: 16,
    },
    textLightInd: {
        color: colors.textLight,
        fontSize: 16,
        marginLeft:10
    },
    textLightS: {
        color: colors.textLight,
        fontSize: 10
    },
    textLabel: {
        fontSize: 16,
        color: colors.primary
    },

    floatingButtonRight: {
        ...baseFloatingButton,
        right: 30,
        bottom: 30,
    } as ViewStyle,

    floatingButtonLeft: {
        ...baseFloatingButton,
        left: 30,
        bottom: 30,
        backgroundColor: colors.primary
    } as ViewStyle,

    modalWindow: {
        flex: 1,
        backgroundColor: 'black',
        
    },

    contentContainer: {
        flex:1,
        margin: 30,
    },
    infoContainer: {
        flex:1,
        flexDirection: 'column',
        borderRadius: 20,
        // borderWidth: 2,
        // borderColor: colors.secondaryDarker,
        minHeight: 90,
        padding: 20,
        backgroundColor: colors.containerBackground,
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

    buttonAddListItem: {
        ...baseButton,
        backgroundColor: colors.secondaryDarker,
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center'
    },

    buttonCameraShutter: {
        height: 70,
        width: 70,
        borderRadius: 35,
        backgroundColor: colors.primary,
        borderWidth: 3,
        borderColor: colors.primaryLighter,
        position: 'absolute',
        bottom: 70,
        alignSelf: 'center'
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
        backgroundColor: colors.inputBackground,
        margin: 5,
        padding: 7,
        borderRadius: 8,
        color: colors.inputTextColor,
        fontSize: 17,
        height: 40
    },

    dropdown: {
        backgroundColor: colors.inputBackground,
        color: colors.inputTextColor,
        height: 50,
        maxHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        margin: 5,
        flex:1
    },
    dropdownItem: {
        backgroundColor: colors.inputBackground,
        color: 'white'
    },

    separator: {
        height: 3,
        borderRadius: 1,
        margin: 10,
        backgroundColor: colors.primaryLighter
    },

    infoRow: {
        flexDirection: "row", marginBottom: 5,
        flexWrap: 'wrap',
    }
})

export default globalStyles;