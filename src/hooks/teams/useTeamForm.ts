"use client";
import { useEffect, useState } from "react";
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { createTeam, updateTeam } from "@/redux-store/slices/teamSlice";
import { fetchTeamsCategories } from "@/redux-store/slices/teamCategorySlice";
import { TeamItem, TeamPayload } from "@/types/teams";
import { MediaFile } from "@/types/utils-type";
import resourceApi from "@/lib/api/resourceApi";
import { useRouter } from "next/navigation";

export const useTeamForm = (team?: TeamItem) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { items: categories } = useSelector(
    (state: RootState) => state.teamsCategory
  );

  const [uploading, setUploading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [image, setImage] = useState<MediaFile | null>(null);
  const [coverImage, setCoverImage] = useState<MediaFile | null>(null);
  const [bioData, setBioData] = useState<MediaFile | null>(null);

  // Fetch categories + prefill values
  useEffect(() => {
    setIsClient(true);
    dispatch(fetchTeamsCategories({}));

    if (team) {
      form.setFieldsValue({
        name: team?.name,
        post: team?.post,
        categoryId: team?.category?.id,
        email: team?.email,
        phoneNo: team?.phone_no,
        fbLink: team?.fblink,
        instagramLink: team?.instagramlink,
        twitter: team?.twitter,
        linkedIn: team?.linkedIn,
        youtube: team?.youtube,
        order: team?.order,
        status: team?.status === 1,
        description: team?.description,
      });

      if (team?.image) setImage(team.image);
      if (team?.cover_image) setCoverImage(team.cover_image);
      if (team?.bio_data) setBioData(team.bio_data);
    }
  }, [dispatch, team, form]);

  // File upload handler
  const handleFileUpload = async (
    rawFile: File,
    setter: (file: MediaFile) => void
  ) => {
    const formData = new FormData();
    formData.append("file", rawFile);

    try {
      setUploading(true);
      const res = await resourceApi.createResource(formData);
      setUploading(false);

      if (res) {
        setter(res);
        message.success("File uploaded successfully!");
      } else {
        message.error("File upload failed");
      }
    } catch {
      setUploading(false);
      message.error("File upload failed");
    }
    return false;
  };

  // Submit handler
  const onFinish = async (values: any) => {
    if (!team && !image) {
      message.error("Please upload an image before submitting");
      return;
    }

    const payload: TeamPayload = {
      ...values,
      order: Number(values.order) || 0,
      status: values.status ? 1 : 0,
    };

    if (image && (!team || team.image?.uid !== image.uid)) {
      payload.image = image;
    }
    if (coverImage && (!team || team.cover_image?.uid !== coverImage.uid)) {
      payload.coverImage = coverImage;
    }
    if (bioData && (!team || team.bio_data?.uid !== bioData.uid)) {
      payload.bioData = bioData;
    }

    try {
      if (team?.id) {
        await dispatch(updateTeam({ id: team.id, values: payload })).unwrap();
        message.success("Team updated successfully!");
      } else {
        await dispatch(createTeam({ values: payload })).unwrap();
        message.success("Team created successfully!");
      }
      router.back();
    } catch {
      message.error("Failed to save team");
    }
  };

  return {
    form,
    uploading,
    isClient,
    image,
    setImage,
    coverImage,
    setCoverImage,
    bioData,
    setBioData,
    categories,
    handleFileUpload,
    onFinish,
  };
};
