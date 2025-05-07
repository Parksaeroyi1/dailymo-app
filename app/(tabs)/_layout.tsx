import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "black" }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />, // Use the color prop
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          headerTitle: "Favourite",
          tabBarIcon: ({ color }) => <Ionicons name="trophy" size={24} color={color} />, // Use the color prop
        }}
      />
    </Tabs>
  );
}
