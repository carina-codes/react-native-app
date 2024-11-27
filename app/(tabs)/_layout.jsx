import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";
import { icons } from '../../constants';

// Reusable Tab Label Component
const TabLabel = ({ focused, color, title }) => (
  <Text
    style={{
      fontSize: 12,
      fontWeight: focused ? '600' : '400', 
      color: color, 
    }}
  >
    {title}
  </Text>
);

// Reusable Tab Icon Component
const TabIcon = ({ icon, color }) => (
  <View className="items-center justify-center">
    <Image 
      source={icon}
      resizeMode="contain"
      tintColor={color}
      className="w-6 h-6 mb-2"
    />
  </View>
);

const TabsLayout = () => {
  const tabOptions = (icon, title) => ({
    title: title,
    headerShown: false,
    tabBarIcon: ({ color }) => <TabIcon icon={icon} color={color} />,
    tabBarLabel: ({ focused, color }) => <TabLabel focused={focused} color={color} title={title} />,
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 84,
        },
      }}
    >
      <Tabs.Screen name="home" options={tabOptions(icons.home, "Home")} />
      <Tabs.Screen name="bookmark" options={tabOptions(icons.bookmark, "Bookmark")} />
      <Tabs.Screen name="create" options={tabOptions(icons.plus, "Create")} />
      <Tabs.Screen name="profile" options={tabOptions(icons.profile, "Profile")} />
    </Tabs>
  );
};

export default TabsLayout;