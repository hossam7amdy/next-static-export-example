import { GetStaticProps, GetStaticPaths } from "next";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { lang: "en-US" } }, { params: { lang: "de" } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();

  return {
    props: {
      todos,
    },
  };
};

export default function TodoPage({ todos }: { todos: Todo[] }) {
  return (
    <main className="flex min-h-screen flex-col p-24 space-y-4">
      There are {todos.length} todos.
    </main>
  );
}
