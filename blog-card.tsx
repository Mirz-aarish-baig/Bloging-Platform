import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Heart, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { useAuth } from "../hooks/use-auth";


interface User {
  uid: string;
  displayName?: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  createdAt?: string;
  userImage?: string;
  likes?: string[];
  comments?: { id: string; author: string; content: string; createdAt: string }[];
}

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { user } = useAuth() as { user: User | null }; // ✅ Properly typed user
  const [updatedPost, setUpdatedPost] = useState<Post>(post);
  const [newComment, setNewComment] = useState(""); // ✅ Moved inside component
  const [showComments, setShowComments] = useState(false); // ✅ Moved inside component

  useEffect(() => {
    const postRef = doc(db, "posts", post.id);
    const unsubscribe = onSnapshot(postRef, (doc) => {
      if (doc.exists()) {
        setUpdatedPost({ id: doc.id, ...doc.data() } as Post);
      }
    });

    return () => unsubscribe();
  }, [post.id]);

  const handleLike = async () => {
    if (!user) return alert("Login to like the post!");

    const postRef = doc(db, "posts", post.id);
    const isLiked = updatedPost.likes?.includes(user.uid);

    await updateDoc(postRef, {
      likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
    });
  };

  const handleComment = async () => {
    if (!user) return alert("Login to comment!");
    if (!newComment.trim()) return;

    const postRef = doc(db, "posts", post.id);
    const comment = {
      id: Date.now().toString(),
      author: user.displayName || "Anonymous",
      content: newComment,
      createdAt: new Date().toISOString(),
    };

    await updateDoc(postRef, {
      comments: arrayUnion(comment),
    });

    setNewComment("");
  };

  if (!updatedPost) return null;

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden">
        <img
          src={updatedPost.thumbnail || "https://images.unsplash.com/photo-1499750310107-5fef28a66643"}
          alt={updatedPost.title}
          className="w-full h-48 object-cover"
        />

        <CardHeader className="space-y-2">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={updatedPost.userImage || "/default-avatar.png"} />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
            <div className="text-sm text-muted-foreground">
              {updatedPost.createdAt ? format(new Date(updatedPost.createdAt), "MMM d, yyyy") : "Date not available"}
            </div>
          </div>
          <h3 className="font-bold text-xl line-clamp-2">{updatedPost.title}</h3>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{updatedPost.content}</p>
        </CardContent>

        <CardFooter className="flex-col space-y-4">
          <div className="flex justify-between w-full">
            <Button variant="ghost" size="sm" onClick={handleLike}>
            <Heart
  className={`h-4 w-4 mr-2 ${
    updatedPost?.likes && Array.isArray(updatedPost.likes) && user?.uid
      ? updatedPost.likes.includes(user.uid)
        ? "fill-current text-red-500"
        : ""
      : ""
  }`}
/>

              {updatedPost?.likes?.length || 0} Likes
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)}>
              <MessageCircle className="h-4 w-4 mr-2" />
              {updatedPost?.comments?.length || 0} Comments
            </Button>
          </div>

          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full space-y-2"
              >
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full"
                />
                <Button size="sm" onClick={handleComment}>
                  Post Comment
                </Button>
                <div className="space-y-2">
                  {updatedPost.comments?.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-2 rounded-lg bg-muted"
                    >
                      <p className="text-sm font-semibold">{comment.author}</p>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
