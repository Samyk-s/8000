"use client";
import { useEffect, useState } from "react";
import { Form, message, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { useParams, useRouter } from "next/navigation";
import resourceApi from "@/lib/api/resourceApi";
import {
  createSummitterStory,
  updateSummitterStory,
} from "@/redux-store/slices/storySlice";
import { MediaFile } from "@/types/utils-type";
import { StoryItem, StoryPayload } from "@/types/summitter";

export const useSummiterStoryForm = (story?: StoryItem | null) => {
  const { loading } = useSelector((state: RootState) => state.stories);
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const { id } = useParams();
  const router = useRouter();

  // states for image and cover image
  const [imageFile, setImageFile] = useState<MediaFile | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<MediaFile | null>(null);

  const [imageList, setImageList] = useState<any[]>([]);
  const [coverImageList, setCoverImageList] = useState<any[]>([]);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  // Prefill form when editing
  useEffect(() => {
    if (story) {
      form.setFieldsValue({
        title: story.title,
        description: story.description,
      });

      if (story.image) {
        setImageFile(story.image);
        setImageList([
          {
            uid: story.image.uid,
            name: story.image.name,
            status: "done",
            url: story.image.url,
          },
        ]);
      }

      if (story.coverImage) {
        setCoverImageFile(story.coverImage);
        setCoverImageList([
          {
            uid: story.coverImage.uid,
            name: story.coverImage.name,
            status: "done",
            url: story.coverImage.url,
          },
        ]);
      }
    }
  }, [story, form]);

  /** handle file upload */
  const handleFileUpload = async (
    rawFile: File,
    type: "image" | "cover",
  ): Promise<void> => {
    const formData = new FormData();
    formData.append("file", rawFile);

    try {
      if (type === "image") setUploadingImage(true);
      if (type === "cover") setUploadingCover(true);

      const res = await resourceApi.createResource(formData);

      if (res) {
        if (type === "image") {
          setImageFile(res);
          setImageList([
            { uid: res.uid, name: res.name, status: "done", url: res.url },
          ]);
        } else {
          setCoverImageFile(res);
          setCoverImageList([
            { uid: res.uid, name: res.name, status: "done", url: res.url },
          ]);
        }
        message.success(
          `${type === "image" ? "Image" : "Cover image"} uploaded successfully!`,
        );
      } else {
        message.error(`${type} upload failed`);
      }
    } catch {
      message.error("File upload failed");
    } finally {
      if (type === "image") setUploadingImage(false);
      if (type === "cover") setUploadingCover(false);
    }
  };

  /** beforeUpload factory */
  const makeBeforeUpload =
    (type: "image" | "cover") =>
      async (file: File): Promise<string | void> => {
        const isValidType = [
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/webp",
        ].includes(file.type);

        if (!isValidType) {
          message.error("You can only upload JPG, JPEG, PNG, or WEBP files!");
          return Upload.LIST_IGNORE;
        }

        await handleFileUpload(file, type);
        return Upload.LIST_IGNORE;
      };

  /** submit */
  const onFinish = (values: StoryPayload) => {
    if (!story && (!imageFile || !coverImageFile)) {
      message.error(
        "Please upload both Image and Cover Image before submitting",
      );
      return;
    }

    const payload: StoryPayload = {
      title: values.title,
      description: values.description,
    };

    if (imageFile && (!story || story.image?.uid !== imageFile.uid)) {
      payload.image = imageFile;
    }
    if (
      coverImageFile &&
      (!story || story.coverImage?.uid !== coverImageFile.uid)
    ) {
      payload.coverImage = coverImageFile;
    }

    if (story) {
      dispatch(updateSummitterStory({ id: story.id, payload }))
        .unwrap()
        .then(() => router.back());
    } else {
      dispatch(createSummitterStory({ id: Number(id), payload }))
        .unwrap()
        .then(() => router.back());
    }
  };

  return {
    form,
    loading,
    imageList,
    coverImageList,
    uploadingImage,
    uploadingCover,
    makeBeforeUpload,
    setImageFile,
    setImageList,
    setCoverImageFile,
    setCoverImageList,
    onFinish,
  };
};
