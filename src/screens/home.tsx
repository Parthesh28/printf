import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  StatusBar,
  ScrollView,
  Animated,
  Easing,
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
        }
        return false;
      };
      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => subscription.remove();
    }, [isSearchVisible])
  );

  useEffect(() => {
    Animated.timing(searchAnimation, {
      toValue: isSearchVisible ? 1 : 0,
      duration: 350,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Smoother easing
      useNativeDriver: false,
    }).start(() => {
      if (isSearchVisible) {
        searchbarRef.current?.focus();
      } else {
        setSearchQuery("");
      }
    });
  }, [isSearchVisible, searchAnimation]);

  const defaultHeaderOpacity = searchAnimation.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const searchbarOpacity = searchAnimation.interpolate({
    inputRange: [0.3, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const searchbarWidth = searchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['15%', '100%'],
  });

  const filters: Filter[] = ["all", "pending", "processing", "completed", "cancelled"];
  const filteredJobs = data.filter(
    (job) =>
      job.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedFilter === "all" || job.status === selectedFilter)
  );

  const renderFilterChip = (item: Filter) => {
    const isSelected = selectedFilter === item;
    const label = item.charAt(0).toUpperCase() + item.slice(1);
    return (
      <Chip
        showSelectedCheck={false}
        key={item}
        selected={isSelected}
        onPress={() => setSelectedFilter(item)}
        style={[styles.chip, isSelected && styles.selectedChip]}
        textStyle={[styles.chipText, isSelected && styles.selectedChipText]}
      >
        {label}
      </Chip>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme.dark ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />

      <Appbar.Header style={[styles.appbar, { height: 0 + insets.top }]}>
        <View style={styles.headerContentContainer}>
          <Animated.View
            style={[styles.defaultHeaderItems, { opacity: defaultHeaderOpacity }]}
            pointerEvents={isSearchVisible ? "none" : "auto"}
          >
            <Appbar.Content title="PrintF" titleStyle={styles.logo} />
            <Appbar.Action icon="magnify" onPress={handleOpenSearch} />
            <Appbar.Action icon="cog" onPress={() => navigation.navigate("Settings")} />
          </Animated.View>

          <Animated.View
            style={[styles.searchbarWrapper, { width: searchbarWidth, opacity: searchbarOpacity }]}
            pointerEvents={isSearchVisible ? 'auto' : 'none'}
          >
            <Searchbar
              ref={searchbarRef}
              placeholder="Search for prints"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onIconPress={handleCloseSearch}
              icon="arrow-left"
              style={styles.searchbar}
              onBlur={() => { if (searchQuery === "") handleCloseSearch() }}
              inputStyle={{ minHeight: 0 }}
            />
          </Animated.View>
        </View>
      </Appbar.Header>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContentContainer}>
          {filters.map(renderFilterChip)}
        </ScrollView>
      </View>

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PrintCard navigation={navigation} item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(false)} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge" style={styles.emptyText}>No print jobs found</Text>
          </View>
        }
      />
      <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate("Create")} />
    </View>
  );
};

export default Home;