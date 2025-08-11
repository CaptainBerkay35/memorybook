
interface SortSelectorProps {
  sortBy: string;
  order: string;
  onChange: (sortBy: string, order: string) => void;
}

export default function SortSelector({ sortBy, order, onChange }: SortSelectorProps) {
  return (
    <div className="mb-4">
      <select
        value={`${sortBy}-${order}`}
        onChange={(e) => {
          const [newSortBy, newOrder] = e.target.value.split("-");
          onChange(newSortBy, newOrder);
        }}
        className="border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="createdAt-desc">En Yeni</option>
        <option value="createdAt-asc">İlk Yüklenen</option>
        <option value="likesCount-desc">En Çok Beğenilen</option>
      </select>
    </div>
  );
}
