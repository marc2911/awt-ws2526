export default function Item({
  name,
  selected,
  onToggle
}: {
  name: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <li>
      <span
        style={{
          fontWeight: selected ? "bold" : "normal",
          color: selected ? "green" : "black"
        }}
      >
        {name}
      </span>

      <button onClick={onToggle}>{selected ? "Unselect" : "Select"}</button>

      {/* conditional rendering */}
      {selected && <span> ✔</span>}
    </li>
  );
}
