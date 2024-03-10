export default function Skeleton({ width = 'w-full', density = 1 }) {
  const skeletonLines = Array.from({ length: density }, (_, index) => (
    <div
      key={index}
      className={index === 0 ? `flex items-center justify-between` : `flex items-center justify-between pt-4`}
    >
      <div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
  ));

  return (
    <div
      role="status"
      className={`${width} p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700`}
    >
      {skeletonLines}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
