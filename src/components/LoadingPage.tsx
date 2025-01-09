import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {WhiteBG} from "@/src/components/WhiteBG";

const LoadingPage = () => {
  return (
    <WhiteBG className={"items-center justify-center gap-5"}>
      <FontAwesome name={"spinner"} size={20} className={"animate-spin"} />
    </WhiteBG>
  );
};

export default LoadingPage;
