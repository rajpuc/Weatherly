import { LoaderPinwheel } from 'lucide-react';
import React from 'react';

interface BaseLoaderProps {
  style?: string; // Optional prop with type `string`
  size?:number;
}

const BaseLoader: React.FC<BaseLoaderProps> = ({ style, size }) => {
  return <LoaderPinwheel className={style} size={size} />;
};

export default BaseLoader;
