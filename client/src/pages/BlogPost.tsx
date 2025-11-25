import { trpc } from "@/_core/trpc";
import { Card } from "@/components/ui/card";
import { Loader2, Calendar, User, Eye } from "lucide-react";
import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";

  const { data: post, isLoading } = trpc.blog.getBySlug.useQuery(slug);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : post ? (
            <article className="space-y-6">
              {post.imageUrl && (
                <div className="w-full h-96 bg-muted rounded-lg overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {post.category && (
                <span className="inline-block text-sm bg-primary/10 text-primary px-3 py-1 rounded">
                  {post.category}
                </span>
              )}

              <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.createdAt).toLocaleDateString("pt-AO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  {post.viewCount || 0} visualizações
                </span>
              </div>

              <Card className="p-6 md:p-8">
                <div 
                  className="prose prose-neutral max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </Card>
            </article>
          ) : (
            <Card className="p-12 text-center">
              <h2 className="text-2xl font-bold mb-2">Post não encontrado</h2>
              <p className="text-muted-foreground">O post que você procura não existe ou foi removido</p>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
