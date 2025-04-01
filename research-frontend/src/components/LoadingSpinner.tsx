export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-medium text-gray-700">Researching...</p>
        <p className="text-sm text-gray-500 mt-1">
          Gathering information from multiple sources
        </p>
      </div>
    </div>
  );
}
