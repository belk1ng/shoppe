"use client";

import { useActionState, useEffect } from "react";
import { Rating } from "@/entities/review";
import { cn } from "@/shared/lib";
import { Button, Input, useSnackbarContext } from "@/shared/ui";
import { getProductReviewDefaults } from "../lib/getProductReviewDefaults";
import { createReview } from "../model/createReview";
import "./add-product-review.scss";

export interface AddProductReviewProps {
  sku: number;
  className?: string;
}

const block = cn("addProductReview");

export function AddProductReview({ className, sku }: AddProductReviewProps) {
  const [state, formAction, isPending] = useActionState(
    createReview,
    getProductReviewDefaults(sku)
  );

  const { onOpenSnackbar } = useSnackbarContext();

  useEffect(() => {
    if (state.hasSent) {
      onOpenSnackbar("success", "Ваш отзыв отправлен на модерацию");
    }
  }, [state, onOpenSnackbar]);

  return (
    <div className={block({ sent: state.hasSent }, [className])}>
      {state.hasSent ? (
        <h2 className={block("message")}>
          Спасибо за обратную связь, ваш отзыв будет опубликован после проверки!
        </h2>
      ) : (
        <>
          <h2 className={block("title")}>Добавить отзыв</h2>
          <p className={block("subtitle")}>
            Ваш email не будет опубликован. Обязательные поля помечены *
          </p>

          <form action={formAction} className={block("form")}>
            <Input
              defaultValue={state.data.review}
              errorMessage={state.errors?.review?.[0]}
              label="Отзыв*"
              name="review"
              placeholder="Отзыв*"
            />
            <Input
              defaultValue={state.data.name}
              errorMessage={state.errors?.name?.[0]}
              label="Ваше имя*"
              name="name"
              placeholder="Ваше имя*"
            />
            <Input
              defaultValue={state.data.email}
              errorMessage={state.errors?.email?.[0]}
              label="Ваш email*"
              name="email"
              placeholder="Ваш email*"
            />

            <div className={block("rating")}>
              <span>Рейтинг*</span>
              <Rating
                errorMessage={state.errors?.rating?.[0]}
                key={state.data.rating}
                name="rating"
                value={state.data.rating}
              />
            </div>

            <Button
              className={block("button")}
              disabled={isPending}
              type="submit"
              variant="contained-black"
            >
              Отправить
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
