import useSWR from "swr";
import { GetStaticProps, GetStaticPaths } from "next";
import SPAPostLayout from "../../components/SPAPostLayout";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  const paths = posts.map((post: Post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      id: params?.id,
    },
  };
};

export default function SPAPostPage({ id }: { id: string }) {
  const { data, error } = useSWR(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    fetcher
  );

  if (error) return <h1 className="text-2xl font-bold">Failed to load</h1>;
  if (!data) return <h1 className="text-2xl font-bold">Loading...</h1>;

  return (
    <SPAPostLayout>
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="text-gray-500">{data.body}</p>
    </SPAPostLayout>
  );
}
