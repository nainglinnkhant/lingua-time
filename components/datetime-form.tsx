"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { generateDateString } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { DateTimePicker } from "@/components/datetime-picker"

const formSchema = z.object({
  dateTime: z.date({
    required_error: "Please enter a date",
    invalid_type_error: "Invalid date",
  }),
})

type FormSchema = z.infer<typeof formSchema>

export default function DateTimeForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateTime: undefined,
    },
  })

  function onSubmit(values: FormSchema) {
    if (values.dateTime) {
      toast.success(`Selected time is ${generateDateString(values.dateTime)}`)
    }
  }

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:w-96">
        <FormField
          control={form.control}
          name="dateTime"
          render={({ field: { name, value, onChange, onBlur, disabled } }) => (
            <FormItem className="space-y-1">
              <FormLabel className="sr-only">Date Time</FormLabel>
              <FormControl>
                <DateTimePicker
                  name={name}
                  dateTime={value}
                  setDateTime={onChange}
                  onBlur={onBlur}
                  disabled={disabled}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage className="pl-0.5 font-normal" />
            </FormItem>
          )}
        />

        <Button type="submit" size="sm" className="mt-3">
          Submit
        </Button>
      </form>
    </Form>
  )
}
