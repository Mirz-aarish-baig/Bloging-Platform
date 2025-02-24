import { useQuery } from "@tanstack/react-query";
import BlogCard from "../components/blog-card";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Link } from "wouter";
import { PenSquare } from "lucide-react";
import { getAllPosts, type Post } from "../lib/blogService";



export default function HomePage() {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
    queryFn: getAllPosts,
  });

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-r from-blue-200 to-purple-300 text-gray-900">
      <div className="space-y-8 flex-grow relative z-10 px-6 md:px-12 py-12">
        <div className="flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold drop-shadow-md"
          >
            Latest Posts
          </motion.h1>
          <Link href="/create">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button className="bg-white text-blue-600 font-bold shadow-lg hover:shadow-xl transition-all">
                <PenSquare className="mr-2 h-5 w-5" />
                Write a Post
              </Button>
            </motion.div>
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-lg bg-white opacity-50 animate-pulse shadow-xl" />
            ))
          ) : (
            posts?.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="shadow-lg rounded-xl backdrop-blur-md bg-white bg-opacity-80 p-4 hover:shadow-2xl transition-all text-gray-900"
              >
                <BlogCard post={post} />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
