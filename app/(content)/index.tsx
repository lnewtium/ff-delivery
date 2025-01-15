import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useGetProductsQuery } from "@/src/services/product";
import LoadingPage from "@/src/blocks/LoadingPage";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "@/src/blocks/cards/ProductCard";
import { Tables } from "@/src/types/supabase";
import HorizontalScroll from "@/src/components/HorizontalScroll";
import Header from "@/src/blocks/Header";

const ProductCarousel = ({
  products,
  title,
}: {
  products?: Tables<"products">[];
  title: string;
}) => {
  return (
    <>
      {/* Show title when products are present */}
      {products && products.length > 0 && (
        <Text className={"text-2xl font-bold ml-2 mb-2"}>{title}</Text>
      )}
      <HorizontalScroll>
        {products?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </HorizontalScroll>
    </>
  );
};

const HomePage = () => {
  const { data, isFetching } = useGetProductsQuery({});

  if (isFetching) return <LoadingPage />;

  const specialOffers = data?.filter((product) => product.special_offer);

  const topSelling = data?.filter(
    (product) => !product.special_offer && product.top_selling,
  );

  const commonOffers = data?.filter(
    (product) => !product.special_offer && !product.top_selling,
  );

  return (
    <SafeAreaView className={"py-2"} edges={["top"]}>
      <ScrollView
        contentContainerStyle={{gap: 8}}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
      >
        <Header />

        {/* Special offers */}
        <ProductCarousel products={specialOffers} title={"Special offer"} />

        {/* Best seller */}
        <ProductCarousel products={topSelling} title={"Popular"} />

        {/* Other products */}
        <ProductCarousel products={commonOffers} title={"Other products"} />
      </ScrollView>
      {/* Prevent system navigation button overlapping */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#ffffff01", // Hacky way to render empty view with transparent background
          height: 35,
        }}
      />
    </SafeAreaView>
  );
};

export default HomePage;
