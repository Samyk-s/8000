"use client";
import { useEffect, useState } from "react";
import { Form, message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux-store/store/store";
import resourceApi from "@/lib/api/resourceApi";
import { MediaFile } from "@/types/utils-type";
import { createBlog, updateBlog } from "@/redux-store/slices/blogSlice";
import { useRouter } from "next/navigation";
import { BlogItem } from "@/types/blog";

export const useBlogForm = (blog?: BlogItem) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const router = useRouter();

  const [uploadedFile, setUploadedFile] = useState<MediaFile | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState<string>("");

  // Prefill form if editing
  useEffect(() => {
    if (blog) {
      form.setFieldsValue({
        title: blog.title,
        country: blog.country,
        order: blog.order,
        category: blog.category,
      });
      setDescription(blog.description || "");
      if (blog.image) {
        setUploadedFile(blog.image);
        setFileList([
          {
            uid: blog.image.uid,
            name: blog.image.name,
            status: "done",
            url: blog.image.url,
          },
        ]);
      }
    }
  }, [blog, form]);

  // Handle file upload
  const handleFileUpload = async (rawFile: File) => {
    const formData = new FormData();
    formData.append("file", rawFile);
    try {
      setUploading(true);
      const res = await resourceApi.createResource(formData);
      setUploading(false);
      if (res) {
        setUploadedFile(res);
        setFileList([
          {
            uid: res.uid,
            name: res.name,
            status: "done",
            url: res.url,
          },
        ]);
        message.success("File uploaded successfully!");
      } else {
        message.error("File upload failed");
      }
    } catch (error) {
      setUploading(false);
      message.error("File upload failed");
    }
  };

  const beforeUpload = async (file: File) => {
    const isValidType = ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type);
    if (!isValidType) {
      message.error("You can only upload JPG, JPEG, PNG, or WEBP files!");
      return false;
    }
    await handleFileUpload(file);
    return false;
  };

  // Form submit
  const onFinish = (values: any) => {
    if (!blog && !uploadedFile) {
      message.error("Please upload an image before submitting");
      return;
    }

    const payload: any = {
      ...values,
      order: Number(values.order) || 0,
      description,
    };

    if (uploadedFile && (!blog || blog.image?.uid !== uploadedFile.uid)) {
      payload.image = uploadedFile;
    }

    if (blog?.id) {
      dispatch(updateBlog({ blogId: blog.id, data: payload }))
        .unwrap()
        .then(() => router.back());
    } else {
      const { category, ...rest } = payload;
      dispatch(createBlog({ type: category, data: rest }))
        .unwrap()
        .then(() => router.back());
    }
  };

  return {
    form,
    uploadedFile,
    fileList,
    uploading,
    description,
    setDescription,
    beforeUpload,
    setUploadedFile,
    setFileList,
    onFinish,
  };
};
