export const getProductUrl: (name: string, mini: boolean) => {
  uri: string;
  cache: "force-cache";
} = (name, mini) => {
  return {
    uri: `https://iomlfefrrecmhlhetezt.supabase.co/storage/v1/object/public/products/${name}${mini ? "-mini" : ""}.jpg`,
    cache: "force-cache",
  };
};
