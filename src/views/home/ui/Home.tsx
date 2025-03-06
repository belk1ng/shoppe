import { ProductsGrid, ProductSlide } from "@/entities/product";
import FirstSlidePic from "@/shared/assets/images/slide-1.webp";
import SecondSlidePic from "@/shared/assets/images/slide-2.webp";
import { cn } from "@/shared/lib";
import { Carousel } from "@/shared/ui";
import { PatchedLink } from "@/shared/ui";
import { getRecentProducts } from "../model/getRecentProducts";
import "./home.scss";

const block = cn("home");

export async function Home() {
  const products = await getRecentProducts();

  return (
    <main className={block()}>
      <h1 className="visuallyHidden">Главная страница</h1>

      <section className={block("carousel")}>
        <Carousel autoPlayInterval={5_000}>
          <ProductSlide
            imageSrc={FirstSlidePic}
            price={68}
            title="Gold big hoops"
          />
          <ProductSlide
            imageSrc={SecondSlidePic}
            price={75}
            title="Lira Earrings"
          />
          <ProductSlide
            imageSrc={FirstSlidePic}
            price={23}
            title="Hal Earrings"
          />
          <ProductSlide
            imageSrc={SecondSlidePic}
            price={10}
            title="Kaede Hair Pin"
          />
          <ProductSlide
            imageSrc={FirstSlidePic}
            price={12}
            title="Plaine Necklace"
          />
          <ProductSlide
            imageSrc={SecondSlidePic}
            price={199}
            title="Yuki Hair Pin Set of 3"
          />
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
