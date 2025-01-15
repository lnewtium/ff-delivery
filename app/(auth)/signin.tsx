import { supabase } from "@/src/utils/supabase";
import { GenericAuthScreen } from "@/src/blocks/GenericAuthScreen";

const SignInPage =() => {
  const signIn = async (email: string, password: string) => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return res.error?.message;
  };

  return <GenericAuthScreen type={"signin"} handle={signIn} />;
};

export default SignInPage;
