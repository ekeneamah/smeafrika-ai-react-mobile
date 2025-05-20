import { AuthStackParamList } from './components/navigation/AuthStack';
import { MediaStackParamList } from './components/navigation/MediaTabNavigator';
import { StoreStackParamList } from './components/navigation/StoreTabNavigator';
import { AnalyticsStackParamList } from './components/navigation/AnalyticsTabNavigator';
import { BookingsStackParamList } from './components/navigation/BookingsTabNavigator';
import { TasksStackParamList } from './components/navigation/TasksTabNavigator';
import { IntegrationsStackParamList } from './components/navigation/IntegrationsTabNavigator';
import { SocialStackParamList } from './components/navigation/SocialTabNavigator';
import { ReviewsStackParamList } from './components/navigation/ReviewsTabNavigator';
import { ExpensesStackParamList } from './components/navigation/ExpensesTabNavigator';
import { KnowledgeStackParamList } from './components/navigation/KnowledgeTabNavigator';
import { PurchaseStackParamList } from './components/navigation/PurchaseTabNavigator';
import { MainTabsParamList } from './components/navigation/MainTabs';

export type MainStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AppNavigationParamList = 
  AuthStackParamList & 
  MediaStackParamList & 
  StoreStackParamList & 
  AnalyticsStackParamList &
  BookingsStackParamList &
  TasksStackParamList &
  IntegrationsStackParamList &
  SocialStackParamList &
  ReviewsStackParamList &
  ExpensesStackParamList &
  KnowledgeStackParamList &
  PurchaseStackParamList &
  MainTabsParamList;