import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const createHomeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    appbar: {
      backgroundColor: theme.colors.background,
      elevation: 0,
    },
    headerContentContainer: {
      position: 'relative',
      width: '100%',
      paddingHorizontal:8,
      justifyContent: 'center', // This ensures its children are centered vertically if they don't fill
    },
    defaultHeaderItems: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    logo: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.colors.onBackground,
      marginLeft: 6,
    },
    searchbarContainer: {
      position: "absolute",
      width: '100%', // Take full width
      alignSelf: 'center', // Center itself within headerContentContainer
      alignItems: 'center', // Center its children (the Searchbar)
      paddingHorizontal: 10, // Apply padding here to control overall horizontal spacing
    },
    searchbar: {
      height: 56,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    filtersContainer: {
      flexDirection: "row",
      paddingBottom: 10,
      paddingTop: 10,
      paddingLeft: 1,
    },
    chip: {
      marginRight: 1,
    },
    listContainer: {
      padding: 16,
      paddingTop: 0,
      paddingBottom: 100,
    },
    fab: {
      position: "absolute",
      margin: 20,
      right: 0,
      bottom: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 60,
    },
    emptyText: {
      opacity: 0.6,
    },
  });