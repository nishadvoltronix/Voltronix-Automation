import React from 'react';
import images from '../data/images.json';

export default function ResponsiveImage({ name, alt, sizes = '100vw', priority = false, className = '', ...props }) {
  const image = images[name];
  return (
    <picture>
    <source type="image/webp" srcSet={image.srcSet} sizes={sizes} />
    <img
      {...props}
      className={className}
      src={image.fallbackSrc || image.src}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={priority ? 'high' : 'auto'}
    />
    </picture>
  );
}
