import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { GridLayout } from '@nativescript/core';
import { MediaStackParamList } from "../../components/navigation/MediaTabNavigator";
import { colors } from "../../theme/colors";
import { MediaItem, useMockMediaData } from "../../hooks/useMockMediaData";

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
    return mediaItems.filter(item => 
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [mediaItems, searchText]);

  const handleMediaTap = (mediaId: string) => {
    navigation.navigate("MediaDetail", { mediaId });
  };

  const renderGridItem = (item: MediaItem, index: number) => (
    <stackLayout 
      key={item.id} 
      class="grid-item" 
      onTap={() => handleMediaTap(item.id)}
    >
      <image 
        src={item.url} 
        class="w-full h-full" 
        stretch="aspectFill" 
      />
    </stackLayout>
  );

  const renderListItem = (item: MediaItem) => (
    <gridLayout 
      key={item.id}
      columns="auto, *"
      rows="auto"
      class="card m-2" 
      onTap={() => handleMediaTap(item.id)}
    >
      <image 
        row="0" 
        col="0" 
        src={item.url} 
        width="80" 
        height="80" 
        stretch="aspectFill" 
        class="rounded-md"
      />
      <stackLayout row="0" col="1" class="ml-3 justify-center">
        <label class="text-subtitle">{item.name}</label>
        <label class="text-body">{new Date(item.createdAt).toLocaleDateString()}</label>
      </stackLayout>
    </gridLayout>
  );
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <activityIndicator busy={true} class="h-10 w-10" color={colors.primary} />
      );
    }
    
    if (error) {
      return (
        <stackLayout class="p-4">
          <label class="text-error text-center">{error}</label>
          <button class="btn-primary mt-4" text="Retry" />
        </stackLayout>
      );
    }
    
    if (filteredMedia.length === 0) {
      return (
        <stackLayout class="p-4">
          <label class="text-body text-center">No media found</label>
        </stackLayout>
      );
    }
    
    if (viewMode === 'grid') {
      return (
        <gridLayout 
          class="w-full h-full" 
          columns="*, *, *" 
          rows="auto, auto, auto, auto"
        >
          {filteredMedia.map((item, index) => {
            const col = index % 3;
            const row = Math.floor(index / 3);
            return (
              <stackLayout 
                key={item.id}
                row={row}
                col={col}
                class="m-1 h-32"
                onTap={() => handleMediaTap(item.id)}
              >
                <image src={item.url} class="rounded-md w-full h-full" stretch="aspectFill" />
              </stackLayout>
            );
          })}
        </gridLayout>
      );
    } else {
      return (
        <scrollView>
          <stackLayout>
            {filteredMedia.map(item => renderListItem(item))}
          </stackLayout>
        </scrollView>
      );
    }
  };

  return (
    <gridLayout rows="auto, auto, *" class="bg-background">
      <stackLayout row="0" class="p-4">
        <searchBar 
          hint="Search media..." 
          text={searchText} 
          onTextChange={(e) => setSearchText(e.object.text)}
          class="form-input"
        />
      </stackLayout>
      
      <stackLayout row="1" orientation="horizontal" class="p-2 justify-between align-center">
        <label class="text-subtitle ml-2">
          {filteredMedia.length} {filteredMedia.length === 1 ? 'item' : 'items'}
        </label>
        <segmentedBar 
          selectedIndex={viewMode === 'grid' ? 0 : 1}
          class="w-32"
          selectedBackgroundColor={new Color(colors.primary)}
          onSelectedIndexChange={(e) => setViewMode(e.object.selectedIndex === 0 ? 'grid' : 'list')}
        >
          <segmentedBarItem title="Grid" />
          <segmentedBarItem title="List" />
        </segmentedBar>
      </stackLayout>
      
      <gridLayout row="2" class="p-2">
        {renderContent()}
      </gridLayout>
      
      <button text="+" class="fab" onTap={() => {
        // Add media action
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
      }} />
    </gridLayout>
  );
}