import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/src/utils/supabase";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getProducts: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase.from("products").select("id,img,text,special_offer,top_selling");
        if (error) return { error };
        return { data };
      },
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
