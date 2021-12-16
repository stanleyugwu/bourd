import React from "react";
import { ImageBackground } from "react-native";
import tile1 from "../../../assets/tile_bg.png";
import tile2 from "../../../assets/tile_bg2.png";

/**
 * A HOC that wraps passed component in a selected background image
 * @param {1 | 2} [imageType] Type of image tile to use out of two tile images
 * @param {import('react').ReactComponentElement} Component Component to wrap
 */
const withTile = (Component, imageType = 1) => {
  return React.memo((props) => (
    <ImageBackground
      accessibilityLabel="tile background image"
      source={imageType == 1 ? tile1 : tile2}
      imageStyle={{ resizeMode: "cover" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Component {...props} />
    </ImageBackground>
  ));
};

export default withTile;
