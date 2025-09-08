"use client";

import React, { useState } from "react";
import { Button, Input } from "antd";
import { CSS } from "@dnd-kit/utilities";
// Correct imports
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useDroppable,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface Item {
  key: string;
  title: string;
}

const mockData: Item[] = [
  { key: "1", title: "Destination/Explore Nepal" },
  { key: "2", title: "Destination/Explore Nepal/Trekking and Peak Climbing" },
  {
    key: "3",
    title: "Destination/Explore Nepal/Trekking and Peak Climbing/Everest",
  },
  { key: "4", title: "Destination/Explore Nepal/Expedition/Above 7000m" },
  { key: "5", title: "Destination/Explore Nepal/Other Activities/Paragliding" },
];

// === Sortable Item ===
const SortableItem: React.FC<{
  id: string;
  title: string;
  isSelected?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
}> = ({ id, title, isSelected, onAdd, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        padding: "8px 12px",
        marginBottom: 8,
        border: "1px solid #d9d9d9",
        borderRadius: 4,
        background: "#f5f5f5",
        cursor: "grab",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>{title}</span>
      {isSelected ? (
        <Button size="small" onClick={onRemove}>
          -
        </Button>
      ) : (
        <Button size="small" onClick={onAdd}>
          +
        </Button>
      )}
    </div>
  );
};

// === Droppable List ===
const DroppableList: React.FC<{
  id: string;
  items: Item[];
  title: string;
  onAddItem?: (item: Item) => void;
  onRemoveItem?: (item: Item) => void;
  search?: string;
}> = ({ id, items, title, onAddItem, onRemoveItem, search = "" }) => {
  const { setNodeRef } = useDroppable({ id });

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        border: "1px solid #d9d9d9",
        borderRadius: 4,
        padding: 8,
        minHeight: 300,
      }}
    >
      <h4>{title}</h4>
      <SortableContext
        items={filteredItems.map((i) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        {filteredItems.map((item) => (
          <SortableItem
            key={item.key}
            id={item.key}
            title={item.title}
            isSelected={!!onRemoveItem}
            onAdd={() => onAddItem && onAddItem(item)}
            onRemove={() => onRemoveItem && onRemoveItem(item)}
          />
        ))}
      </SortableContext>
    </div>
  );
};

// === Main Component ===
const CreatePackageTransfer: React.FC = () => {
  const [available, setAvailable] = useState<Item[]>(mockData);
  const [selected, setSelected] = useState<Item[]>([]);
  const [search, setSearch] = useState("");

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id as string;

    // Move inside Available
    if (available.find((i) => i.key === activeId) && over.id === "available") {
      const oldIndex = available.findIndex((i) => i.key === activeId);
      const newIndex = available.findIndex((i) => i.key === over.id);
      setAvailable(arrayMove(available, oldIndex, newIndex));
    }

    // Move inside Selected
    if (selected.find((i) => i.key === activeId) && over.id === "selected") {
      const oldIndex = selected.findIndex((i) => i.key === activeId);
      const newIndex = selected.findIndex((i) => i.key === over.id);
      setSelected(arrayMove(selected, oldIndex, newIndex));
    }

    // Move from Available → Selected
    if (available.find((i) => i.key === activeId) && over.id === "selected") {
      const item = available.find((i) => i.key === activeId);
      if (!item) return;
      setSelected([...selected, item]);
      setAvailable(available.filter((i) => i.key !== activeId));
    }

    // Move from Selected → Available
    if (selected.find((i) => i.key === activeId) && over.id === "available") {
      const item = selected.find((i) => i.key === activeId);
      if (!item) return;
      setAvailable([...available, item]);
      setSelected(selected.filter((i) => i.key !== activeId));
    }
  };

  const handleAdd = (item: Item) => {
    setSelected([...selected, item]);
    setAvailable(available.filter((i) => i.key !== item.key));
  };

  const handleRemove = (item: Item) => {
    setAvailable([...available, item]);
    setSelected(selected.filter((i) => i.key !== item.key));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div style={{ flex: 1 }}>
          <Input
            placeholder="Search available items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginBottom: 8 }}
          />
          <DroppableList
            id="available"
            title="Available"
            items={available}
            onAddItem={handleAdd}
            search={search}
          />
        </div>
        <DroppableList
          id="selected"
          title="Selected"
          items={selected}
          onRemoveItem={handleRemove}
        />
      </div>
    </DndContext>
  );
};

export default CreatePackageTransfer;
