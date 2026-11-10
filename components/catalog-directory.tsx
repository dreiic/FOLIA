"use client";

import { useState } from "react";
import { collections } from "../lib/content";
import catalogModels from "../lib/catalog-models.json";
import { Eyebrow, Photo } from "./editorial";

const models: Record<string, string[]> = catalogModels;

export function CatalogDirectory() {
  const [query, setQuery] = useState("");
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const hasQuery = words.length > 0;
  const results = collections.map((collection, index) => {
    const group = [collection.title, collection.short, ...collection.examples].join(" ").toLowerCase();
    const variants = models[collection.id] ?? [];
    const matches = words.every((word) => group.includes(word));
    return {
      collection,
      index,
      variants: matches ? variants : variants.filter((name) => {
        const text = `${group} ${name.toLowerCase()}`;
        return words.every((word) => text.includes(word));
      }),
      matches,
    };
  }).filter((result) => result.matches || result.variants.length);

  return (
    <>
      {!hasQuery && (
        <nav aria-label="Collection index" className="collection-index">
          <div className="shell">
            {collections.map(({ id, title }, index) => (
              <a key={id} href={`#${id}`}><span>{String(index + 1).padStart(2, "0")}</span> {title}</a>
            ))}
          </div>
        </nav>
      )}
      <div className="shell product-list">
        <div className="catalog-search">
          <label htmlFor="collection-search">Search the collections</label>
          <div>
            <input id="collection-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)}
              placeholder="Try leather, serving board, or NFC" />
            {query && <button type="button" onClick={() => setQuery("")}>Clear</button>}
          </div>
          <p aria-live="polite">{hasQuery ? `${results.length} matching ${results.length === 1 ? "collection" : "collections"}` : "Browse by product type, material, or finish."}</p>
        </div>
        {results.map(({ collection, index, variants }) => (
          <section className={collection.image ? "product-row" : "product-row product-row-text"} id={collection.id} key={collection.id}>
            {collection.image && <Photo image={collection.image} className="product-photo" priority={index === 0} />}
            <div className="split-copy">
              <Eyebrow>Collection / {String(index + 1).padStart(2, "0")}</Eyebrow>
              <h2>{collection.title}</h2>
              <p>{collection.detail}</p>
              <ul className="material-list">{collection.examples.map((example) => <li key={example}>{example}</li>)}</ul>
              {!!variants.length && (
                <details className="variant-list" open={hasQuery || undefined}>
                  <summary>Formats &amp; variations <span>{variants.length}</span></summary>
                  <ul>{variants.map((variant) => <li key={variant}>{variant}</li>)}</ul>
                </details>
              )}
            </div>
          </section>
        ))}
        {!results.length && <p className="no-results">No collections match that search. Try a material or a shorter product name.</p>}
      </div>
    </>
  );
}
