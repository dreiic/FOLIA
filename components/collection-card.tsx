import Link from "next/link";
import type { Collection } from "../lib/content";
import { Photo } from "./editorial";
import { Icon } from "./icons";

export function CollectionCard({ collection, priority = false }: { collection: Collection; priority?: boolean }) {
  return (
    <article className="collection-card" id={collection.id}>
      <Link href={`/products/${collection.id}`} className="collection-card-link">
        <Photo image={collection.image} className="collection-image" priority={priority}
          sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw" />
        <div className="collection-card-heading">
          <h3>{collection.title}</h3>
          <span className="collection-arrow"><Icon name="arrow" /></span>
        </div>
        <p>{collection.short}</p>
      </Link>
    </article>
  );
}
