import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MediaStackParamList } from "../../components/navigation/MediaTabNavigator";
import { ScrollView, StackLayout, Label, Button, TextField } from "../../components/native/nativeElements";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { Dialogs } from "@nativescript/core";
import { saveProductListing } from "../../store/slices/productSlice";

export const ProductListingFormScreen = ({ route, navigation }: {
  route: RouteProp<MediaStackParamList, "ProductListingForm">,
  navigation: FrameNavigationProp<MediaStackParamList, "ProductListingForm">
}) => {
  const { mediaId } = route.params;
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: 'new' as const,
    quantity: '1',
    location: '',
    tags: '',
    shippingOptions: 'standard' as const,
    returnPolicy: '30 days' as const,
    notes: ''
  });

  const handleSubmit = async () => {
    if (!formData.title || !formData.price || !formData.category) {
      Dialogs.alert({ 
        title: "Validation Error", 
        message: "Please complete all required fields.", 
        okButtonText: "OK" 
      });
      return;
    }

    try {
      // TODO: Implement saveProductListing action
      await dispatch(saveProductListing({
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        tags: formData.tags.split(',').map(tag => tag.trim()),
        mediaId
      }));
      Dialogs.alert({ 
        title: "Success", 
        message: "Product listing created successfully.", 
        okButtonText: "OK" 
      });
      navigation.goBack();
    } catch (err) {
      Dialogs.alert({ 
        title: "Error", 
        message: "Failed to create product listing.", 
        okButtonText: "OK" 
      });
    }
  };

  return (
    <ScrollView className="bg-background">
      <StackLayout className="p-4">
        <StackLayout className="card">
          <Label className="text-subtitle mb-2">Title</Label>
          <TextField 
            className="form-input" 
            text={formData.title}
            onTextChange={(e) => setFormData({ ...formData, title: e.value })}
            hint="Enter product title"
          />
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Description</Label>
          <textView 
            className="form-input h-32" 
            text={formData.description}
            onTextChange={(e) => setFormData({ ...formData, description: e.value })}
            hint="Enter product description"
          />
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Price</Label>
          <TextField 
            className="form-input" 
            text={formData.price}
            onTextChange={(e) => setFormData({ ...formData, price: e.value })}
            hint="Enter price"
            keyboardType="number"
          />
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Category</Label>
          <TextField 
            className="form-input" 
            text={formData.category}
            onTextChange={(e) => setFormData({ ...formData, category: e.value })}
            hint="Select category"
          />
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Condition</Label>
          <segmentedBar selectedIndex={0} className="mb-2">
            <segmentedBarItem title="New" />
            <segmentedBarItem title="Used" />
            <segmentedBarItem title="Refurbished" />
          </segmentedBar>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Quantity</Label>
          <TextField 
            className="form-input" 
            text={formData.quantity}
            onTextChange={(e) => setFormData({ ...formData, quantity: e.value })}
            hint="Enter quantity"
            keyboardType="number"
          />
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Location</Label>
          <TextField 
            className="form-input" 
            text={formData.location}
            onTextChange={(e) => setFormData({ ...formData, location: e.value })}
            hint="Enter location"
          />
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Tags</Label>
          <TextField 
            className="form-input" 
            text={formData.tags}
            onTextChange={(e) => setFormData({ ...formData, tags: e.value })}
            hint="Enter tags (comma separated)"
          />
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Shipping Options</Label>
          <segmentedBar selectedIndex={0} className="mb-2">
            <segmentedBarItem title="Standard" />
            <segmentedBarItem title="Express" />
            <segmentedBarItem title="Free" />
          </segmentedBar>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Return Policy</Label>
          <segmentedBar selectedIndex={0} className="mb-2">
            <segmentedBarItem title="30 days" />
            <segmentedBarItem title="14 days" />
            <segmentedBarItem title="No returns" />
          </segmentedBar>
        </StackLayout>

        <StackLayout className="card mt-4">
          <Label className="text-subtitle mb-2">Additional Notes</Label>
          <textView 
            className="form-input h-32" 
            text={formData.notes}
            onTextChange={(e) => setFormData({ ...formData, notes: e.value })}
            hint="Enter additional notes"
          />
        </StackLayout>

        <Button 
          className="btn-primary mt-4" 
          text="Create Listing" 
          onTap={handleSubmit} 
        />
      </StackLayout>
    </ScrollView>
  );
}; 