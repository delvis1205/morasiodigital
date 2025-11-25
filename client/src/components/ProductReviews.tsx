import { useState } from "react";
import { trpc } from "@/_core/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";

interface ProductReviewsProps {
  productId: number;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { user, isAuthenticated } = useAuth();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);

  const { data: reviews, isLoading, refetch } = trpc.reviews.getByProductId.useQuery(productId);
  const createReview = trpc.reviews.create.useMutation();

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para avaliar");
      return;
    }

    if (!comment.trim()) {
      toast.error("Escreva um comentário");
      return;
    }

    try {
      await createReview.mutateAsync({
        productId,
        rating,
        title: title.trim() || undefined,
        comment: comment.trim(),
      });

      toast.success("Avaliação enviada com sucesso!");
      setRating(5);
      setTitle("");
      setComment("");
      setShowForm(false);
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Erro ao enviar avaliação");
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= (interactive ? (hoverRating || rating) : rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } ${interactive ? "cursor-pointer" : ""}`}
            onClick={() => interactive && setRating(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
          />
        ))}
      </div>
    );
  };

  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Avaliações</h2>
          {reviews && reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} ({reviews.length}{" "}
                {reviews.length === 1 ? "avaliação" : "avaliações"})
              </span>
            </div>
          )}
        </div>
        {isAuthenticated && !showForm && (
          <Button onClick={() => setShowForm(true)}>Avaliar Produto</Button>
        )}
      </div>

      {showForm && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Deixe sua avaliação</h3>
          <div className="space-y-4">
            <div>
              <Label>Classificação *</Label>
              {renderStars(rating, true)}
            </div>

            <div>
              <Label>Título (opcional)</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Resumo da sua experiência"
              />
            </div>

            <div>
              <Label>Comentário *</Label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Conte sobre sua experiência com o produto"
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmit} disabled={createReview.isPending}>
                {createReview.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Enviar Avaliação
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </Card>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : reviews && reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review: any) => (
            <Card key={review.id} className="p-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    {renderStars(review.rating)}
                    {review.title && (
                      <h4 className="font-semibold mt-2">{review.title}</h4>
                    )}
                  </div>
                  {review.isVerified === 1 && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Compra Verificada
                    </span>
                  )}
                </div>
                <p className="text-sm">{review.comment}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString("pt-AO")}
                </p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center text-muted-foreground">
          <p>Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>
        </Card>
      )}
    </div>
  );
}
