import React, { useState } from "react";
import { api } from "~/utils/api";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Links } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";

const bioSchema = z
  .object({
    // title: z.string().min(1).max(100),
    bio: z.string().min(1).max(100),
    pronoun: z.string().min(1).max(100),
    // location: z.string().min(1).max(100),
    // website: z.string().min(1).max(100),
    // twitter: z.string().min(1).max(100),
    // github: z.string().min(1).max(100),
    // linkedin: z.string().min(1).max(100),
    // instagram: z.string().min(1).max(100),
    // facebook: z.string().min(1).max(100),
  })
  .nonstrict();

export function UserForm() {
  const form = useForm<z.infer<typeof bioSchema>>({
    resolver: zodResolver(bioSchema),
    defaultValues: {
      bio: "",
      pronoun: "",
    },
  });
  const updateBio = api.meta.create.useMutation();

  function onSubmit(values: z.infer<typeof bioSchema>) {
    updateBio.mutate({
      bio: values.bio,
      pronoun: values.pronoun,
      title: "fghfgh",
    });
    console.log(values);
  }

  function onSubmits() {
    updateBio.mutate({
      bio: form.watch("bio"),
      pronoun: form.watch("pronoun"),
      title: "fghfgh",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={void form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input
                  placeholder="Software Engineer | Content Creator..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pronoun"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pronoun</FormLabel>
              <FormControl>
                <Input placeholder="he/him" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
      <Button type="button" onClick={() => onSubmits()}>
        Submit
      </Button>
    </Form>
  );
}
