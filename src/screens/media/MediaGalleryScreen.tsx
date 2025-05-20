import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { Dialogs, Color } from '@nativescript/core';
import { MediaStackParamList } from "../../components/navigation/MediaTabNavigator";
import { colors } from "../../theme/colors";
import { MediaItem, useMockMediaData } from "../../hooks/useMockMediaData";
import {
  Label,
  GridLayout,
  StackLayout,
  ScrollView,
  Button
} from "../../components/native/nativeElements";
import { registerElement } from "react-nativescript";

registerElement("searchBar", () => require("@nativescript/core").SearchBar);
registerElement("segmentedBar", () => require("@nativescript/core").SegmentedBar);
registerElement("segmentedBarItem", () => require("@nativescript/core").SegmentedBarItem);
registerElement("image", () => require("@nativescript/core").Image);
registerElement("activityIndicator", () => require("@nativescript/core").ActivityIndicator);

const SearchBar = (props) => React.createElement("searchBar", props);
const SegmentedBar = (props) => React.createElement("segmentedBar", props);
const SegmentedBarItem = (props) => React.createElement("segmentedBarItem", props);
const Image = (props) => React.createElement("image", props);
const ActivityIndicator = (props) => React.createElement("activityIndicator", props);

type MediaGalleryScreenProps = {
  route: RouteProp<MediaStackParamList, "MediaGallery">,
  navigation: FrameNavigationProp<MediaStackParamList, "MediaGallery">,
};

export function MediaGalleryScreen({ navigation }: MediaGalleryScreenProps) {
  const { mediaItems, isLoading, error } = useMockMediaData();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [searchText, setSearchText] = React.useState('');

  const filteredMedia = React.useMemo(() => {
    if (!searchText) return mediaItems;
    return mediaItems.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
  }, [mediaItems, searchText]);

  const handleMediaTap = (mediaId: string) => {
    navigation.navigate("MediaDetail", { mediaId });
  };

  const renderListItem = (item: MediaItem) => (
    <GridLayout key={item.id} columns="auto, *" className="card m-2" onTap={() => handleMediaTap(item.id)}>
      <Image col={0} src={item.url} width={80} height={80} stretch="aspectFill" className="rounded-md" />
      <StackLayout col={1} className="ml-3 justify-center">
        <Label className="text-subtitle">{item.name}</Label>
        <Label className="text-body">{new Date(item.createdAt).toLocaleDateString()}</Label>
      </StackLayout>
    </GridLayout>
  );

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator busy={true} className="h-10 w-10" color={colors.primary} />;
    }
    if (error) {
      return (
        <StackLayout className="p-4">
          <Label className="text-error text-center">{error}</Label>
          <Button className="btn-primary mt-4" text="Retry" />
        </StackLayout>
      );
    }
    if (filteredMedia.length === 0) {
      return (
        <StackLayout className="p-4">
          <Label className="text-body text-center">No media found</Label>
        </StackLayout>
      );
    }

    if (viewMode === 'grid') {
      return (
        <GridLayout columns="*, *, *">
          {filteredMedia.map((item, index) => {
            const col = index % 3;
            const row = Math.floor(index / 3);
            return (
              <StackLayout
                key={item.id}
                row={row}
                col={col}
                className="m-1 h-32"
                onTap={() => handleMediaTap(item.id)}
              >
                <Image src={item.url} className="rounded-md w-full h-full" stretch="aspectFill" />
              </StackLayout>
            );
          })}
        </GridLayout>
      );
    } else {
      return (
        <ScrollView>
          <StackLayout>
            {filteredMedia.map(item => renderListItem(item))}
          </StackLayout>
        </ScrollView>
      );
    }
  };

  return (
    <GridLayout rows="auto, auto, *" className="bg-background" columns={"*"}>
      <StackLayout row={0} className="p-4">
        <SearchBar
          hint="Search media..."
          text={searchText}
          onTextChange={(e) => setSearchText(e.object.text)}
          className="form-input"
        />
      </StackLayout>

      <StackLayout row={1} orientation="horizontal" className="p-2 justify-between align-center">
        <Label className="text-subtitle ml-2">
          {filteredMedia.length} {filteredMedia.length === 1 ? 'item' : 'items'}
        </Label>
        <SegmentedBar
          selectedIndex={viewMode === 'grid' ? 0 : 1}
          className="w-32"
          selectedBackgroundColor={new Color(colors.primary)}
          onSelectedIndexChange={(e) => setViewMode(e.object.selectedIndex === 0 ? 'grid' : 'list')}
        >
          <SegmentedBarItem title="Grid" />
          <SegmentedBarItem title="List" />
        </SegmentedBar>
      </StackLayout>

      <StackLayout row={2} className="p-2">
        {renderContent()}
      </StackLayout>

      <Button
        text="+"
        className="fab"
        onTap={() => {
          Dialogs.action({
            title: "Add Media",
            message: "Choose an option",
            cancelButtonText: "Cancel",
            actions: ["Take Photo", "Choose from Gallery"]
          }).then(result => {
            if (result === "Take Photo") {
              // Handle camera
            } else if (result === "Choose from Gallery") {
              // Handle gallery
            }
          });
        }}
      />
    </GridLayout>
  );
}
