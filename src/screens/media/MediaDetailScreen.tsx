import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MediaStackParamList } from "../../components/navigation/MediaTabNavigator";
import { MediaItem, useMockMediaData } from "../../hooks/useMockMediaData";
import { colors } from "../../theme/colors";
import { Dialogs } from "@nativescript/core";
import { SwipeUpPanel } from "../../components/common/SwipeUpPanel";
import {
  Label,
  StackLayout,
  GridLayout,
  Button,
  ScrollView
} from "../../components/native/nativeElements";
import { registerElement } from "react-nativescript";

const ActivityIndicator = (props) => React.createElement("activityIndicator", props);
const Image = (props) => React.createElement("image", props);
const WrapLayout = (props) => React.createElement("wrapLayout", props);

registerElement("activityIndicator", () => require("@nativescript/core").ActivityIndicator);
registerElement("image", () => require("@nativescript/core").Image);
registerElement("wrapLayout", () => require("@nativescript/core").WrapLayout);

type MediaDetailScreenProps = {
  route: RouteProp<MediaStackParamList, "MediaDetail">,
  navigation: FrameNavigationProp<MediaStackParamList, "MediaDetail">,
};

export function MediaDetailScreen({ route, navigation }: MediaDetailScreenProps) {
  const { mediaId } = route.params;
  const { mediaItems, isLoading } = useMockMediaData();
  const [mediaItem, setMediaItem] = React.useState<MediaItem | null>(null);
  const [infoOpen, setInfoOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading && mediaItems.length > 0) {
      const item = mediaItems.find(item => item.id === mediaId);
      if (item) {
        setMediaItem(item);
      }
    }
  }, [mediaId, mediaItems, isLoading]);

  const handleSellButtonTap = () => {
    navigation.navigate("ProductListingForm", { mediaId });
  };

  const handleShareTap = () => {
    Dialogs.action({
      title: "Share Media",
      message: "Choose a platform",
      cancelButtonText: "Cancel",
      actions: ["Facebook", "Instagram", "Twitter", "Copy Link"]
    }).then(result => {
      if (result !== "Cancel") {
        Dialogs.alert({
          title: "Shared!",
          message: `Media shared to ${result}`,
          okButtonText: "OK"
        });
      }
    });
  };

  const handleEditTap = () => {
    Dialogs.prompt({
      title: "Edit Media",
      message: "Update media name",
      okButtonText: "Save",
      cancelButtonText: "Cancel",
      defaultText: mediaItem?.name || "",
      inputType: "text"
    }).then(result => {
      if (result.result) {
        Dialogs.alert({
          title: "Updated",
          message: "Media name updated successfully",
          okButtonText: "OK"
        });
      }
    });
  };

  const handleDeleteTap = () => {
    Dialogs.confirm({
      title: "Delete Media",
      message: "Are you sure you want to delete this media? This action cannot be undone.",
      okButtonText: "Delete",
      cancelButtonText: "Cancel"
    }).then(result => {
      if (result) {
        navigation.goBack();
      }
    });
  };

  if (!mediaItem) {
    return (
      <StackLayout className="items-center justify-center">
        <ActivityIndicator busy={true} className="h-8 w-8" color={colors.primary} />
        <Label className="text-body mt-2">Loading media...</Label>
      </StackLayout>
    );
  }

  return (
    <GridLayout rows="*, auto" columns="*">
      <StackLayout row={0}>
        <Image
          src={mediaItem.url}
          stretch="aspectFit"
          className="w-full h-full"
          onDoubleTap={() => setInfoOpen(true)}
        />
      </StackLayout>

      <StackLayout row={1} className="p-4 bg-surface">
        <Button
          className="btn-primary"
          text="Create Listing"
          onTap={handleSellButtonTap}
        />

        <GridLayout columns="*, *, *" className="mt-4">
          <Button col={0} text="Share" className="text-primary text-center" onTap={handleShareTap} />
          <Button col={1} text="Edit" className="text-primary text-center" onTap={handleEditTap} />
          <Button col={2} text="Delete" className="text-error text-center" onTap={handleDeleteTap} />
        </GridLayout>
      </StackLayout>

      <SwipeUpPanel
        visible={infoOpen}
        onClose={() => setInfoOpen(false)}
        title="Media Information"
      >
        <StackLayout className="p-4">
          <StackLayout className="mb-4">
            <Label className="text-body text-secondary">Name</Label>
            <Label className="text-subtitle">{mediaItem.name}</Label>
          </StackLayout>

          <StackLayout className="mb-4">
            <Label className="text-body text-secondary">Type</Label>
            <Label className="text-subtitle">{mediaItem.type}</Label>
          </StackLayout>

          <StackLayout className="mb-4">
            <Label className="text-body text-secondary">Size</Label>
            <Label className="text-subtitle">{(mediaItem.size / 1024 / 1024).toFixed(2)} MB</Label>
          </StackLayout>

          <StackLayout className="mb-4">
            <Label className="text-body text-secondary">Dimensions</Label>
            <Label className="text-subtitle">{mediaItem.dimensions.width} x {mediaItem.dimensions.height}</Label>
          </StackLayout>

          <StackLayout className="mb-4">
            <Label className="text-body text-secondary">Date Created</Label>
            <Label className="text-subtitle">{new Date(mediaItem.createdAt).toLocaleDateString()}</Label>
          </StackLayout>

          {mediaItem.tags && (
            <StackLayout className="mb-4">
              <Label className="text-body text-secondary mb-1">Tags</Label>
              <WrapLayout>
                {mediaItem.tags.map((tag, index) => (
                  <StackLayout key={index} className="bg-primary100 rounded-full px-3 py-1 m-1">
                    <Label className="text-primary text-sm">{tag}</Label>
                  </StackLayout>
                ))}
              </WrapLayout>
            </StackLayout>
          )}

          <Button className="btn-primary mt-4" text="Create Listing" onTap={handleSellButtonTap} />
        </StackLayout>
      </SwipeUpPanel>
    </GridLayout>
  );
}
