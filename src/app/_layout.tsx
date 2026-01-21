import { Stack } from "expo-router";
import {StatusBar} from "expo-status-bar";


export default function RootLayout() {
  return (
      <Stack>
          <Stack.Screen name="(tabs)/index" options={{headerShown : true , title : "Home "}}/>
          <Stack.Screen name= "proverbs/[id]" options={({route}) => ({title : "Proverb ID " + route.params})}/>
      </Stack>
  );
}
