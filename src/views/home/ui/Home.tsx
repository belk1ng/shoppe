import {
  generateProductsListJsonLd,
  ProductsGrid,
  ProductSlide,
} from "@/entities/product";
import { cn } from "@/shared/lib";
import { Carousel, PatchedLink } from "@/shared/ui";
import { JsonLd } from "@/shared/ui";
import { getCarouselData } from "../model/getCarouselData";
import { getRecentProducts } from "../model/getRecentProducts";
import "./home.scss";

const block = cn("home");

export async function Home() {
  const [products, carouselItems] = await Promise.all([
    getRecentProducts(),
    getCarouselData(),
  ]);

  return (
    <main className={block()}>
      <JsonLd
        data={generateProductsListJsonLd(products, {
          name: "Последние поступления",
        })}
        id="last-products-json-ld"
      />

      <h1 className="visuallyHidden">Главная страница</h1>

      <section className={block("carousel")}>
        <Carousel autoPlayInterval={5_000}>
          {carouselItems.data.map((item, index) => (
            <ProductSlide
              imageSrc={item.src}
              key={index}
              price={item.price}
              title={item.title}
            />
          ))}
        </Carousel>
      </section>

      <section>
        <header className={block("heading")}>
          <h2 className={block("title")}>Последние поступления</h2>
          <PatchedLink className={block("link")} href="/catalog">
            Все
          </PatchedLink>
        </header>

        <ProductsGrid className={block("products")} products={products} />
      </section>
    </main>
  );
}
