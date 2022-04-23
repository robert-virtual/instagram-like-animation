import { Feather } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TapGestureHandler } from "react-native-gesture-handler";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

export function Posts() {
  const scale = useSharedValue(0);
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: Math.max(scale.value, 0),
      },
    ],
  }));
  const { width } = useWindowDimensions();
  const [heartIcon, setHeartIcon] = useState<"hearto" | "heart">("hearto");
  function toggleHeart() {
    setHeartIcon((prev) => (prev == "heart" ? "hearto" : "heart"));
    scale.value = withSpring(1, undefined, (finish) => {
      if (finish) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <TapGestureHandler numberOfTaps={2} onActivated={toggleHeart}>
        <Animated.View>
          <ImageBackground
            source={require("../assets/code.jpg")}
            style={{
              width,
              height: width,
            }}
          >
            <AnimatedImage
              source={require("../assets/heart.png")}
              style={[{ width, height: width }, rStyle]}
              resizeMode="center"
            />
          </ImageBackground>
        </Animated.View>
      </TapGestureHandler>

      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={toggleHeart}>
            <AntDesign
              style={styles.icon}
              name={heartIcon}
              size={24}
              color={heartIcon == "hearto" ? "black" : "red"}
            />
          </TouchableOpacity>
          <Feather
            style={styles.icon}
            name="message-circle"
            size={24}
            color="black"
          />
          <Feather style={styles.icon} name="send" size={24} color="black" />
        </View>
        <Text>1,021 Me gusta</Text>
        <Text>Post content </Text>
      </View>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  icon: {
    marginRight: 10,
  },
});
