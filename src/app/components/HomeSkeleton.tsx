export function HomeSkeleton() {
    return (
      <>
      <div className="flex flex-wrap items-center px-5 py-3 sm:flex-wrap xl:flex-nowrap ">
      {Array(10).fill(0).map((_, index) => (
        <div
          key={index}
          className="group relative m-2 flex max-w-xs flex-col items-center sm:max-w-sm md:max-w-md lg:max-w-lg  animate-pulse bg-gray-400"
        >
          <div className="relative min-h-fit overflow-hidden h-36 w-24 sm:h-48 sm:w-32 md:h-60 md:w-40">
          </div>
        </div>
      ))}
    </div>
    <div className="flex flex-wrap items-center px-5 py-3 sm:flex-wrap xl:flex-nowrap ">
      {Array(10).fill(0).map((_, index) => (
        <div
          key={index}
          className="group relative m-2 flex max-w-xs flex-col items-center sm:max-w-sm md:max-w-md lg:max-w-lg  animate-pulse bg-gray-400"
        >
          <div className="relative min-h-fit overflow-hidden h-36 w-24 sm:h-48 sm:w-32 md:h-60 md:w-40 ">
          </div>
        </div>
      ))}
    </div>
    </>
    )
}