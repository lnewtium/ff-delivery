import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/src/utils/supabase";
import { useAppSelector } from "@/src/utils/reactTools";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query({
      queryFn: async ({ id }: { id: string }) => {
        const { data, error } = await supabase
          .from("profiles")
          .select("address, full_name, city, state, zip")
          .eq("id", id)
          .single();
        if (error) return { error };
        return { data };
      },
      providesTags: ["Profile"],
    }),
    setProfile: builder.mutation({
      queryFn: async ({
        address,
        full_name,
        city,
        state,
        zip,
        id,
      }: setProfileType & { id: string }) => {
        const { data, error } = await supabase
          .from("profiles")
          .update({
            address,
            full_name,
            city,
            state,
            zip,
          })
          .eq("id", id)
          .single();
        if (error) return { error };
        return { data };
      },
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const useGetProfileQuery = () => {
  const session = useAppSelector((state) => state.auth.authSession);
  return profileApi.useGetProfileQuery({ id: session!.user.id });
};

type setProfileType = {
  address: string | null;
  full_name: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
};

export const { useSetProfileMutation } = profileApi;
