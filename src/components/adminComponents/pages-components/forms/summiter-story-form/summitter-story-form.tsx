"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import Loader from "../../loader/loader";
import resourceApi from "@/lib/api/resourceApi";
import { MediaFile } from "@/types/utils-type";
import TextEditor from "../../text-editor/text-editor";
import { useParams, useRouter } from "next/navigation";
import {
  createSummitterStory,
  updateSummitterStory,
} from "@/redux-store/slices/storySlice";
import { StoryItem, StoryPayload } from "@/types/summitter";

interface SummiterStoryFormProps {
  story?: StoryItem | null;
}

const SummiterStoryForm: React.FC<SummiterStoryFormProps> = ({ story }) => {
  const { loading } = useSelector((state: RootState) => state.stories);
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const { id } = useParams();

  // states for image and cover image
  const [imageFile, setImageFile] = useState<MediaFile | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<MediaFile | null>(null);

  const [imageList, setImageList] = useState<any[]>([]);
  const [coverImageList, setCoverImageList] = useState<any[]>([]);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const router = useRouter();

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
    } catch (error) {
      // console.error(error);
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
    // CREATE: require both images
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

    // Only include image if it's new or created
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
      // Update mode: only send updated files
      dispatch(updateSummitterStory({ id: story.id, payload }))
        .unwrap()
        .then(() => {
          router.back();
        });
    } else {
      // Create mode
      dispatch(createSummitterStory({ id: Number(id), payload }))
        .unwrap()
        .then(() => {
          router.back();
        });
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-3">
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
            {story ? "Update" : "Save"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SummiterStoryForm;
