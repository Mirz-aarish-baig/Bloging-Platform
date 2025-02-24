import { useForm } from "react-hook-form";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { createPost } from "../lib/blogService";
// import { getAISuggestions } from "../lib/openaiService";

export default function CreatePost() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    },
  });

  const fetchAISuggestion = async () => {
    setLoading(true);
    const suggestion = await getAISuggestions("Suggest a unique blog idea:");
    setAiSuggestion(suggestion);
    setLoading(false);
  };

  const onSubmit = async (data: { title: string; content: string; thumbnail: string }) => {
    try {
      await createPost(data.title, data.content, data.thumbnail);
      toast({ title: "Success", description: "Post created successfully" });
      setLocation("/");
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-xl"
    >
      <h1 className="text-4xl font-bold mb-6 text-center">Create a New Post</h1>

      {/* AI Suggestion Button */}
      <div className="flex justify-end mb-4">
        <Button onClick={fetchAISuggestion} disabled={loading}>
          {loading ? "Generating..." : "Get AI Suggestion"}
        </Button>
      </div>

      {/* AI Suggestion Display */}
      {aiSuggestion && (
        <div className="mb-4 p-4 bg-gray-100 border-l-4 border-blue-500 rounded-md">
          <strong>AI Suggestion:</strong> {aiSuggestion}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your post title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content (Markdown supported)</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Write your post content in markdown..." className="min-h-[300px] font-mono" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter thumbnail image URL" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Creating..." : "Create Post"}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
