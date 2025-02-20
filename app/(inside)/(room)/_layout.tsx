import { Stack } from 'expo-router';

export default function RoomLayout() {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ title: 'Room Details' }} />
    </Stack>
  );
}
