"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { X } from "lucide-react";

import { schema } from "./formSchema";
import { onSubmitAction } from "./formSubmit";

export function MailForm() {
  const [state, formAction] = useFormState(onSubmitAction, {
    message: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
      ...(state?.fields ?? {}),
    },
  });

  return (
    <Form {...form}>
      {state?.message !== "" && !state.issues && (
        <div className="text-red-500">{state.message}</div>
      )}
      {state.issues && (
        <div className="text-red-500">
          <ul>
            {state.issues.map((i) => (
              <li key={i} className="flex gap-1">
                <X /> {i}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form
        className="space-y-8"
        action={formAction}
        ref={formRef}
        onSubmit={form.handleSubmit(() => formRef.current?.submit())}
      >
        <div className="flex gap-2 w-full flex-wrap">
          <FormField
            control={form.control}
            name="first"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your first name</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your last name</FormDescription>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your email address</FormDescription>
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Register
        </Button>
      </form>
    </Form>
  );
}
