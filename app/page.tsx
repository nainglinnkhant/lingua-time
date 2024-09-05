import localFont from "next/font/local"

import { cn } from "@/lib/utils"
import GridPattern from "@/components/ui/grid-pattern"
import DateTimeForm from "@/components/datetime-form"
import Examples from "@/components/examples"
import ThemeMenuButton from "@/components/theme-menu-button"

const calSans = localFont({ src: "../fonts/CalSans-SemiBold.ttf" })

export default function Home() {
  return (
    <>
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
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] sm:[mask-image:radial-gradient(450px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(550px_circle_at_center,white,transparent)]",
            "inset-x-0 skew-y-12"
          )}
        />
        <ThemeMenuButton className="fixed right-[5vw] top-5 flex-1 md:right-5" />
        <div className="z-10 flex w-full flex-col items-center rounded-lg border px-5 py-8 backdrop-blur-md supports-[backdrop-filter]:bg-background/40 sm:py-24">
          <h1
            className={cn(
              "mb-3 w-full text-3xl font-bold sm:w-96",
              calSans.className
            )}
          >
            Lingua Time
          </h1>
          <p className="mb-8 w-full text-sm sm:w-96">
            A smart datetime picker which understands natural language input.
          </p>
          <DateTimeForm />
          <Examples />
        </div>
      </main>

      <footer className="fixed bottom-4 left-1/2 w-screen -translate-x-1/2">
        <p className="text-center text-sm text-muted-foreground">
          Crafted by{" "}
          <a
            href="https://x.com/nainglk"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            nainglk
          </a>
          . The source code is on{" "}
          <a
            href="https://github.com/nainglinnkhant/lingua-time"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </footer>
    </>
  )
}
