/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Loader } from './Loader';

export function ApiState({ children, error, isLoading }) {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>{error?.message || error?.error}</h1>;
  }

  return <>{children}</>;
}
