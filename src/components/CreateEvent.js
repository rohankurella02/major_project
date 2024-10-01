import React, {useEffect, useState} from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from './ui/input'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '../lib/utils'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from './ui/calendar'
import { createEvent } from '../api/eventApi'
import toast from 'react-hot-toast'

const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2),
    startDate: z.string(),
    endDate: z.string(),
    category: z.string(),
    medium: z.string(),
    meetLink: z.string().optional(),
    meetId: z.string().optional(),
    meetPassword: z.string().optional(),
    image: z.unknown(),
    location: z.string(),
});

function CreateEvent() {

    // const { register, handleSubmit, formState: { errors } } = useForm();
    // const form = useForm();
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const handleImage = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setImageError("");
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: ""
        },
    });

    const removeImage = (e) => {
        e?.preventDefault();
        setImagePreview((prev) => null);
        setImage((prev) => null);
    };

    function onSubmit(values) {
        console.log(values);
        createEvent(values)
        .then((res) => {
            console.log(res);
            toast.success("Event Created Successfully");
        })
        .catch((err) => {
            console.log(err);
            toast.error("Event Creation Failed");
        })
    }

  return (
    <div>CreateEvent
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-left">
                  <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                  <Input placeholder="title" {...field} />
                              </FormControl>
                              <FormDescription>This is your public display name.</FormDescription>
                              <FormMessage />
                          </FormItem>
                      )}
                  /><FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                  <Input placeholder="description" {...field} />
                              </FormControl>
                              <FormDescription>This is your public display name.</FormDescription>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  
                  <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Start Date and Time</FormLabel>
                              <FormControl>
                                  <Input type="datetime-local" placeholder="category" {...field} />
                              </FormControl>
                              <FormDescription>This is your public display name.</FormDescription>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>End Date and Time</FormLabel>
                              <FormControl>
                                  <Input type="datetime-local" placeholder="category" {...field} />
                              </FormControl>
                              <FormDescription>This is your public display name.</FormDescription>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Category</FormLabel>
                              <FormControl>
                                  <Input placeholder="category" {...field} />
                              </FormControl>
                              <FormDescription>This is your public display name.</FormDescription>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="medium"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Medium</FormLabel>
                              <FormControl>
                                  <Input placeholder="medium" {...field} />
                              </FormControl>
                              <FormDescription>Online, Offline</FormDescription>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  {form.watch("medium") === "Online" && (
                        <div className="space-y-8 text-left">
                            <FormField
                                control={form.control}
                                name="meetLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Meet Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="meet link" {...field} />
                                        </FormControl>
                                        <FormDescription>This is your public display name.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="meetId"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Meet Id</FormLabel>
                                        <FormControl>
                                            <Input placeholder="meet id" {...field} />
                                        </FormControl>
                                        <FormDescription>This is your public display name.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="meetPassword"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Meet Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="meet password" {...field} />
                                        </FormControl>
                                        <FormDescription>This is your public display name.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    
                  )}
                  {/* <FormField
                      control={form.control}
                      name="meetLink"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Meet Link</FormLabel>
                              <FormControl>
                                  <Input placeholder="meet link" {...field} />
                              </FormControl>
                              <FormDescription>This is your public display name.</FormDescription>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="meetId"
                      render={({ field }) => (
                          <FormItem >
                              <FormLabel>Meet Id</FormLabel>
                              <FormControl>
                                  <Input placeholder="meet id" {...field} />
                              </FormControl>
                              <FormDescription>This is your public display name.</FormDescription>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="meetPassword"
                      render={({ field }) => (
                          <FormItem >
                              <FormLabel>Meet Password</FormLabel>
                              <FormControl>
                                  <Input placeholder="meet password" {...field} />
                              </FormControl>
                              <FormDescription>This is your public display name.</FormDescription>
                              <FormMessage />
                          </FormItem>
                      )}
                  /> */}
                  <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                          <FormItem >
                              <FormLabel>Image</FormLabel>
                              <FormControl>
                                  <Input type="file" placeholder="Image" {...field} />
                              </FormControl>
                              <FormDescription>This is your public display name.</FormDescription>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  
                  {form.watch("medium") === "Offline" && (
                      <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                              <FormItem >
                                  <FormLabel>Location</FormLabel>
                                  <FormControl>
                                      <Input placeholder="location" {...field} />
                                  </FormControl>
                                  <FormDescription>This is your public display name.</FormDescription>
                                  <FormMessage />
                              </FormItem>
                          )}
                      />
                  )}
                  <Button type="submit">Submit</Button>
              </form>
          </Form>
    </div>
  )
}

export default CreateEvent