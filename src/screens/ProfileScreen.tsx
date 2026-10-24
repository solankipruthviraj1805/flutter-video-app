import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Lock, Users, Globe } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

export const ProfileScreen = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'public' | 'friends' | 'private'>('public');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://i.pravatar.cc/150?img=60' }} style={styles.avatar} />
        <Text style={[styles.name, { color: colors.textPrimary }]}>Alex Morgan</Text>
        <Text style={{ color: colors.textSecondary }}>@alexmorgan • 1.2k followers</Text>
      </View>

      <View style={[styles.tabBar, { borderBottomColor: colors.border }]}>
        {(['public', 'friends', 'private'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tabItem, activeTab === tab && { borderBottomColor: colors.primary, borderBottomWidth: 2 }]}
          >
            {tab === 'public' && <Globe size={16} color={activeTab === tab ? colors.primary : colors.textSecondary} />}
            {tab === 'friends' && <Users size={16} color={activeTab === tab ? colors.primary : colors.textSecondary} />}
            {tab === 'private' && <Lock size={16} color={activeTab === tab ? colors.primary : colors.textSecondary} />}
            <Text style={{ color: activeTab === tab ? colors.primary : colors.textSecondary, fontWeight: '600', marginLeft: 6, fontSize: 12 }}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.emptyContainer}>
        <Text style={{ color: colors.textSecondary }}>No {activeTab} uploads yet.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 28 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  name: { fontSize: 18, fontWeight: '700' },
  tabBar: { flexDirection: 'row', borderBottomWidth: 1 },
  tabItem: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
