import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/supabase/supabase";

export const supabase = createClient<Database>(
  // @ts-ignore
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  // @ts-ignore
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
