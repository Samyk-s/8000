"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, message } from "antd";
import { CSS } from "@dnd-kit/utilities";
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
import pageApi from "@/lib/api/pageApi";
import { PagePath } from "@/types/page";

interface CreatePackageTransferProps {
  value?: number[]; // controlled (from AntD Form)
  onChange?: (ids: number[]) => void;
}

// Convert PagePath to draggable item format
const mapPagePathToItem = (p: PagePath) => ({
  key: p.pathIds.join("-"),
  title: p.fullPath,
  raw: p,
});

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
  items: { key: string; title: string; raw: PagePath }[];
  title: string;
  onAddItem?: (item: { key: string; title: string; raw: PagePath }) => void;
  onRemoveItem?: (item: { key: string; title: string; raw: PagePath }) => void;
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
const CreatePackageTransfer: React.FC<CreatePackageTransferProps> = ({
  value = [],
  onChange,
}) => {
  const [available, setAvailable] = useState<
    { key: string; title: string; raw: PagePath }[]
  >([]);
  const [selected, setSelected] = useState<
    { key: string; title: string; raw: PagePath }[]
  >([]);
  const [search, setSearch] = useState("");

  // Add item
  const handleAdd = (item: { key: string; title: string; raw: PagePath }) => {
    const newSelected = [...selected, item];
    setSelected(newSelected);
    setAvailable(available.filter((i) => i.key !== item.key));
    onChange?.(newSelected.map((s) => s.raw.pathIds.at(-1)!));
  };

  // Remove item
  const handleRemove = (item: {
    key: string;
    title: string;
    raw: PagePath;
  }) => {
    const newSelected = selected.filter((i) => i.key !== item.key);
    setSelected(newSelected);
    setAvailable([...available, item]);
    onChange?.(newSelected.map((s) => s.raw.pathIds.at(-1)!));
  };

  // Drag reorder
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = selected.findIndex((i) => i.key === active.id);
    const newIndex = selected.findIndex((i) => i.key === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newSelected = arrayMove(selected, oldIndex, newIndex);
      setSelected(newSelected);
      onChange?.(newSelected.map((s) => s.raw.pathIds.at(-1)!));
    }
  };

  // Fetch available pages
  useEffect(() => {
    async function getPath() {
      try {
        const res: PagePath[] = await pageApi.getParentPagePath();
        const items = res.map(mapPagePathToItem);

        const preSelected = items.filter((i) =>
          value.includes(i.raw.pathIds.at(-1)!),
        );
        const remaining = items.filter(
          (i) => !value.includes(i.raw.pathIds.at(-1)!),
        );

        setSelected(preSelected);
        setAvailable(remaining);
      } catch (error: any) {
        message.error(error?.message);
      }
    }
    getPath();
  }, []);

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
