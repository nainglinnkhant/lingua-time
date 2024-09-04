import DatetimePicker from "@/components/datetime-picker"
import Examples from "@/components/examples"
import ThemeMenuButton from "@/components/theme-menu-button"

export default function Home() {
  return (
    <main className="mx-auto flex h-svh max-w-[90vw] items-center justify-center sm:max-w-screen-md sm:p-10">
      <ThemeMenuButton className="fixed right-[5vw] top-5 flex-1 md:right-5" />
      <div className="flex w-full flex-col items-center rounded-md border px-5 py-16 sm:py-24">
        <DatetimePicker />
        <Examples />
      </div>
    </main>
  )
}
