import Link from "next/link";
import { GetStaticProps } from "next";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <main className="flex min-h-screen flex-col p-24 space-y-4">
      {posts.map((post) => (
        <Link
          href={`/post/${post.id}`}
          key={post.id}
          className="flex flex-col space-y-2"
        >
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="text-gray-500">{post.body}</p>
        </Link>
      ))}
    </main>
  );
}
