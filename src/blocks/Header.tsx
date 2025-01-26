import React, { useState } from "react";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import {Platform, StyleSheet, TouchableOpacity, View} from "react-native";
import { Avatar, Divider, SearchBar } from "@rneui/themed";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { COLORS } from "@/src/utils/theme";

const Header = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <View style={styles.header}>
      <BlurView intensity={10} className={"flex-row gap-3"}>
        <TouchableOpacity onPress={() => router.push("(content)/profile")}>
          <Avatar source={require("@/assets/profile.png")} size={48} />
        </TouchableOpacity>
        <Divider orientation={"vertical"} />
        <SearchBar
          placeholder={"Search..."}
          value={search}
          platform={Platform.select({ ios: "ios", android: "android" })}
          searchIcon={<EvilIcons name="search" size={24} color="black" />}
          clearIcon={<EvilIcons name="close" size={24} color="black" />}
          onChangeText={(text) => setSearch(text)}
          containerStyle={styles.searchbar}
        />
      </BlurView>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    marginHorizontal: 16,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    backgroundColor: COLORS.container,
  },
  searchbar: {
    paddingTop: 0,
    paddingBottom: 0,
    alignSelf: "center",
  },
});
