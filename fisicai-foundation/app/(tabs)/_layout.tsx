import { Tabs } from 'expo-router';
import { Text } from 'react-native';

import { DESIGN_TOKENS } from '../../constants';

type TabIconProps = {
  emoji: string;
  focused: boolean;
};

function TabIcon({ emoji, focused }: TabIconProps): JSX.Element {
  return (
    <Text
      className={focused ? 'text-xl opacity-100' : 'text-xl opacity-50'}
      accessibilityElementsHidden
      importantForAccessibility="no"
    >
      {emoji}
    </Text>
  );
}

export default function TabsLayout(): JSX.Element {
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
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
        }}
      />

      <Tabs.Screen
        name="estudar"
        options={{
          title: 'Estudar',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📚" focused={focused} />,
        }}
      />

      <Tabs.Screen
        name="progresso"
        options={{
          title: 'Progresso',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📈" focused={focused} />,
        }}
      />

      <Tabs.Screen
        name="ajuda-ia"
        options={{
          title: 'Ajuda IA',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🤖" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
