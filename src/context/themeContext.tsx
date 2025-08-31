import { View, Text } from 'react-native'
import React from 'react'
import { MD3Theme } from 'react-native-paper/lib/typescript/types'
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'


const LightTheme: MD3Theme = {
    ...MD3LightTheme,
    roundness: 4,
    "colors": {
        "primary": "rgb(73, 88, 169)",
        "onPrimary": "rgb(255, 255, 255)",
        "primaryContainer": "rgb(222, 224, 255)",
        "onPrimaryContainer": "rgb(0, 16, 91)",
        "secondary": "rgb(91, 93, 114)",
        "onSecondary": "rgb(255, 255, 255)",
        "secondaryContainer": "rgb(224, 225, 249)",
        "onSecondaryContainer": "rgb(24, 26, 44)",
        "tertiary": "rgb(119, 83, 109)",
        "onTertiary": "rgb(255, 255, 255)",
        "tertiaryContainer": "rgb(255, 215, 241)",
        "onTertiaryContainer": "rgb(45, 18, 40)",
        "error": "rgb(186, 26, 26)",
        "onError": "rgb(255, 255, 255)",
        "errorContainer": "rgb(255, 218, 214)",
        "onErrorContainer": "rgb(65, 0, 2)",
        "background": "rgb(254, 251, 255)",
        "onBackground": "rgb(27, 27, 31)",
        "surface": "rgb(254, 251, 255)",
        "onSurface": "rgb(27, 27, 31)",
        "surfaceVariant": "rgb(227, 225, 236)",
        "onSurfaceVariant": "rgb(70, 70, 79)",
        "outline": "rgb(118, 118, 128)",
        "outlineVariant": "rgb(199, 197, 208)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(48, 48, 52)",
        "inverseOnSurface": "rgb(243, 240, 244)",
        "inversePrimary": "rgb(186, 195, 255)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(245, 243, 251)",
            "level2": "rgb(240, 238, 248)",
            "level3": "rgb(234, 233, 246)",
            "level4": "rgb(232, 231, 245)",
            "level5": "rgb(229, 228, 243)"
        },
        "surfaceDisabled": "rgba(27, 27, 31, 0.12)",
        "onSurfaceDisabled": "rgba(27, 27, 31, 0.38)",
        "backdrop": "rgba(47, 48, 56, 0.4)"
    },
}
const DarkTheme: MD3Theme = {
    ...MD3DarkTheme,
    roundness: 4,
    "colors": {
        "primary": "rgb(186, 195, 255)",
        "onPrimary": "rgb(23, 39, 120)",
        "primaryContainer": "rgb(49, 63, 144)",
        "onPrimaryContainer": "rgb(222, 224, 255)",
        "secondary": "rgb(195, 197, 221)",
        "onSecondary": "rgb(45, 47, 66)",
        "secondaryContainer": "rgb(67, 70, 89)",
        "onSecondaryContainer": "rgb(224, 225, 249)",
        "tertiary": "rgb(229, 186, 215)",
        "onTertiary": "rgb(68, 38, 61)",
        "tertiaryContainer": "rgb(93, 60, 85)",
        "onTertiaryContainer": "rgb(255, 215, 241)",
        "error": "rgb(255, 180, 171)",
        "onError": "rgb(105, 0, 5)",
        "errorContainer": "rgb(147, 0, 10)",
        "onErrorContainer": "rgb(255, 180, 171)",
        "background": "rgb(27, 27, 31)",
        "onBackground": "rgb(228, 225, 230)",
        "surface": "rgb(27, 27, 31)",
        "onSurface": "rgb(228, 225, 230)",
        "surfaceVariant": "rgb(70, 70, 79)",
        "onSurfaceVariant": "rgb(199, 197, 208)",
        "outline": "rgb(144, 144, 154)",
        "outlineVariant": "rgb(70, 70, 79)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(228, 225, 230)",
        "inverseOnSurface": "rgb(48, 48, 52)",
        "inversePrimary": "rgb(73, 88, 169)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(35, 35, 42)",
            "level2": "rgb(40, 40, 49)",
            "level3": "rgb(45, 46, 56)",
            "level4": "rgb(46, 47, 58)",
            "level5": "rgb(49, 51, 62)"
        },
        "surfaceDisabled": "rgba(228, 225, 230, 0.12)",
        "onSurfaceDisabled": "rgba(228, 225, 230, 0.38)",
        "backdrop": "rgba(47, 48, 56, 0.4)"
    }
}


const ThemeProvider = () => {
    return (
        <View>
            <Text>themeContext</Text>
        </View>
    )
}

export default ThemeProvider