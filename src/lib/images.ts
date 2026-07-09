export function optimizedImage(path: string): string {
  if (path.startsWith("/optimized/")) return path;
  return path;
}
