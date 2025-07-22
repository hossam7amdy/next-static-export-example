import { GetStaticProps, GetStaticPaths } from "next";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  const paths = posts.map((post: Post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params?.id}`
  );
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
};

export default function PostPage({ post }: { post: Post }) {
  return (
    <main className="flex min-h-screen flex-col p-24 space-y-2">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-gray-500">{post.body}</p>
      {/* <Image alt="turtles" src="/turtles.jpg" width={300} height={300} /> */}
    </main>
  );
}
