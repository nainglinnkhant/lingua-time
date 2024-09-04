import { cn } from "@/lib/utils"
import GridPattern from "@/components/ui/grid-pattern"
import DatetimePicker from "@/components/datetime-picker"
import Examples from "@/components/examples"
import ThemeMenuButton from "@/components/theme-menu-button"

export default function Home() {
  return (
    <main className="relative mx-auto flex h-svh max-w-[90vw] items-center justify-center overflow-hidden sm:max-w-screen-md sm:p-10">
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 skew-y-12"
        )}
      />
      <ThemeMenuButton className="fixed right-[5vw] top-5 flex-1 md:right-5" />
      <div className="z-10 flex w-full flex-col items-center rounded-md border px-5 py-16 backdrop-blur-md supports-[backdrop-filter]:bg-background/40 sm:py-24">
        <DatetimePicker />
        <Examples />
      </div>
    </main>
  )
}
