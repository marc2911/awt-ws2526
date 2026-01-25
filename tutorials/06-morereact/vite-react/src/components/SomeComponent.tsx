import { useState } from "react";
import Item from "./Item";

export default function SomeComponent() {
  // local state
  const [items, setItems] = useState([
    { id: 1, name: "Apple", selected: false },
    { id: 2, name: "Banana", selected: true },
    { id: 3, name: "Orange", selected: false }
  ]);

  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

  // toggle item state
  function toggleItem(id: number) {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  }

  // derived data (conditional filtering)
  const visibleItems = showSelectedOnly
    ? items.filter(item => item.selected)
    : items;

  return (
    <div>
      <h1>Fruit List</h1>

      {/* conditional rendering */}
      {items.length === 0 && <p>No items available.</p>}

      <button onClick={() => setShowSelectedOnly(prev => !prev)}>
        {showSelectedOnly ? "Show All" : "Show Selected Only"}
      </button>

      <ul>
        {/* list rendering via map */}
        {visibleItems.map(item => (
          <Item
            key={item.id}
            name={item.name}
            selected={item.selected}
            onToggle={() => toggleItem(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}
