import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { StoreStackParamList } from "../../components/navigation/StoreTabNavigator";
import { RootState, AppDispatch } from "../../store/store";
import { ScrollView, StackLayout, Label, Button, GridLayout, Image } from "../../components/native/nativeElements";
import { Dialogs, SwipeUpPanel } from "@nativescript/core";
import { syncProduct } from "../../store/slices/integrationSlice";
import { useNavigation } from "@react-navigation/native";
import { MainTabsParamList } from "../../components/navigation/MainTabs";
import { NavigationProp } from "@react-navigation/native";
import { colors } from "../../theme/colors";

export const ProductDetailScreen = ({ route, navigation }: {
  route: RouteProp<StoreStackParamList, "ProductDetail">,
  navigation: FrameNavigationProp<StoreStackParamList, "ProductDetail">
}) => {
  const { productId } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const { listings } = useSelector((state: RootState) => state.products);
  const currentProduct = listings.find(p => p.id === productId);
  const { integrations } = useSelector((state: RootState) => state.integrations);
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { reviews } = useSelector((state: RootState) => state.reviews);
  const { analytics } = useSelector((state: RootState) => state.analytics);
  const rootNavigation = useNavigation<NavigationProp<MainTabsParamList>>();
  const [showPanel, setShowPanel] = React.useState(false);

  const handleSync = async (integrationId: string) => {
    try {
      await dispatch(syncProduct({ integrationId, productId }));
      Dialogs.alert({ 
        title: "Success", 
        message: "Product sync initiated successfully.", 
        okButtonText: "OK" 
      });
    } catch (err) {
      Dialogs.alert({ 
        title: "Error", 
        message: "Failed to sync product.", 
        okButtonText: "OK" 
      });
    }
  };

  const handleShare = () => {
    // Implement sharing functionality
    Dialogs.alert({ 
      title: "Share", 
      message: "Sharing functionality to be implemented", 
      okButtonText: "OK" 
    });
  };

  const renderExternalStores = () => (
    <StackLayout className="card mt-4">
      <Label className="text-subtitle mb-2">External Stores</Label>
      <scrollView orientation="horizontal" className="mb-2">
        <stackLayout orientation="horizontal">
          {integrations.map(integration => (
            <stackLayout key={integration.id} className="mr-4" onTap={() => handleSync(integration.id)}>
              <image 
                src={`res://${integration.platform.toLowerCase()}_icon`} 
                width="40" 
                height="40" 
                className="rounded-full"
              />
              <label className="text-caption text-center">{integration.platform}</label>
            </stackLayout>
          ))}
        </stackLayout>
      </scrollView>
    </StackLayout>
  );

  const renderReviews = () => (
    <StackLayout className="card mt-4">
      <gridLayout columns="*, auto" rows="auto, auto">
        <label col="0" row="0" className="text-subtitle">Reviews & Complaints</label>
        <button 
          col="1" 
          row="0" 
          text="View All" 
          className="btn-link" 
          onTap={() => navigation.navigate("ReviewList")} 
        />
      </gridLayout>
      {reviews.slice(0, 2).map(review => (
        <stackLayout key={review.id} className="mt-2">
          <label className="text-body">{review.content}</label>
          <label className="text-caption">{review.author} - {review.date}</label>
        </stackLayout>
      ))}
    </StackLayout>
  );

  const renderAnalytics = () => (
    <StackLayout className="card mt-4">
      <label className="text-subtitle mb-2">Analytics</label>
      <gridLayout columns="*, *" rows="auto, auto" className="mt-2">
        <stackLayout col="0" row="0" className="mr-2">
          <label className="text-caption">Views</label>
          <label className="text-title">{analytics.views}</label>
        </stackLayout>
        <stackLayout col="1" row="0">
          <label className="text-caption">Sales</label>
          <label className="text-title">{analytics.sales}</label>
        </stackLayout>
        <stackLayout col="0" row="1" className="mr-2 mt-2">
          <label className="text-caption">Conversion</label>
          <label className="text-title">{analytics.conversion}%</label>
        </stackLayout>
        <stackLayout col="1" row="1" className="mt-2">
          <label className="text-caption">Revenue</label>
          <label className="text-title">${analytics.revenue}</label>
        </stackLayout>
      </gridLayout>
    </StackLayout>
  );

  const renderTasks = () => (
    <StackLayout className="card mt-4">
      <gridLayout columns="*, auto" rows="auto, auto">
        <label col="0" row="0" className="text-subtitle">Related Tasks</label>
        <button 
          col="1" 
          row="0" 
          text="Add Task" 
          className="btn-link" 
          onTap={() => navigation.navigate("TaskForm", { productId })} 
        />
      </gridLayout>
      {tasks.filter(task => task.productId === productId).slice(0, 2).map(task => (
        <stackLayout key={task.id} className="mt-2">
          <label className="text-body">{task.title}</label>
          <label className="text-caption">{task.status} - {task.dueDate}</label>
        </stackLayout>
      ))}
    </StackLayout>
  );

  const renderSwipeUpPanel = () => (
    <SwipeUpPanel
      visible={showPanel}
      onDismiss={() => setShowPanel(false)}
      height="80%"
    >
      <stackLayout className="p-4">
        <label className="text-title mb-4">Additional Features</label>
        {renderExternalStores()}
        {renderReviews()}
        {renderAnalytics()}
        {renderTasks()}
      </stackLayout>
    </SwipeUpPanel>
  );

  if (!currentProduct) return null;

  return (
    <gridLayout rows="auto, *" className="bg-background">
      <scrollView row="1" className="p-4">
        <stackLayout>
          <image 
            src={currentProduct.images[0]} 
            height="200" 
            className="w-full rounded-md"
            stretch="aspectFill" 
          />
          
          <stackLayout className="card mt-4">
            <label className="text-title">{currentProduct.name}</label>
            <label className="text-subtitle mt-2">${currentProduct.price}</label>
            <label className="text-body mt-2">{currentProduct.description}</label>
          </stackLayout>

          <gridLayout columns="*, *, *" rows="auto" className="mt-4">
            <button 
              col="0" 
              text="Edit" 
              className="btn-outline" 
              onTap={() => navigation.navigate("ProductEdit", { productId })} 
            />
            <button 
              col="1" 
              text="Share" 
              className="btn-outline" 
              onTap={handleShare} 
            />
            <button 
              col="2" 
              text="More" 
              className="btn-outline" 
              onTap={() => setShowPanel(true)} 
            />
          </gridLayout>

          {renderExternalStores()}
          {renderReviews()}
          {renderAnalytics()}
          {renderTasks()}
        </stackLayout>
      </scrollView>

      {renderSwipeUpPanel()}
    </gridLayout>
  );
}; 