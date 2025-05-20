import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productsSlice";
import { StoreStackParamList } from "../../components/navigation/StoreTabNavigator";
import { RootState } from "../../store/store";
import { colors } from "../../theme/colors";
import { Dialogs } from "@nativescript/core";
import { Product } from "../../types/Product";

type ProductListingScreenProps = {
  route: RouteProp<StoreStackParamList, "ProductListing">,
  navigation: FrameNavigationProp<StoreStackParamList, "ProductListing">,
};

export function ProductListingScreen({ navigation }: ProductListingScreenProps) {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state: RootState) => state.products);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [searchText, setSearchText] = React.useState('');
  const [filterOpen, setFilterOpen] = React.useState(false);
  
  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  const filteredProducts = React.useMemo(() => {
    if (!searchText) return products;
    return products.filter(product => 
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [products, searchText]);

  const handleProductTap = (productId: string) => {
    navigation.navigate("ProductDetail", { productId });
  };

  const showFilterOptions = () => {
    setFilterOpen(true);
    // Implementation of filter modal/panel would go here
  };

  const renderGridItem = (product: Product) => (
    <stackLayout 
      key={product.id}
      class="card w-48 h-64"
      onTap={() => handleProductTap(product.id)}
    >
      <image 
        src={product.images[0] || "https://via.placeholder.com/150"} 
        height="120" 
        class="w-full rounded-t-md"
        stretch="aspectFill" 
      />
      <stackLayout class="p-2">
        <label class="text-subtitle">{product.name}</label>
        <label class="text-body">${product.price.toFixed(2)}</label>
        <stackLayout orientation="horizontal" class="mt-2">
          <label class="text-body">Stock: {product.stock}</label>
          <label class="text-body ml-auto">⭐ {product.ratings}</label>
        </stackLayout>
      </stackLayout>
    </stackLayout>
  );
  
  const renderListItem = (product: Product) => (
    <gridLayout 
      key={product.id}
      columns="80, *"
      rows="auto, auto, auto"
      class="card"
      onTap={() => handleProductTap(product.id)}
    >
      <image 
        row="0" 
        col="0" 
        rowSpan="3"
        src={product.images[0] || "https://via.placeholder.com/150"} 
        height="80" 
        width="80" 
        class="rounded-md"
        stretch="aspectFill" 
      />
      
      <label row="0" col="1" class="text-subtitle ml-2">{product.name}</label>
      <label row="1" col="1" class="text-body ml-2">${product.price.toFixed(2)}</label>
      <stackLayout row="2" col="1" orientation="horizontal" class="ml-2">
        <label class="text-body">Stock: {product.stock}</label>
        <label class="text-body ml-2">⭐ {product.ratings}</label>
        <label class="text-body ml-auto mr-2">{product.reviewCount} reviews</label>
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
          <button class="btn-primary mt-4" text="Retry" onTap={() => dispatch(fetchProducts())} />
        </stackLayout>
      );
    }
    
    if (filteredProducts.length === 0) {
      return (
        <stackLayout class="p-4">
          <label class="text-body text-center">No products found</label>
          <button 
            class="btn-primary mt-4" 
            text="Add Product" 
            onTap={() => navigation.navigate("MediaGallery")}
          />
        </stackLayout>
      );
    }
    
    if (viewMode === 'grid') {
      return (
        <wrapLayout class="p-2" itemHeight="180" itemWidth="160">
          {filteredProducts.map(product => renderGridItem(product))}
        </wrapLayout>
      );
    } else {
      return (
        <stackLayout>
          {filteredProducts.map(product => renderListItem(product))}
        </stackLayout>
      );
    }
  };

  return (
    <gridLayout rows="auto, auto, *" class="bg-background">
      <stackLayout row="0" class="p-4">
        <searchBar 
          hint="Search products..." 
          text={searchText} 
          onTextChange={(e) => setSearchText(e.object.text)}
          class="form-input"
        />
      </stackLayout>
      
      <gridLayout row="1" columns="auto, *, auto" class="p-2">
        <button 
          col="0" 
          text="Filter" 
          class="btn-outline text-sm p-2" 
          onTap={showFilterOptions}
        />
        
        <label col="1" class="text-subtitle ml-2 text-center">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </label>
        
        <segmentedBar 
          col="2"
          selectedIndex={viewMode === 'grid' ? 0 : 1}
          class="w-24"
          selectedBackgroundColor={new Color(colors.primary)}
          onSelectedIndexChange={(e) => setViewMode(e.object.selectedIndex === 0 ? 'grid' : 'list')}
        >
          <segmentedBarItem title="Grid" />
          <segmentedBarItem title="List" />
        </segmentedBar>
      </gridLayout>
      
      <scrollView row="2" class="p-2">
        {renderContent()}
      </scrollView>
      
      <button text="+" class="fab" onTap={() => {
        navigation.navigate("ProductListing");
      }} />
    </gridLayout>
  );
}