import React from 'react';
import Spline from '@splinetool/react-spline';

export const SplineViewer = ({ url, className }: { url: string, className?: string }) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Spline scene={url} />
    </div>
  );
};
