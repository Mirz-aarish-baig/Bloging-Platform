import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";


const postsCollection = collection(db, "posts");

export async function createPost(title: string, content: string, thumbnail: string) {
  try {
    const docRef = await addDoc(postsCollection, {
      title,
      content,
      thumbnail,
      createdAt: new Date().toISOString(),
    });

    console.log("Post added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding post:", error);
    throw new Error("Failed to create post");
  }
}

export type Post = {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  createdAt?: string;
  likes?: string[];
  comments?: { id: string; author: string; content: string; createdAt: string }[];
};


export async function getAllPosts(): Promise<Post[]> {
  const snapshot = await getDocs(postsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Post[];
}




export async function getPostById(postId: string) {
  try {
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      throw new Error("Post not found");
    }

    return { id: postSnap.id, ...postSnap.data() };
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Failed to fetch post");
  }
}
