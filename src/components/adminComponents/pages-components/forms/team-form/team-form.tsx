"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Upload,
  message,
  Select,
  Checkbox,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import resourceApi from "@/lib/api/resourceApi";
import { MediaFile } from "@/types/utils-type";
import { TeamItem, TeamPayload } from "@/types/teams";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { createTeam, updateTeam } from "@/redux-store/slices/teamSlice";
import { fetchTeamsCategories } from "@/redux-store/slices/teamCategorySlice";
import { useRouter } from "next/navigation";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

interface TeamFormProps {
  team?: TeamItem;
}

const TeamForm: React.FC<TeamFormProps> = ({ team }) => {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [image, setImage] = useState<MediaFile | null>(null);
  const [coverImage, setCoverImage] = useState<MediaFile | null>(null);
  const [bioData, setBioData] = useState<MediaFile | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { items: categories } = useSelector(
    (state: RootState) => state?.teamsCategory,
  );

  useEffect(() => {
    setIsClient(true); // ensure client rendering
    dispatch(fetchTeamsCategories({}));

    if (team) {
      // Set initial form values for edit
      form.setFieldsValue({
        name: team?.name,
        post: team?.post,
        page_id: team?.category?.id,
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

      // Initialize Upload state with existing files
      if (team?.image) setImage(team?.image);
      if (team?.cover_image) setCoverImage(team?.cover_image);
      if (team?.bio_data) setBioData(team?.bio_data);
    }
  }, [dispatch, team, form]);

  const handleFileUpload = async (
    rawFile: File,
    setter: (file: MediaFile) => void,
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
    } catch (error) {
      console.error(error);
      setUploading(false);
      message.error("File upload failed");
    }
    return false; // prevent auto upload
  };

  const onFinish = (values: any) => {
    const payload: TeamPayload = {
      name: values?.name,
      categoryId: values?.page_id,
      post: values?.post,
      image: image || (team?.image as MediaFile),
      coverImage: coverImage || (team?.cover_image as MediaFile),
      bioData: bioData || (team?.bio_data as MediaFile),
      description: values?.description,
      email: values?.email,
      phoneNo: values?.phoneNo,
      fbLink: values?.fbLink,
      instagramLink: values?.instagramLink,
      twitter: values?.twitter,
      linkedIn: values?.linkedIn,
      youtube: values?.youtube,
      order: Number(values?.order) || 0,
      status: values?.status ? 1 : 0,
    };

    if (team?.id) {
      dispatch(updateTeam({ id: team?.id, values: payload }));
      router.back();
    } else {
      dispatch(createTeam({ values: payload }));
      router.back();
    }
  };

  if (!isClient) return null;

  return (
    <Form
      form={form}
      name="team-form"
      autoComplete="off"
      layout="vertical"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        {/* NAME */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Fullname is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* POST */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Post"
            name="post"
            rules={[{ required: true, message: "Post is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* EMAIL */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input type="email" />
          </Form.Item>
        </Col>

        {/* PHONE */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Phone"
            name="phoneNo"
            rules={[{ required: true, message: "Phone is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* SOCIAL LINKS */}
        <Col xs={24} md={12}>
          <Form.Item label="Facebook" name="fbLink">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Instagram" name="instagramLink">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Twitter" name="twitter">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="LinkedIn" name="linkedIn">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="YouTube" name="youtube">
            <Input />
          </Form.Item>
        </Col>
        {/* CATEGORY */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Category"
            name="page_id"
            rules={[{ required: true, message: "Category is required" }]}
          >
            <Select placeholder="Select category" allowClear>
              {categories?.map((item) => (
                <Select.Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        {/* IMAGE */}
        <Col xs={24} md={12} lg={8}>
          <Form.Item label="Image" name="image">
            <Upload
              beforeUpload={(file) => handleFileUpload(file, setImage)}
              listType="picture"
              accept=".jpg,.jpeg,.png,.webp"
              maxCount={1}
              fileList={
                image
                  ? [
                      {
                        uid: image?.uid,
                        name: image?.name,
                        url: image?.url,
                      },
                    ]
                  : []
              }
              onRemove={() => setImage(null)}
            >
              <Button icon={<UploadOutlined />} loading={uploading}>
                Upload Image
              </Button>
            </Upload>
          </Form.Item>
        </Col>

        {/* COVER IMAGE */}
        <Col xs={24} md={12} lg={8}>
          <Form.Item label="Cover Image" name="coverImage">
            <Upload
              beforeUpload={(file) => handleFileUpload(file, setCoverImage)}
              listType="picture"
              accept=".jpg,.jpeg,.png,.webp"
              maxCount={1}
              fileList={
                coverImage
                  ? [
                      {
                        uid: coverImage?.uid,
                        name: coverImage?.name,
                        url: coverImage?.url,
                      },
                    ]
                  : []
              }
              onRemove={() => setCoverImage(null)}
            >
              <Button icon={<UploadOutlined />} loading={uploading}>
                Upload Cover
              </Button>
            </Upload>
          </Form.Item>
        </Col>

        {/* BIO DATA */}
        <Col xs={24} md={12} lg={8}>
          <Form.Item label="Bio Data" name="bioData">
            <Upload
              beforeUpload={(file) => handleFileUpload(file, setBioData)}
              listType="picture"
              maxCount={1}
              fileList={
                bioData
                  ? [
                      {
                        uid: bioData?.uid,
                        name: bioData?.name,
                        url: bioData?.url,
                      },
                    ]
                  : []
              }
              onRemove={() => setBioData(null)}
            >
              <Button icon={<UploadOutlined />} loading={uploading}>
                Upload Bio Data
              </Button>
            </Upload>
          </Form.Item>
        </Col>

        {/* ORDER */}
        <Col xs={24} md={12} lg={8}>
          <Form.Item
            label="Order"
            name="order"
            rules={[{ required: true, message: "Order is required" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>

        {/* STATUS */}
        <Col xs={24} md={12} lg={8}>
          <Form.Item label="Status" name="status" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </Col>

        {/* DESCRIPTION */}
        <Col span={24}>
          <Form.Item label="Description" name="description">
            <TextEditor />
          </Form.Item>
        </Col>

        {/* SUBMIT */}
        <Col span={24}>
          <Form.Item>
            <Button
              type="primary"
              className="bg-black text-white hover:!bg-black hover:!text-white"
              htmlType="submit"
            >
              {team?.id ? "Update Team" : "Create Team"}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default TeamForm;
