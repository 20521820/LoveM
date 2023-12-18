import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { slides } from "../../data/intro";
import { COLORS, FONTS, STYLES } from "../../theme/style";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

const IntroSlider = () => {
  const navigation = useNavigation();
  const sliderRef = useRef(null);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const onSlideChange = (index) => {
    if (index === slides.length - 1) {
      setIsLastSlide(true);
    } else {
      setIsLastSlide(false);
    }
  };

  const onDone = () => {
    setShowRealApp(true);
  };

  const renderItem = useCallback(({ item }) => {
    return (
      <View style={styles.container}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={[STYLES.title, { paddingHorizontal: 10, paddingTop: 30 }]}>
          {item.text}
        </Text>
      </View>
    );
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text style={[STYLES.header, { paddingTop: 50 }]}>
        Add the widget {"\n"} to your home screen
      </Text>
      <View style={{ flex: 1 }}>
        <AppIntroSlider
          renderItem={renderItem}
          data={slides}
          onDone={onDone}
          dotStyle={styles.dot}
          onSlideChange={onSlideChange}
          activeDotStyle={styles.activeDot}
          ref={sliderRef}
        />
      </View>
      <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
        <Button
          text="I've enabled the widget"
          handlePress={() => navigation.navigate('Auth')}
          backgroundColor={isLastSlide ? COLORS.logo : COLORS.gray}
          color={isLastSlide ? COLORS.black : COLORS.darkGray}
        />
      </View>
    </View>
  );
};

export default IntroSlider;

const styles = StyleSheet.create({
  title: {
    fontFamily: FONTS.title,
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  image: {
    width: 200,
    height: 310,
    borderRadius: 20,
  },
  text: {
    fontFamily: FONTS.normal,
    fontSize: 20,
    color: "#000",
    textAlign: "center",
  },
  dot: {
    backgroundColor: "rgba(0, 0, 0, .2)",
  },
  activeDot: {
    backgroundColor: COLORS.darkGray,
  },
  buttonCircle: {
    width: 60,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
  },
});
