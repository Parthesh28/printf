import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  StatusBar,
  ScrollView,
  Animated,
  Easing,
  Dimensions,
  BackHandler,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import {
  Searchbar,
  Chip,
  Text,
  FAB,
  useTheme,
  Appbar,
} from "react-native-paper";
import { useAuth } from "../context/authContext";
import PrintCard from "../components/printCard";
import { createHomeStyles } from "../styles/homeStyles";
import { data } from "../Data";

type Filter = "all" | "pending" | "processing" | "completed" | "cancelled";

const Home = ({ navigation }: any) => {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = createHomeStyles(theme);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchAnimation = useRef(new Animated.Value(0)).current;
  const searchbarRef = useRef<any>(null);
  const [searchIconLayout, setSearchIconLayout] = useState({ x: 0, width: 0 });
  const [selectedFilter, setSelectedFilter] = useState<Filter>("all");
  const [refreshing, setRefreshing] = useState(false);

  const handleOpenSearch = () => setIsSearchVisible(true);
  const handleCloseSearch = () => {
    searchbarRef.current?.blur();
    setIsSearchVisible(false);
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isSearchVisible) {
          handleCloseSearch();
          return true;
        } else {
          return false;
        }
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [isSearchVisible])
  );

  useEffect(() => {
    const animationConfig = {
      duration: isSearchVisible ? 300 : 250,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    };
    Animated.timing(searchAnimation, {
      toValue: isSearchVisible ? 1 : 0,
      ...animationConfig,
    }).start(() => {
      if (isSearchVisible) {
        searchbarRef.current?.focus();
      } else {
        setSearchQuery("");
      }
    });
  }, [isSearchVisible, searchAnimation]);

  const { width: screenWidth } = Dimensions.get("window");
  const SEARCHBAR_HEIGHT = 40;
  const PADDING_HORIZONTAL = 10;
  const targetSearchbarWidth = screenWidth - PADDING_HORIZONTAL * 2;
  const animatedSearchbarWidth = searchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [searchIconLayout.width, targetSearchbarWidth],
  });
  // --- REMOVED: animatedSearchbarTranslateX IS NO LONGER NEEDED HERE ---
  const animatedSearchbarBorderRadius = searchAnimation.interpolate({ inputRange: [0, 0.5, 1], outputRange: [SEARCHBAR_HEIGHT / 2, 15, 28] });
  const defaultHeaderOpacity = searchAnimation.interpolate({ inputRange: [0, 0.5], outputRange: [1, 0], extrapolate: "clamp" });
  const animatedSearchbarOpacity = searchAnimation.interpolate({ inputRange: [0, 0.1], outputRange: [0, 1], extrapolate: 'clamp' });

  const filters: Filter[] = ["all", "pending", "processing", "completed", "cancelled"];
  const filteredJobs = data.filter((job) => job.name.toLowerCase().includes(searchQuery.toLowerCase()) && (selectedFilter === "all" || job.status === selectedFilter));
  const chipBaseStyle = { marginRight: 8, height: 34, alignSelf: "center" as const, paddingHorizontal: 12, borderRadius: 10, justifyContent: "center" as const };
  const chipSelectedStyle = { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary, borderWidth: 1 };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme.dark ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />

      <Appbar.Header style={[styles.appbar, { height: Appbar.DEFAULT_APPBAR_HEIGHT + insets.top, justifyContent: 'flex-end' }]}>
        <View style={styles.headerContentContainer}>
          <Animated.View
            style={[styles.defaultHeaderItems, { opacity: defaultHeaderOpacity }]}
            pointerEvents={isSearchVisible ? "none" : "auto"}
          >
            <Appbar.Content title="PrintF" titleStyle={styles.logo} />
            <Appbar.Action
              icon="magnify"
              onPress={handleOpenSearch}
              onLayout={(event) => {
                const { x, width } = event.nativeEvent.layout;
                setSearchIconLayout({ x, width });
              }}
            />
            <Appbar.Action icon="cog" onPress={() => navigation.navigate("Settings")} />
          </Animated.View>

          {/* --- UPDATED: No translateX here --- */}
          <Animated.View
            style={[
              styles.searchbarContainer,
              {
                opacity: animatedSearchbarOpacity,
              },
            ]}
            pointerEvents={isSearchVisible ? 'auto' : 'none'}
          >
            <Searchbar
              ref={searchbarRef}
              placeholder="Search for prints"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onIconPress={handleCloseSearch}
              icon="arrow-left"
              style={[
                styles.searchbar,
                { width: animatedSearchbarWidth, borderRadius: animatedSearchbarBorderRadius }
              ]}
              onBlur={handleCloseSearch}
              inputStyle={{ minHeight: 0 }}
            />
          </Animated.View>
        </View>
      </Appbar.Header>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: "center", paddingHorizontal: 15 }}>
          {filters.map((item) => {
            const isSelected = selectedFilter === item;
            const label = item === "all" ? "All" : item.charAt(0).toUpperCase() + item.slice(1);
            return (<Chip key={item} selected={isSelected} selectedColor={theme.colors.onPrimary} onPress={() => setSelectedFilter(item)} style={[chipBaseStyle, isSelected ? chipSelectedStyle : undefined]} >{label}</Chip>);
          })}
        </ScrollView>
      </View>
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PrintCard navigation={navigation} item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(false)} />}
        ListEmptyComponent={<View style={styles.emptyContainer}><Text variant="bodyLarge" style={styles.emptyText}>No print jobs found</Text></View>}
        extraData={[searchQuery, selectedFilter]}
      />
      <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate("Create")} />
    </View>
  );
};

export default Home;