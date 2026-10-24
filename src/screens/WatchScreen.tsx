import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Volume2, VolumeX, Shield, Heart } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export interface VideoData {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  category: string;
  privacy: 'public' | 'friends' | 'private';
  creator: {
    username: string;
    avatar_url: string;
  };
  likes_count: number;
  views_count: number;
}

export const WatchScreen = ({ route }: { route: { params: { video: VideoData } } }) => {
  const { video } = route.params;
  const { colors } = useTheme();
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const player = useVideoPlayer(video.video_url, (p) => {
    p.loop = true;
    p.play();
  });

  const toggleMute = () => {
    player.muted = !player.muted;
    setIsMuted(player.muted);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.playerContainer}>
        <VideoView
          player={player}
          style={styles.videoSurface}
          allowsFullscreen
          allowsPictureInPicture
          showsTimecodes
        />
        <View style={styles.floatingControls}>
          <TouchableOpacity onPress={toggleMute} style={styles.controlPill}>
            {isMuted ? <VolumeX size={18} color="#FFF" /> : <Volume2 size={18} color="#FFF" />}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.detailsContent}>
        <View style={styles.headerRow}>
          <Text style={[styles.categoryBadge, { backgroundColor: colors.chipBackground, color: colors.textSecondary }]}>
            {video.category}
          </Text>
          <View style={styles.privacyIndicator}>
            <Shield size={14} color={colors.primary} />
            <Text style={[styles.privacyText, { color: colors.textSecondary }]}>
              {video.privacy.toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={[styles.title, { color: colors.textPrimary }]}>{video.title}</Text>
        <Text style={[styles.metadata, { color: colors.textSecondary }]}>
          {video.views_count.toLocaleString()} views
        </Text>

        <View style={[styles.creatorStrip, { borderBottomColor: colors.border, borderTopColor: colors.border }]}>
          <Image source={{ uri: video.creator.avatar_url }} style={styles.avatar} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.creatorName, { color: colors.textPrimary }]}>{video.creator.username}</Text>
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Creator</Text>
          </View>
          <TouchableOpacity 
            onPress={() => setIsLiked(!isLiked)} 
            style={[styles.likeBtn, { backgroundColor: isLiked ? colors.primary : colors.chipBackground }]}
          >
            <Heart size={18} color={isLiked ? '#FFF' : colors.textPrimary} fill={isLiked ? '#FFF' : 'none'} />
            <Text style={{ marginLeft: 6, color: isLiked ? '#FFF' : colors.textPrimary }}>
              {video.likes_count + (isLiked ? 1 : 0)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.descriptionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.descriptionTitle, { color: colors.textPrimary }]}>Description</Text>
          <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>{video.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  playerContainer: { width: width, height: (width * 9) / 16, backgroundColor: '#000' },
  videoSurface: { flex: 1 },
  floatingControls: { position: 'absolute', bottom: 12, right: 12 },
  controlPill: { backgroundColor: 'rgba(0,0,0,0.6)', padding: 8, borderRadius: 20 },
  detailsContent: { padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  categoryBadge: { fontSize: 12, fontWeight: '600', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  privacyIndicator: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  privacyText: { fontSize: 12, fontWeight: 'bold' },
  title: { fontSize: 18, fontWeight: '700', lineHeight: 24 },
  metadata: { fontSize: 13, marginTop: 4 },
  creatorStrip: { flexDirection: 'row', alignItems: 'center', marginVertical: 16, paddingVertical: 12, borderTopWidth: 1, borderBottomWidth: 1 },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  creatorName: { fontSize: 15, fontWeight: '600' },
  likeBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  descriptionCard: { padding: 14, borderRadius: 12, borderWidth: 1, marginTop: 4 },
  descriptionTitle: { fontWeight: '600', marginBottom: 4 },
  descriptionText: { fontSize: 14, lineHeight: 20 },
});
