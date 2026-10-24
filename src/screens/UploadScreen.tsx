import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { UploadCloud, Image as ImageIcon, Video, Lock, Users, Globe } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

const CATEGORIES = ['Entertainment', 'Vlogs', 'Education', 'Gaming', 'Tech'] as const;
type PrivacyType = 'public' | 'friends' | 'private';

export const UploadScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [thumbnailUri, setThumbnailUri] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('Entertainment');
  const [privacy, setPrivacy] = useState<PrivacyType>('public');
  const [isUploading, setIsUploading] = useState(false);

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) setVideoUri(result.assets[0].uri);
  };

  const pickThumbnail = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled) setThumbnailUri(result.assets[0].uri);
  };

  const handleUpload = async () => {
    if (!videoUri || !title) {
      Alert.alert('Incomplete', 'Please select a video and title.');
      return;
    }
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      Alert.alert('Uploaded', 'Your video is published!');
      navigation.navigate('Feed');
    }, 1500);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.screenHeading, { color: colors.textPrimary }]}>Daily Upload</Text>

      <TouchableOpacity onPress={pickVideo} style={[styles.uploadBox, { borderColor: colors.border, backgroundColor: colors.card }]}>
        <Video size={32} color={videoUri ? colors.primary : colors.textSecondary} />
        <Text style={[styles.uploadBoxText, { color: colors.textPrimary }]}>
          {videoUri ? 'Video Selected ✔' : 'Select Video File'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={pickThumbnail} style={[styles.thumbnailBox, { borderColor: colors.border, backgroundColor: colors.card }]}>
        {thumbnailUri ? (
          <Image source={{ uri: thumbnailUri }} style={styles.thumbnailPreview} />
        ) : (
          <View style={styles.centerRow}>
            <ImageIcon size={20} color={colors.textSecondary} />
            <Text style={{ color: colors.textSecondary, marginLeft: 8 }}>Select Thumbnail</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.textPrimary, borderColor: colors.border }]}
        placeholder="Video Title"
        placeholderTextColor={colors.textSecondary}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.textArea, { backgroundColor: colors.card, color: colors.textPrimary, borderColor: colors.border }]}
        placeholder="Description"
        placeholderTextColor={colors.textSecondary}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            style={[styles.categoryChip, { backgroundColor: category === cat ? colors.primary : colors.chipBackground }]}
          >
            <Text style={{ color: category === cat ? '#FFF' : colors.textSecondary, fontWeight: '600' }}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Visibility</Text>
      <View style={styles.privacyGroup}>
        {(['public', 'friends', 'private'] as PrivacyType[]).map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setPrivacy(type)}
            style={[styles.privacyOption, { borderColor: privacy === type ? colors.primary : colors.border, backgroundColor: colors.card }]}
          >
            {type === 'public' && <Globe size={18} color={privacy === type ? colors.primary : colors.textSecondary} />}
            {type === 'friends' && <Users size={18} color={privacy === type ? colors.primary : colors.textSecondary} />}
            {type === 'private' && <Lock size={18} color={privacy === type ? colors.primary : colors.textSecondary} />}
            <Text style={[styles.privacyLabel, { color: privacy === type ? colors.primary : colors.textPrimary }]}>
              {type.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={handleUpload} disabled={isUploading} style={[styles.publishBtn, { backgroundColor: colors.primary }]}>
        {isUploading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.publishBtnText}>Publish Video</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  screenHeading: { fontSize: 22, fontWeight: '800', marginBottom: 16 },
  uploadBox: { height: 100, borderWidth: 1.5, borderStyle: 'dashed', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  uploadBoxText: { marginTop: 6, fontWeight: '600' },
  thumbnailBox: { height: 120, borderWidth: 1, borderRadius: 12, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  thumbnailPreview: { width: '100%', height: '100%' },
  centerRow: { flexDirection: 'row', alignItems: 'center' },
  input: { height: 48, borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, marginBottom: 12 },
  textArea: { height: 80, borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 16, textAlignVertical: 'top' },
  sectionTitle: { fontSize: 15, fontWeight: '700', marginBottom: 10 },
  categoryChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  privacyGroup: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  privacyOption: { flex: 1, alignItems: 'center', paddingVertical: 12, borderWidth: 1.5, borderRadius: 10, marginHorizontal: 3, gap: 4 },
  privacyLabel: { fontSize: 11, fontWeight: 'bold' },
  publishBtn: { height: 50, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  publishBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});
