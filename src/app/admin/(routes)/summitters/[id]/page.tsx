"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import SummiterForm from "@/components/adminComponents/pages-components/forms/summitter-form/summitter-form";
import Loader from "@/components/adminComponents/pages-components/loader/loader";
import { fetchSummiterById } from "@/redux-store/slices/summiterSlice";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { SummitterItem } from "@/types/summitter";
import { Card } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SummitterEditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, summitter } = useSelector(
    (state: RootState) => state.summiter,
  );

  useEffect(() => {
    dispatch(fetchSummiterById(Number(id)));
  }, [dispatch, id]);

  if (loading) return <Loader />;
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Edit Summitter", href: `/admin/summitters/${id}` },
        ]}
        separator="/"
      />

      <Card>
        <SummiterForm summitter={summitter as SummitterItem} />
      </Card>
    </div>
  );
};

export default SummitterEditPage;
