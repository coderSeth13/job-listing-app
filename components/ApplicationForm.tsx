"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Define our form schema with Zod
const applicationFormSchema = z.object({
  job_id: z.string().nonempty("Job ID is required"),
  applicant_name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  resume: z.string().nonempty("Your resume is required"),
});

// Infer form values from the schema
type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

export default function ApplicationForm() {
  // Initialize react-hook-form with Zod resolver
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      job_id: "",
      applicant_name: "",
      email: "",
      resume: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: ApplicationFormValues) {
    try {
      const res = await fetch("http://localhost:3000/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error("Submission failed");
      }
      alert("Application submitted successfully!");
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Error submitting application, please try again later.");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Job ID Field */}
          <FormField
            control={form.control}
            name="job_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Job ID" {...field} />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Name Field */}
          <FormField
            control={form.control}
            name="applicant_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Resume & Cover Letter Field */}
          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume & Cover Letter</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste your resume and cover letter here"
                    {...field}
                    className="resize-none"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full text-white">
            Submit Application
          </Button>
        </form>
      </Form>
    </div>
  );
}
