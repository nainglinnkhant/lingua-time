"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

const examples = [
  "Tomorrow at 4am",
  "Next 3 days",
  "50 hours from now",
  "September 21 at 12am",
  "Next Wednesday at 11am UTC",
]

export default function Examples() {
  async function copy(text: string) {
    await navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard.")
  }

  return (
    <div className="mt-7 w-full text-sm sm:w-96">
      <p className="mb-2">Try these:</p>
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {examples.map((example) => (
          <li key={example}>
            <Button
              variant="ghost"
              className="h-auto rounded-sm p-0 font-normal hover:bg-transparent active:bg-transparent"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => copy(example)}
            >
              {example}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
