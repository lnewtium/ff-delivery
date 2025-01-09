import { supabase } from "@/src/utils/supabase";
import { GenericAuthScreen } from "@/src/components/GenericAuthScreen";

const SignUpPage = () => {
  const signUp = async (email: string, password: string) => {
    const res = await supabase.auth.signUp({
      email,
      password,
    });
    return res.error?.message;
  };

  return <GenericAuthScreen type={"signup"} handle={signUp} />;
};

export default SignUpPage;
