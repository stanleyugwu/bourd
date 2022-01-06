import * as React from "react";
import { ImageBackground, ImageSourcePropType } from "react-native";

const tile1:ImageSourcePropType = require("../../../assets/tile_bg.png");
const tile2:ImageSourcePropType = require("../../../assets/tile_bg2.png");

/**
 * A HOC that wraps passed component in a selected background image
 * @param {1 | 2} [imageType] Type of image tile to use out of two tile images
 * @param {React.FunctionComponent | React.ComponentClass} Component Component to wrap
 */
const withTile = <ComponentProps extends object>(
  Component:
    | React.FunctionComponent<ComponentProps>
    | React.ComponentClass<ComponentProps>,
  imageType: 1 | 2 = 1
): React.NamedExoticComponent<ComponentProps> =>
  React.memo((props) => (
    <ImageBackground
      accessibilityLabel="tile background image"
      source={imageType == 1 ? tile1 : tile2}
      imageStyle={{ resizeMode: "cover" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Component {...(props as ComponentProps)} />
    </ImageBackground>
  ));

export default withTile;
