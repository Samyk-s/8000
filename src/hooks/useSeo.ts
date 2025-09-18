"use client";
import { useEffect, useState } from "react";
import { Form, message } from "antd";
import { useRouter } from "next/navigation";
import seoApi from "@/lib/api/seoApi";
import resourceApi from "@/lib/api/resourceApi";
import { MediaFile } from "@/types/utils-type";

export const useSeo = (id: string, type: string) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [file, setFile] = useState<MediaFile | null>(null);
  const [uploading, setUploading] = useState(false);
  const [seoId, setSeoId] = useState<Number | null>();
  const router = useRouter();

  // ================= Handle file upload =================
  const handleFileUpload = async (rawFile: File) => {
    const formData = new FormData();
    formData.append("file", rawFile);

    try {
      setUploading(true);
      const res = await resourceApi.createResource(formData);
      setUploading(false);

      if (res) {
        setFile(res);
        setFileList([
          {
            uid: res.uid,
            name: res?.name,
            status: "done",
            url: res?.url,
          },
        ]);
        message.success("File uploaded successfully!");

      } else {
        message.error("File upload failed");
      }
    } catch {
      setUploading(false);
      message.error("File upload failed");
    }
  };

  // ================= Fetch SEO by ID =================
  useEffect(() => {
    async function fetchSeoById() {
      setLoading(true);
      try {
        const res = await seoApi.getSeo(type, Number(id));
        setSeoId(res?.id);

        form.setFieldsValue({
          title: res.title,
          keywords: res.keywords,
          description: res.description,
          image: res.image
            ? [
              {
                uid: res.image.uid,
                name: res.image.name,
                url: res.image.url,
                status: "done",
              },
            ]
            : [],
        });

        if (res.image) {
          setFileList([
            {
              uid: res.image.uid,
              name: res.image.name,
              url: res.image.url,
              status: "done",
            },
          ]);
        }
      } catch {
        message.error("Failed to load SEO data");
      } finally {
        setLoading(false);
      }
    }
    fetchSeoById();
  }, [id, type, form]);

  // ================= Submit =================
  const onFinish = async (values: any) => {
    try {
      let payload: any = {
        title: values.title,
        keywords: values.keywords,
        description: values.description,
      };

      if (file) {
        payload.image = {
          uid: file.uid,
          name: file.name,
          url: file.url,
          alt: values.alt || file.name,
          type: "image",
          size: file.size,
        };
      }

      await seoApi.updateSeo(Number(seoId), payload);
      message.success("SEO updated successfully");
    } catch {
      message.error("Failed to update SEO");
    }
  };

  return {
    form,
    loading,
    fileList,
    uploading,
    setFileList,
    handleFileUpload,
    onFinish,
  };
};
