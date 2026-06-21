import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

import { DESIGN_TOKENS } from '../../constants';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

type TabIconProps = {
  name: IoniconsName;
  color: string;
  size: number;
};

function TabIcon({ name, color, size }: TabIconProps) {
  return <Ionicons name={name} size={size} color={color} />;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: DESIGN_TOKENS.colors.primary,
        tabBarInactiveTintColor: DESIGN_TOKENS.colors.textMuted,
        tabBarStyle: {
          height: 68,
          paddingTop: 8,
          paddingBottom: 10,
          backgroundColor: DESIGN_TOKENS.colors.surface,
          borderTopColor: DESIGN_TOKENS.colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="estudar/index"
        options={{
          title: 'Estudar',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="book-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="progresso/index"
        options={{
          title: 'Progresso',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="stats-chart-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="ia/index"
        options={{
          title: 'Ajuda IA',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="chatbubble-ellipses-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
