
export const ProductCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
    
      <div className="relative aspect-square overflow-hidden bg-gray-200">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
      </div>

     
      <div className="space-y-3 p-4">
   
        <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />

  
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
        </div>

    
        <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />

        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
          <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  )
}
