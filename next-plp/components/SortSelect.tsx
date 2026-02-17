type Props = {
  value: string;
};

export default function SortSelect({ value }: Props) {
  return (
    <div className="sort">
      <label className="sortLabel" htmlFor="sort">
        Sort
      </label>
      <select id="sort" name="sort" defaultValue={value} className="select">
        <option value="featured">Featured</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="rating_desc">Rating</option>
      </select>
    </div>
  );
}
