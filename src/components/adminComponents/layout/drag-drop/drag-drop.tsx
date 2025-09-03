"use client";

import React, { useState } from "react";
import { Button, Space } from "antd";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  onAdd?: () => void;
  onRemove?: () => void;
  isSelected?: boolean;
}> = ({ id, title, onAdd, onRemove, isSelected }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style: React.CSSProperties = {
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
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <span>{title}</span>
      {isSelected ? (
        <Button onClick={onRemove} size="small">
          -
        </Button>
      ) : (
        <Button onClick={onAdd} size="small">
          +
        </Button>
      )}
    </div>
  );
};

// === Droppable List ===
const DroppableList: React.FC<{
  id: string;
  title: string;
  items: Item[];
  onAddItem?: (item: Item) => void;
  onRemoveItem?: (item: Item) => void;
}> = ({ id, title, items, onAddItem, onRemoveItem }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        border: "1px solid #d9d9d9",
        borderRadius: 4,
        padding: 8,
        minHeight: 200,
      }}
    >
      <h4>{title}</h4>
      <SortableContext
        items={items.map((i) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item) => (
          <SortableItem
            key={item.key}
            id={item.key}
            title={item.title}
            onAdd={() => onAddItem && onAddItem(item)}
            onRemove={() => onRemoveItem && onRemoveItem(item)}
            isSelected={!!onRemoveItem}
          />
        ))}
      </SortableContext>
    </div>
  );
};

// === CreatePackageTransfer Component ===
interface CreatePackageTransferProps {
  value?: Item[];
  onChange?: (value: Item[]) => void;
}

const CreatePackageTransfer: React.FC<CreatePackageTransferProps> = ({
  value = [],
  onChange,
}) => {
  const [selected, setSelected] = useState<Item[]>(value);
  const [search, setSearch] = useState("");

  // Derive available items dynamically
  const available = mockData.filter(
    (i) => !selected.some((v) => v.key === i.key),
  );
  const filteredAvailable = available.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  const updateSelected = (newSelected: Item[]) => {
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const handleAdd = (item: Item) => updateSelected([...selected, item]);
  const handleRemove = (item: Item) =>
    updateSelected(selected.filter((i) => i.key !== item.key));
  const handleAddAll = () => updateSelected([...selected, ...available]);
  const handleRemoveAll = () => updateSelected([]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (
      selected.some((i) => i.key === activeId) &&
      selected.some((i) => i.key === overId)
    ) {
      const oldIndex = selected.findIndex((i) => i.key === activeId);
      const newIndex = selected.findIndex((i) => i.key === overId);
      updateSelected(arrayMove(selected, oldIndex, newIndex));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex w-full items-start gap-4">
        <div style={{ flex: 1 }}>
          <Space className="my-5 flex items-center justify-between">
            <input
              type="text"
              placeholder="Search available items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: 8, width: 300 }}
            />
            <Button onClick={handleAddAll}>Add All</Button>
          </Space>
          <DroppableList
            id="available"
            title="Available"
            items={filteredAvailable}
            onAddItem={handleAdd}
          />
        </div>

        <div style={{ flex: 1 }}>
          <Space className="my-5 w-full justify-end">
            <Button onClick={handleRemoveAll}>Remove All</Button>
          </Space>
          <DroppableList
            id="selected"
            title="Selected"
            items={selected}
            onRemoveItem={handleRemove}
          />
        </div>
      </div>
    </DndContext>
  );
};

export default CreatePackageTransfer;
