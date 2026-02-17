type Props = {
  categories: string[];
  activeCategory: string;
};

export default function FiltersBar({ categories, activeCategory }: Props) {
  return (
    <div className="filters" aria-label="Category filters">
      <a className={`chip ${activeCategory === "all" ? "chipActive" : ""}`} href="/?category=all">
        All
      </a>

      {categories.map((c) => (
        <a
          key={c}
          className={`chip ${activeCategory === c ? "chipActive" : ""}`}
          href={`/?category=${encodeURIComponent(c)}`}
        >
          {c}
        </a>
      ))}
    </div>
  );
}
