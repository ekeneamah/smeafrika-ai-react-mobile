import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { MediaGalleryScreen } from "../../screens/media/MediaGalleryScreen";
import { MediaDetailScreen } from "../../screens/media/MediaDetailScreen";
import { ProductListingFormScreen } from "../../screens/media/ProductListingFormScreen";

const StackNavigator = stackNavigatorFactory();

export type MediaStackParamList = {
  MediaGallery: undefined;
  MediaDetail: { mediaId: string };
  ProductListingForm: { mediaId: string };
};

export const MediaTabNavigator = () => (
  <StackNavigator.Navigator
    initialRouteName="MediaGallery"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#228B22",
      },
      headerTintColor: "white",
    }}
  >
    <StackNavigator.Screen 
      name="MediaGallery" 
      component={MediaGalleryScreen}
      options={{
        title: "My Media",
      }}
    />
    <StackNavigator.Screen 
      name="MediaDetail" 
      component={MediaDetailScreen} 
      options={{
        title: "Media Details",
      }}
    />
    <StackNavigator.Screen 
      name="ProductListingForm" 
      component={ProductListingFormScreen}
      options={{
        title: "Create Listing",
      }}
    />
  </StackNavigator.Navigator>
);