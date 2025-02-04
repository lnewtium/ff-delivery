import React from "react";
import { ScrollView, Text } from "react-native";
import { useGetProductsQuery } from "@/src/services/product";
import LoadingPage from "@/src/blocks/LoadingPage";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "@/src/blocks/cards/ProductCard";
import HorizontalScroll from "@/src/components/HorizontalScroll";
import Header from "@/src/blocks/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {ViewCart} from "@/src/blocks/ViewCart";

const ProductCarousel = ({
  products,
  title,
}: {
  products?: { id: number; img: string; text: string; price: number }[];
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
  const insets = useSafeAreaInsets();

  if (isFetching) return <LoadingPage />;

  const specialOffers = data?.filter((product) => product.special_offer);

  const topSelling = data?.filter(
    (product) => !product.special_offer && product.top_selling,
  );

  const commonOffers = data?.filter(
    (product) => !product.special_offer && !product.top_selling,
  );

  return (
    <SafeAreaView edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ gap: 8, paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
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
      <ViewCart/>
    </SafeAreaView>
  );
};

export default HomePage;
