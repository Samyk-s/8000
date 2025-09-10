"use client";
import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import Loader from "../../loader/loader";
import resourceApi from "@/lib/api/resourceApi";
import { MediaFile } from "@/types/utils-type";
import TextEditor from "../../text-editor/text-editor";
import { useParams } from "next/navigation";
import { createSummitterStory } from "@/redux-store/slices/storySlice";
import { StoryPayload } from "@/types/summitter";
import SummitterTabs from "@/components/adminComponents/tabs/summitter-tabs";

const SummiterStoryForm = () => {
  const { loading } = useSelector((state: RootState) => state.teams);
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const { id } = useParams();

  // separate states for image and coverImage
  const [imageFile, setImageFile] = useState<MediaFile | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<MediaFile | null>(null);

  const [imageList, setImageList] = useState<any[]>([]);
  const [coverImageList, setCoverImageList] = useState<any[]>([]);

  // separate uploading states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  /** handle upload separately for image and cover */
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

  const onFinish = (values: StoryPayload) => {
    if (!imageFile || !coverImageFile) {
      message.error(
        "Please upload both Image and Cover Image before submitting",
      );
      return;
    }

    const payload = {
      title: values.title,
      description: values.description,
      image: imageFile,
      coverImage: coverImageFile,
    };
    dispatch(
      createSummitterStory({
        id: Number(id),
        payload: payload,
      }),
    );
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-3">
      <SummitterTabs />
      <Form
        form={form}
        name="summiter-story-form"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={[16, 10]}>
          {/* Title */}
          <Col xs={24}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Image */}
          <Col xs={24} md={12} lg={8}>
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

          {/* Cover Image */}
          <Col xs={24} md={12} lg={8}>
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

          {/* Description */}
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <TextEditor />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-fit bg-black text-white hover:!bg-black hover:!text-white"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SummiterStoryForm;
