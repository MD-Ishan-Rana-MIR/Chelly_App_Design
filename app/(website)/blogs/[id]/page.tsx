import type { Metadata } from "next";
import BlogDetailsPage from "./BlogDetails";

type Props = {
  params: {
    id: string;
  };
};

// 🔥 Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Blog ${params.id} | LOVELYS`,
    description: "Read detailed blog article from LOVELYS.",
    keywords: ["blog", "lovelys", "article", "details"],
  };
}

const Page = ({ params }: Props) => {
  return (
    <div>
      <BlogDetailsPage id={params.id} />
    </div>
  );
};

export default Page;