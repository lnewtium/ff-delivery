import React, { useState } from "react";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Divider, SearchBar } from "@rneui/themed";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { COLORS } from "@/src/utils/theme";

const Header = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <BlurView style={styles.header} intensity={10}>
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
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 12,
    borderRadius: 10,
    backgroundColor: COLORS.container,
    alignSelf: "stretch",
    marginHorizontal: 8,
    marginBottom: 8,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 4 },
    borderColor: COLORS.border,
    borderWidth: 1,
    borderStyle: "solid",
    elevation: 8,
  },
  searchbar: {
    paddingTop: 0,
    paddingBottom: 0,
    alignSelf: "center",
  },
});
