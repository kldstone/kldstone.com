export function optimizedImage(src: string) {
  if (/^\/(brand-gallery|gani-home|gani-products|catalog-images)\/.+\.(jpe?g|png)$/i.test(src)) {
    return `/optimized${src.replace(/\.(jpe?g|png)$/i, ".webp")}`;
  }
  return src;
}