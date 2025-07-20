import {
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  HostGrotesk_700Bold,
  useFonts,
} from "@expo-google-fonts/host-grotesk";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../styles/global.css";
import { Stack } from "expo-router";
import { AuthContext, AuthContextProvider } from "../contexts/auth-context";

SplashScreen.preventAutoHideAsync();

interface RootLayoutProvidersProps {
  children?: React.ReactNode;
}

const RootLayoutProviders: React.FC<RootLayoutProvidersProps> = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const [loaded, error] = useFonts({
    HostGrotesk_400Regular,
    HostGrotesk_500Medium,
    HostGrotesk_600SemiBold,
    HostGrotesk_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(private)" />
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>
    </Stack>
  );
};

const RootLayout: React.FC = () => {
  const isLoggedIn = true;

  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <RootLayoutProviders />
      </AuthContextProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
