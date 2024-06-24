import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'New Post',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="post-add" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="posts"
        options={{
          title: 'View Posts',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="postage-stamp" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
