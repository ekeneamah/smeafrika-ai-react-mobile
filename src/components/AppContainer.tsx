import * as React from "react";
import { BaseNavigationContainer } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { AuthStack } from "./navigation/AuthStack";
import { MainTabs } from "./navigation/MainTabs";

export const AppContainer = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  return (
    <BaseNavigationContainer>
      {isAuthenticated ? <MainTabs /> : <AuthStack />}
    </BaseNavigationContainer>
  );
};