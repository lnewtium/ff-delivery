import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/src/utils/supabase";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getProducts: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase
          .from("products")
          .select("id,img,text,special_offer,top_selling,price");
        if (error) return { error };
        return { data };
      },
    }),
    getProductById: builder.query({
      queryFn: async ({ id }: { id: string }) => {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();
        if (error) return { error };
        return { data };
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, usePrefetch } = productApi;
