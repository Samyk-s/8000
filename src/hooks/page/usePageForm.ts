"use client";

import { useEffect, useState } from "react";
import { Form, UploadFile, message } from "antd";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux-store/store/store";
import { createPage, getPageById, updatePage } from "@/redux-store/slices/pageSlice";
import { PageItem, PageParent, PagePayload } from "@/types/page";
import { MediaFile } from "@/types/utils-type";
import resourceApi from "@/lib/api/resourceApi";
import pageApi from "@/lib/api/pageApi";

export const usePageForm = (page?: PageItem | null) => {
  const [form] = Form.useForm<PagePayload>();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  // IMAGE STATES
  const [imageFile, setImageFile] = useState<MediaFile | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<MediaFile | null>(null);
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const [coverImageList, setCoverImageList] = useState<UploadFile[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [parentPages, setParentPages] = useState<PageParent[] | []>([]);

  /** Prefill form when editing */
  useEffect(() => {
    if (page) {
      form.setFieldsValue({
        title: page.title,
        shortTitle: page.shortTitle || "",
        description: page.description || "",
        parentId: page.parent?.id ?? 0,
        order: page.order ?? 0,
        page_template: page.page_template,
        isMenu: page.isMenu ? 1 : 0,
        isMainMenu: page.isMainMenu ? 1 : 0,
        isFooterMenu: page.isFooterMenu ? 1 : 0,
      });

      if (page.image) {
        setImageFile(page.image);
        setImageList([
          {
            uid: page.image.uid,
            name: page.image.name,
            status: "done",
            url: page.image.url,
          },
        ]);
      }

      if (page.cover_image) {
        setCoverImageFile(page.cover_image);
        setCoverImageList([
          {
            uid: page.cover_image.uid,
            name: page.cover_image.name,
            status: "done",
            url: page.cover_image.url,
          },
        ]);
      }
    }
  }, [page, form]);

  /** Fetch parent pages */
  useEffect(() => {
    async function getPages() {
      try {
        const res = await pageApi.getParentPage();
        setParentPages(res);
      } catch (error: any) {
        message.error(error.message);
      }
    }
    getPages();
  }, [page]);

  /** Upload handler */
  const handleFileUpload = async (file: File, type: "image" | "cover") => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      if (type === "image") setUploadingImage(true);
      if (type === "cover") setUploadingCover(true);

      const res: MediaFile = await resourceApi.createResource(formData);
      const uploadFile: UploadFile = {
        uid: res.uid,
        name: res.name,
        status: "done",
        url: res.url,
      };

      if (type === "image") {
        setImageFile(res);
        setImageList([uploadFile]);
        form.setFieldsValue({ image: [uploadFile] as any });
      } else {
        setCoverImageFile(res);
        setCoverImageList([uploadFile]);
        form.setFieldsValue({ cover_image: [uploadFile] as any });
      }

      message.success(
        `${type === "image" ? "Image" : "Cover Image"} uploaded successfully!`
      );
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
        const isValid = ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type);
        if (!isValid) {
          message.error("You can only upload JPG, JPEG, PNG, or WEBP files!");
          return "ignore";
        }
        await handleFileUpload(file, type);
        return "ignore";
      };

  /** Submit handler */
  const onFinish = (values: any) => {
    if (!page && (!imageFile || !coverImageFile)) {
      message.error("Please upload both Image and Cover Image");
      return;
    }

    const payload: PagePayload = {
      title: values.title,
      shortTitle: values.shortTitle || "",
      description: values.description || "",
      parentId: Number(values.parentId) || 0,
      order: Number(values.order) || 0,
      isMenu: values.isMenu ? 1 : 0,
      isMainMenu: values.isMainMenu ? 1 : 0,
      isFooterMenu: values.isFooterMenu ? 1 : 0,
      page_template: values.page_template,
    };

    if (imageFile && (!page || page.image?.uid !== imageFile.uid)) {
      payload.image = { ...imageFile };
    }
    if (coverImageFile && (!page || page.cover_image?.uid !== coverImageFile.uid)) {
      payload.cover_image = { ...coverImageFile };
    }

    if (page) {
      dispatch(updatePage({ id: page.id, data: payload }))
        .unwrap()
        .then(() => router.back());
    } else {
      dispatch(createPage({ type: values.type, data: payload }))
        .unwrap()
        .then(() => router.back());
    }
  };


  return {
    form,
    isClient,
    imageList,
    coverImageList,
    uploadingImage,
    uploadingCover,
    parentPages,
    setImageFile,
    setImageList,
    setCoverImageFile,
    setCoverImageList,
    makeBeforeUpload,
    onFinish,
  };
};
