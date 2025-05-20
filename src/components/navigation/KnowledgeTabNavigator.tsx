import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { ArticleListScreen } from "../../screens/knowledge/ArticleListScreen";
import { ArticleEditorScreen } from "../../screens/knowledge/ArticleEditorScreen";
import { ArticleDetailScreen } from "../../screens/knowledge/ArticleDetailScreen";
import { ArticleCategoriesScreen } from "../../screens/knowledge/ArticleCategoriesScreen";

const StackNavigator = stackNavigatorFactory();

export type KnowledgeStackParamList = {
  ArticleList: undefined;
  ArticleEditor: { articleId?: string };
  ArticleDetail: { articleId: string };
  ArticleCategories: undefined;
};

export const KnowledgeTabNavigator = () => (
  <StackNavigator.Navigator
    initialRouteName="ArticleList"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#228B22",
      },
      headerTintColor: "white",
    }}
  >
    <StackNavigator.Screen 
      name="ArticleList" 
      component={ArticleListScreen}
      options={{
        title: "Knowledge Base",
      }}
    />
    <StackNavigator.Screen 
      name="ArticleEditor" 
      component={ArticleEditorScreen}
      options={({ route }) => ({
        title: route.params?.articleId ? "Edit Article" : "New Article",
      })}
    />
    <StackNavigator.Screen 
      name="ArticleDetail" 
      component={ArticleDetailScreen}
      options={{
        title: "Article",
      }}
    />
    <StackNavigator.Screen 
      name="ArticleCategories" 
      component={ArticleCategoriesScreen}
      options={{
        title: "Categories",
      }}
    />
  </StackNavigator.Navigator>
);