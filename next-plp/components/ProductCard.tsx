import Image from "next/image";
import { Product } from "@/lib/types";

type Props = { product: Product };

function toINR(usd: number) {
  // simple conversion for UI; not real-time currency
  const inr = Math.round(usd * 83);
  return `₹ ${inr.toLocaleString("en-IN")}`;
}

export default function ProductCard({ product }: Props) {
  const rating = product.rating?.rate ?? 4.0;

  return (
    <article className="card">
      <div className="cardMedia">
        <Image
          src={product.image}
          alt={`Product image of ${product.title}`}
          fill
          sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 25vw"
          className="cardImg"
        />
      </div>

      <div className="cardBody">
        <h3 className="cardTitle" title={product.title}>
          {product.title}
        </h3>

        <p className="cardMeta">
          <span className="metaText">{product.category}</span>
          <span className="metaDot">•</span>
          <span className="metaText">★ {rating.toFixed(1)}</span>
        </p>

        <div className="cardRow">
          <span className="price">{toINR(product.price)}</span>
          <button className="btn" type="button" aria-label={`Add ${product.title} to cart`}>
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
