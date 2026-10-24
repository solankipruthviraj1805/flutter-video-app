import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Play, Sun, Moon } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { VideoData } from './WatchScreen';

const MOCK_VIDEOS: VideoData[] = [
  {
    id: '1',
    title: 'Top 10 Unreal Engine 5 Features Explained',
    description: 'Learn realistic lighting, Nanite geometry, and new camera tools.',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    category: 'Gaming',
    privacy: 'public',
    creator: { username: 'tech_master', avatar_url: 'https://i.pravatar.cc/100?img=33' },
    likes_count: 3420,
    views_count: 54120,
  },
  {
    id: '2',
    title: 'Morning Daily Vlog - Autumn Walk',
    description: 'A peaceful walk in the city park with relaxing sounds.',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80',
    category: 'Vlogs',
    privacy: 'public',
    creator: { username: 'kenji_vlogs', avatar_url: 'https://i.pravatar.cc/100?img=12' },
    likes_count: 890,
    views_count: 12400,
  },
];

const CATEGORIES = ['All', 'Gaming', 'Vlogs', 'Education', 'Entertainment', 'Tech'];

export const HomeScreen = ({ navigation }: any) => {
  const { colors, theme, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVideos = selectedCategory === 'All' 
    ? MOCK_VIDEOS 
    : MOCK_VIDEOS.filter((v) => v.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.logo, { color: colors.primary }]}>StreamWave</Text>
        <TouchableOpacity onPress={toggleTheme}>
          {theme === 'dark' ? <Sun size={22} color={colors.textPrimary} /> : <Moon size={22} color={colors.textPrimary} />}
        </TouchableOpacity>
      </View>

      <View style={styles.filterWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item)}
              style={[styles.filterPill, { backgroundColor: selectedCategory === item ? colors.chipActive : colors.chipBackground }]}
            >
              <Text style={{ color: selectedCategory === item ? colors.chipActiveText : colors.textPrimary, fontWeight: '600' }}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>

      <FlatList
        data={filteredVideos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Watch', { video: item })}
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.thumbnailContainer}>
              <Image source={{ uri: item.thumbnail_url }} style={styles.cardThumbnail} />
              <View style={styles.playOverlay}>
                <Play size={18} color="#FFF" fill="#FFF" />
              </View>
            </View>
            <View style={styles.cardDetails}>
              <Image source={{ uri: item.creator.avatar_url }} style={styles.creatorAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.cardTitle, { color: colors.textPrimary }]} numberOfLines={2}>{item.title}</Text>
                <Text style={[styles.cardSub, { color: colors.textSecondary }]}>
                  {item.creator.username} • {item.views_count.toLocaleString()} views
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { height: 60, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1 },
  logo: { fontSize: 22, fontWeight: '900' },
  filterWrapper: { paddingVertical: 10 },
  filterPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  card: { borderRadius: 16, overflow: 'hidden', borderWidth: 1, marginBottom: 16 },
  thumbnailContainer: { position: 'relative', width: '100%', height: 190 },
  cardThumbnail: { width: '100%', height: '100%' },
  playOverlay: { position: 'absolute', bottom: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 20, padding: 8 },
  cardDetails: { flexDirection: 'row', padding: 12, gap: 10 },
  creatorAvatar: { width: 36, height: 36, borderRadius: 18 },
  cardTitle: { fontSize: 15, fontWeight: '600' },
  cardSub: { fontSize: 12, marginTop: 4 },
});
