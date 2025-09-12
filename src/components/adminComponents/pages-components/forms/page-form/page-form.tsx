"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Upload,
  Select,
  Checkbox,
  message,
  UploadFile,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { PageItem, PageParent, PagePayload } from "@/types/page";
import { PageTemplate, PageType } from "@/types/enum/enum";
import { MediaFile } from "@/types/utils-type";
import resourceApi from "@/lib/api/resourceApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux-store/store/store";
import { createPage, updatePage } from "@/redux-store/slices/pageSlice";
import { useRouter } from "next/navigation";
import pageApi from "@/lib/api/pageApi";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

interface PageFormProps {
  page?: PageItem | null;
}

const PageForm: React.FC<PageFormProps> = ({ page }) => {
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

  // Prefill form when editing
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

      if (page?.image) {
        setImageFile(page?.image);
        setImageList([
          {
            uid: page?.image.uid,
            name: page?.image.name,
            status: "done",
            url: page?.image.url,
          },
        ]);
      }

      if (page.cover_image) {
        setCoverImageFile(page?.cover_image);
        setCoverImageList([
          {
            uid: page?.cover_image.uid,
            name: page?.cover_image.name,
            status: "done",
            url: page?.cover_image.url,
          },
        ]);
      }
    }
  }, [page, form]);

  // function for gettin parent page

  useEffect(() => {
    async function getPages() {
      try {
        const res = await pageApi.getParentPage();
        setParentPages(res);
        // console.log("res", res);
      } catch (error: any) {
        message.error(error.message);
      }
    }
    getPages();
  }, [page]);

  /** Handle file upload */
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
        `${type === "image" ? "Image" : "Cover Image"} uploaded successfully!`,
      );
    } catch (error) {
      console.error(error);
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
      const isValid = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ].includes(file.type);
      if (!isValid) {
        message.error("You can only upload JPG, JPEG, PNG, or WEBP files!");
        return Upload.LIST_IGNORE;
      }
      await handleFileUpload(file, type);
      return Upload.LIST_IGNORE;
    };

  /** Form submit */
  const onFinish = (values: any) => {
    // CREATE: require both images
    if (!page && (!imageFile || !coverImageFile)) {
      message.error("Please upload both Image and Cover Image");
      return;
    }

    const payload: any = {
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

    // Only include image if it's new or created
    if (imageFile && (!page || page.image?.uid !== imageFile.uid)) {
      payload.image = { ...imageFile };
    }

    if (
      coverImageFile &&
      (!page || page.cover_image?.uid !== coverImageFile.uid)
    ) {
      payload.cover_image = { ...coverImageFile };
    }

    if (page) {
      // Update page: only send updated files
      dispatch(updatePage({ id: page.id, data: payload }));
      router.back();
    } else {
      // Create page: require page type
      dispatch(
        createPage({
          type: values.type,
          data: payload,
        }),
      );
      router.back();
    }
  };

  if (!isClient) return null;

  return (
    <div className="h-full dark:bg-[#020D1A]">
      <Form
        form={form}
        name="page-form"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          {/* TITLE */}
          <Col xs={24}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* SHORT TITLE */}
          <Col xs={24}>
            <Form.Item label="Short Title" name="shortTitle">
              <Input />
            </Form.Item>
          </Col>

          {/* IMAGE */}
          <Col xs={24} md={8}>
            <Form.Item label="Image" required>
              <Upload
                beforeUpload={makeBeforeUpload("image")}
                listType="picture"
                maxCount={1}
                fileList={imageList}
                onRemove={() => {
                  setImageFile(null);
                  setImageList([]);
                }}
              >
                <Button
                  icon={<UploadOutlined />}
                  loading={uploadingImage}
                  disabled={uploadingImage}
                >
                  {uploadingImage ? "Uploading..." : "Click to Upload"}
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* COVER IMAGE */}
          <Col xs={24} md={8}>
            <Form.Item label="Cover Image" required>
              <Upload
                beforeUpload={makeBeforeUpload("cover")}
                listType="picture"
                maxCount={1}
                fileList={coverImageList}
                onRemove={() => {
                  setCoverImageFile(null);
                  setCoverImageList([]);
                }}
              >
                <Button
                  icon={<UploadOutlined />}
                  loading={uploadingCover}
                  disabled={uploadingCover}
                >
                  {uploadingCover ? "Uploading..." : "Click to Upload"}
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* ORDER */}
          <Col xs={24} md={8}>
            <Form.Item
              label="Order"
              name="order"
              rules={[{ required: true, message: "Order is required" }]}
            >
              <Input type="number" min={0} />
            </Form.Item>
          </Col>

          {/* PAGE TYPE (create only) */}
          {!page && (
            <Col xs={24} md={12}>
              <Form.Item
                label="Page Type"
                name="type"
                rules={[{ required: true }]}
              >
                <Select allowClear placeholder="Select page type">
                  {Object.values(PageType).map((t) => (
                    <Select.Option key={t} value={t}>
                      {t}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}

          {/* PARENT PAGE */}
          <Col xs={24} md={12}>
            <Form.Item label="Parent Page" name="parentId">
              <Select allowClear placeholder="Select parent page">
                {parentPages?.map((page) => (
                  <Select.Option value={page?.id} key={page?.id}>
                    {page.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* TEMPLATE */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Template"
              name="page_template"
              rules={[{ required: true, message: "Template is required" }]}
            >
              <Select allowClear placeholder="Select template">
                {Object.values(PageTemplate).map((t) => (
                  <Select.Option key={t} value={t}>
                    {t}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* DESCRIPTION */}
          <Col xs={24}>
            <Form.Item label="Description" name="description">
              <TextEditor
                value={form.getFieldValue("description") || ""}
                onChange={(val) => form.setFieldsValue({ description: val })}
              />
            </Form.Item>
          </Col>

          {/* CHECKBOXES */}
          <Col xs={12} md={6} lg={4}>
            <Form.Item name="isMenu" label="Is Menu" valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Form.Item
              name="isMainMenu"
              label="Is Main Menu"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Form.Item
              name="isFooterMenu"
              label="Is Footer Menu"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>

          {/* SUBMIT */}
          <Col span={24}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-black text-white hover:!bg-black hover:!text-white"
              >
                {page ? "Update Page" : "Create Page"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PageForm;
