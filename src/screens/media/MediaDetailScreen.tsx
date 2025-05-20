import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MediaStackParamList } from "../../components/navigation/MediaTabNavigator";
import { MediaItem, useMockMediaData } from "../../hooks/useMockMediaData";
import { colors } from "../../theme/colors";
import { Dialogs } from "@nativescript/core";
import { SwipeUpPanel } from "../../components/common/SwipeUpPanel";

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
      inputType: Dialogs.inputType.text
    }).then(result => {
      if (result.result) {
        // Handle media name update
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
        // Handle media deletion
        navigation.goBack();
      }
    });
  };

  if (!mediaItem) {
    return (
      <stackLayout class="items-center justify-center">
        <activityIndicator busy={true} class="h-8 w-8" color={colors.primary} />
        <label class="text-body mt-2">Loading media...</label>
      </stackLayout>
    );
  }

  return (
    <gridLayout rows="*, auto">
      <stackLayout row="0">
        {/* Media Display */}
        <image 
          src={mediaItem.url} 
          stretch="aspectFit" 
          class="w-full h-full" 
          onDoubleTap={() => setInfoOpen(true)}
        />
      </stackLayout>
      
      {/* Action Buttons */}
      <stackLayout row="1" class="p-4 bg-surface">
        <button 
          class="btn-primary"
          onTap={handleSellButtonTap}
        >
          Create Listing
        </button>
        
        <gridLayout columns="*, *, *" class="mt-4">
          <button 
            col="0" 
            class="text-primary text-center" 
            onTap={handleShareTap}
          >
            Share
          </button>
          <button 
            col="1" 
            class="text-primary text-center" 
            onTap={handleEditTap}
          >
            Edit
          </button>
          <button 
            col="2" 
            class="text-error text-center" 
            onTap={handleDeleteTap}
          >
            Delete
          </button>
        </gridLayout>
      </stackLayout>
      
      {/* Info Panel */}
      <SwipeUpPanel
        visible={infoOpen}
        onClose={() => setInfoOpen(false)}
        title="Media Information"
      >
        <stackLayout class="p-4">
          <stackLayout class="mb-4">
            <label class="text-body text-secondary">Name</label>
            <label class="text-subtitle">{mediaItem.name}</label>
          </stackLayout>
          
          <stackLayout class="mb-4">
            <label class="text-body text-secondary">Type</label>
            <label class="text-subtitle">{mediaItem.type}</label>
          </stackLayout>
          
          <stackLayout class="mb-4">
            <label class="text-body text-secondary">Size</label>
            <label class="text-subtitle">{(mediaItem.size / 1024 / 1024).toFixed(2)} MB</label>
          </stackLayout>
          
          <stackLayout class="mb-4">
            <label class="text-body text-secondary">Dimensions</label>
            <label class="text-subtitle">{mediaItem.dimensions.width} x {mediaItem.dimensions.height}</label>
          </stackLayout>
          
          <stackLayout class="mb-4">
            <label class="text-body text-secondary">Date Created</label>
            <label class="text-subtitle">{new Date(mediaItem.createdAt).toLocaleDateString()}</label>
          </stackLayout>
          
          {mediaItem.tags && (
            <stackLayout class="mb-4">
              <label class="text-body text-secondary mb-1">Tags</label>
              <wrapLayout>
                {mediaItem.tags.map((tag, index) => (
                  <stackLayout 
                    key={index} 
                    class="bg-primary100 rounded-full px-3 py-1 m-1"
                  >
                    <label class="text-primary text-sm">{tag}</label>
                  </stackLayout>
                ))}
              </wrapLayout>
            </stackLayout>
          )}
          
          <button class="btn-primary mt-4" onTap={handleSellButtonTap}>
            Create Listing
          </button>
        </stackLayout>
      </SwipeUpPanel>
    </gridLayout>
  );
}