import { AddToCart } from "@/features/add-to-cart";
import {
  type Product,
  getProductAverageRating,
  getProductPrice,
  ProductImages,
} from "@/entities/product";
import { Rating } from "@/entities/review";
import { cn, getRussianPluralForm } from "@/shared/lib";
import "./product-info.scss";

export interface ProductInfoProps {
  product: Product;
  className?: string;
}

const block = cn("productInfo");

export function ProductInfo({ product, className }: ProductInfoProps) {
  return (
    <section className={block("", [className])}>
      <ProductImages className={block("images")} images={product.images} />

      <div className={block("meta")}>
        <h1 className={block("title")} lang="en">
          {product.name}
        </h1>
        <p className={block("price")}>{getProductPrice(product.price)}</p>

        <div className={block("reviewsContainer")}>
          <Rating
            defaultValue={getProductAverageRating(product)}
            disabled
            name="product-rating"
          />
          <p className={block("reviewsCount")}>
            {getRussianPluralForm(product.reviews.length, [
              "отзыв",
              "отзыва",
              "отзывов",
            ])}
          </p>
        </div>

        <p className={block("description")}>{product.description}</p>

        <AddToCart product={product} />
      </div>
    </section>
  );
}
