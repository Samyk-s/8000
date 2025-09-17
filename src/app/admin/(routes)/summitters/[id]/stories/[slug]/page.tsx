"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import SummiterStoryForm from "@/components/adminComponents/pages-components/forms/summiter-story-form/summitter-story-form";
import Loader from "@/components/adminComponents/pages-components/loader/loader";
import { useSummitterStory } from "@/hooks/summiter-story/useSummiterStory";
import { fetchSummitterStoryById } from "@/redux-store/slices/storySlice";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { Card } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditSummiterStory = () => {
  const { id, slug } = useParams();
  const { loading, currentStory, getStory } = useSummitterStory();
  useEffect(() => {
    getStory(Number(slug));
  }, [id, slug, getStory]);

  if (loading) return <Loader />;
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Summitter", href: "/admin/summitters/summitters" },
          {
            label: "Edit Summiter",
            href: `/admin/summitters/summitters/${id}`,
          },
          { label: "Stories", href: `/admin/summitters/${id}/stories` },
          {
            label: "Edit Story",
            href: `/admin/summitters/${id}/stories/${slug}`,
          },
        ]}
        separator="/"
      />
      <Card>
        <SummiterStoryForm story={currentStory} />
      </Card>
    </div>
  );
};

export default EditSummiterStory;
