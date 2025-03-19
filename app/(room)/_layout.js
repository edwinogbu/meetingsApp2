import { Stack } from 'expo-router';

export default function RoomLayout() {
  return (
    // <Stack screenOptions={{ headerShown: false }}>
    <Stack>
      <Stack.Screen name="[id]" options={{ title: 'Room Details' }} />
    </Stack>
  );
}


// import React from 'react'

// import { Stack } from 'expo-router';

// export default function RoomLayout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="[id]" />
//     </Stack>
//   );
// }
