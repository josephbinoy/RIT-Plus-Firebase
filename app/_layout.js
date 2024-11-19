import { Stack } from 'expo-router/stack';
import { useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function Layout() {
    const router = useRouter();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('auth state changed', user);
            if (user) {
                router.replace("/(tabs)");
            } else {
                router.replace("/login");
            }
        });
        return () => unsubscribe();
    }, [auth]);

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index"  options={{ headerShown: false }} />
            <Stack.Screen name="login" />
        </Stack>
    );
}
