import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Searchbar,
  Chip,
  Card,
  Text,
  Avatar,
  FAB,
  useTheme,
  IconButton,
  Divider,
} from 'react-native-paper';
import { useAuth } from '../context/authContext';

// Types
interface PrintJob {
  name: string
  description: string;
  amount: number;
  status: string;
  createdAt: Date;
  id: string;
  isLandscape: boolean;
  isColor: boolean;
  copies: number;
  paperFormat: string;
  file: string[];
}

interface HomeScreenProps {
  navigation?: any; // Replace with proper navigation type if using React Navigation
}

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'in-print'>('all');
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - replace with actual data fetching
  const [printJobs] = useState<PrintJob[]>([
    {
      name: 'Business Cards Design',
      description: 'Premium business cards with gold foil',
      amount: 250,
      status: 'pending',
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      id: 'ab435qjbade',
      isLandscape: true,
      isColor: false,
      copies: 2,
      paperFormat: 'a4',
      file: ['Aadhar.pdf', 'PAN.pdf']
    },
    {
      name: 'Marketing Brochures',
      description: 'Tri-fold brochures for product launch',
      amount: 450,
      status: 'processing',
      createdAt: new Date(Date.now() - 172800000), // 2 days ago
      id: 'cd789wxyz12',
      isLandscape: false,
      isColor: true,
      copies: 5,
      paperFormat: 'a3',
      file: ['Aadhar.pdf', 'PAN.pdf']
    },
    {
      name: 'Event Posters',
      description: 'Large format posters for conference',
      amount: 800,
      status: 'completed',
      createdAt: new Date(Date.now() - 259200000), // 3 days ago
      id: 'ef123pqr456',
      isLandscape: true,
      isColor: true,
      copies: 10,
      paperFormat: 'a1',
      file: ['Aadhar.pdf', 'PAN.pdf']
    },
  ]);

  // Handlers
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterPress = (filter: 'all' | 'pending' | 'in-print') => {
    setSelectedFilter(filter);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };


  const handleAddPress = () => {
    navigation.navigate('Create');
  };

  const handlePrintJobPress = (printJob: PrintJob) => {
    navigation.navigate('Details', { printData: printJob });
  };

  const handleProfilePress = () => {
    navigation.navigate('Settings');
  };

  // Utility functions
  const getStatusColor = (status: PrintJob['status']) => {
    switch (status) {
      case 'pending':
        return '#FF9800';
      case 'processing':
        return '#2196F3';
      case 'completed':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      default:
        return theme.colors.outline;
    }
  };

  const getStatusIcon = (status: PrintJob['status']) => {
    switch (status) {
      case 'pending':
        return 'clock-outline';
      case 'processing':
        return 'printer';
      case 'completed':
        return 'check-circle';
      case 'cancelled':
        return 'alert-circle';
      default:
        return 'help-circle';
    }
  };

  const filteredJobs = printJobs.filter(job => {
    const matchesSearch = job.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'pending' && job.status === 'pending') ||
      (selectedFilter === 'in-print' && job.status === 'printing');

    return matchesSearch && matchesFilter;
  });

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    return `${diffDays - 1} days ago`;
  };

  const renderPrintJob = ({ item }: { item: PrintJob }) => (
    <Card
      style={styles.card}
      onPress={() => handlePrintJobPress(item)}
      mode="elevated"
    >
      <Card.Content style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleSection}>
            <Text variant="titleMedium" style={styles.printName}>
              {item.name}
            </Text>
            {item.description && (
              <Text variant="bodySmall" style={styles.printDescription}>
                {item.description}
              </Text>
            )}
          </View>
          <View style={styles.statusSection}>
            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]}>
              <IconButton
                icon={getStatusIcon(item.status)}
                size={16}
                iconColor="white"
                style={styles.statusIcon}
              />
            </View>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.cardFooter}>
          <View style={styles.amountSection}>
            <Text variant="bodySmall" style={styles.amountLabel}>
              Amount
            </Text>
            <Text variant="titleSmall" style={styles.printAmount}>
              ${item.amount.toFixed(2)}
            </Text>
          </View>

          <View style={styles.dateSection}>
            <Text variant="bodySmall" style={styles.dateLabel}>
              {formatDate(item.createdAt)}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  const getUserInitials = () => {
    if (!user?.user?.name) return 'PP';
    return user.user.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    searchSection: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingBottom: 8,
      gap: 12,
    },
    searchbar: {
      flex: 1,
    },
    profileSection: {
      justifyContent: 'center',
    },
    avatar: {
      backgroundColor: '#6750A4',
    },
    filtersContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingBottom: 10,
      paddingTop: 10,
      gap: 8,
    },
    chip: {
      marginRight: 4,
    },
    listContainer: {
      padding: 16,
      paddingTop: 0,
      paddingBottom: 100,
    },
    card: {
      marginBottom: 16,
    },
    cardContent: {
      paddingVertical: 16,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    cardTitleSection: {
      flex: 1,
      marginRight: 16,
    },
    printName: {
      fontWeight: '600',
      marginBottom: 4,
    },
    printDescription: {
      opacity: 0.7,
      lineHeight: 18,
    },
    statusSection: {
      alignItems: 'center',
    },
    statusIndicator: {
      borderRadius: 20,
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    statusIcon: {
      margin: 0,
    },
    divider: {
      marginVertical: 8,
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingTop: 8,
    },
    amountSection: {
      flex: 1,
    },
    amountLabel: {
      opacity: 0.6,
      marginBottom: 2,
    },
    printAmount: {
      fontWeight: '600',
      fontSize: 16,
    },
    dateSection: {
      flex: 1,
      alignItems: 'flex-end',
    },
    dateLabel: {
      opacity: 0.6,
    },
    fab: {
      position: 'absolute',
      margin: 20,
      right: 0,
      bottom: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 60,
    },
    emptyText: {
      opacity: 0.6,
    },
  });


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Search Bar with Profile */}
      <View style={[styles.searchSection, { paddingTop: insets.top + 16 }]}>
        <Searchbar
          placeholder={"Search for prints"}
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
        <TouchableOpacity style={styles.profileSection} onPress={handleProfilePress}>
          {user?.user?.photo ? (
            <Avatar.Image
              size={40}
              source={{ uri: user.user.photo }}
              style={styles.avatar}
            />
          ) : (
            <Avatar.Text
              size={40}
              label={getUserInitials()}
              style={styles.avatar}

            />
          )}
        </TouchableOpacity>
      </View>

      {/* Filter Chips */}
      <View style={styles.filtersContainer}>
        <Chip
          selected={selectedFilter === 'all'}
          onPress={() => {
            handleFilterPress('all')
            console.log(user?.idToken)
          }}
          style={styles.chip}
        >
          All
        </Chip>
        <Chip
          selected={selectedFilter === 'pending'}
          onPress={() => handleFilterPress('pending')}
          style={styles.chip}
        >
          Pending
        </Chip>
        <Chip
          selected={selectedFilter === 'in-print'}
          onPress={() => handleFilterPress('in-print')}
          style={styles.chip}
        >
          In Print
        </Chip>
      </View>

      {/* Print Jobs List */}
      <FlatList
        data={filteredJobs}
        renderItem={renderPrintJob}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge" style={styles.emptyText}>
              No print jobs found
            </Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={handleAddPress}
        mode="elevated"
      />
    </View>
  );
};


export default Home;