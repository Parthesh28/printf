import { StyleSheet } from "react-native";
import { MD3Theme} from "react-native-paper";

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
      flex: 1,
      width: '100%',
      position: 'relative',
      justifyContent: 'flex-end', // Aligns content to bottom of appbar
      paddingHorizontal: 8,
    },
    defaultHeaderItems: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      height: 50,
    },
    logo: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.colors.onBackground,
      marginLeft: 6,
    },
    // Wrapper for the searchbar to position it correctly
    searchbarWrapper: {
      position: "absolute",
      top: 0,
      right: 8, // Aligns start of animation to the right
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    searchbar: {
      width: '100%',
      height: 50,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    filtersContainer: {
      paddingVertical: 12,
    },
    filtersContentContainer: {
      paddingHorizontal: 16,
      gap: 8,
    },
    chip: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 20,
    },
    selectedChip: {
      backgroundColor: theme.colors.primary,
    },
    chipText: {
      color: theme.colors.onSurfaceVariant,
    },
    selectedChipText: {
      color: theme.colors.onPrimary,
    },
    listContainer: {
      paddingHorizontal: 16,
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