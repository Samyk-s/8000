"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Upload, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import Loader from "../../loader/loader";
import resourceApi from "@/lib/api/resourceApi";
import { MediaFile } from "@/types/utils-type";
import {
  createSummiter,
  updateSummiter,
} from "@/redux-store/slices/summiterSlice";
import { SummitterItem } from "@/types/summitter";
import { useRouter } from "next/navigation";
import SettingTabs from "@/components/adminComponents/tabs/setting-tabs";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

interface SummiterFormProps {
  summitter?: SummitterItem;
}

const SettingForm: React.FC<SummiterFormProps> = ({ summitter }) => {
  const { items, loading } = useSelector((state: RootState) => state.teams);
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const [uploadedFile, setUploadedFile] = useState<MediaFile | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  // useEffect(() => {
  //   dispatch(fetchTeams({ params: {} }));

  //   // If updating, populate the form
  //   if (summitter) {
  //     form.setFieldsValue({
  //       name: summitter.name,
  //       nationality: summitter.nationality,
  //       summittedDate: summitter.summittedDate,
  //       peak: summitter.peak,
  //       summitterEmail: summitter.summitterEmail,
  //       order: summitter.order,
  //       led_by_id: summitter.ledBy?.id,
  //     });

  //     if (summitter.image) {
  //       setUploadedFile(summitter.image);
  //       setFileList([
  //         {
  //           uid: summitter.image.uid,
  //           name: summitter.image.name,
  //           status: "done",
  //           url: summitter.image.url,
  //         },
  //       ]);
  //     }
  //   }
  // }, [dispatch, summitter, form]);

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
      // console.error(error);
      setUploading(false);
      message.error("File upload failed");
    }
  };

  const beforeUpload = async (file: File) => {
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

    await handleFileUpload(file);
    return Upload.LIST_IGNORE;
  };

  const onFinish = (values: any) => {
    // CREATE: require image
    if (!summitter && !uploadedFile) {
      message.error("Please upload an image before submitting");
      return;
    }

    const payload: any = {
      ...values,
      order: Number(values.order),
    };

    // Only include image if it's new or created
    if (
      uploadedFile &&
      (!summitter || summitter.image?.uid !== uploadedFile.uid)
    ) {
      payload.image = uploadedFile;
    }

    if (summitter) {
      // Update mode: only send updated file
      dispatch(updateSummiter({ id: summitter.id, payload }))
        .unwrap()
        .then(() => {
          router.back();
        });
      router.push("/admin/summitters");
    } else {
      // Create mode
      dispatch(createSummiter(payload))
        .unwrap()
        .then(() => {
          router.back();
        });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
    message.error("Please fill all required fields.");
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-3">
      <SettingTabs />
      <Form
        form={form}
        name="summiter-form"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={[16, 10]}>
          {/* title */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Site Title"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Enter site title" />
            </Form.Item>
          </Col>
          {/* email */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input placeholder="example@mail.com" />
            </Form.Item>
          </Col>
          {/* logo */}
          <Col xs={24} md={12}>
            <Form.Item label="Logo" required>
              <Upload
                beforeUpload={beforeUpload}
                listType="picture"
                maxCount={1}
                fileList={fileList}
                onRemove={() => {
                  setUploadedFile(null);
                  setFileList([]);
                }}
              >
                <Button
                  icon={<UploadOutlined />}
                  loading={uploading}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Click to Upload"}
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          {/* footer cover image */}
          <Col xs={24} md={12}>
            <Form.Item label="Footer Cover Image" required>
              <Upload
                beforeUpload={beforeUpload}
                listType="picture"
                maxCount={1}
                fileList={fileList}
                onRemove={() => {
                  setUploadedFile(null);
                  setFileList([]);
                }}
              >
                <Button
                  icon={<UploadOutlined />}
                  loading={uploading}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Click to Upload"}
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          {/* phone */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Phone number is required" },
                {
                  pattern: /^(\+?\d{1,3}[- ]?)?\d{7,14}$/,
                  message: "Please enter a valid phone number",
                },
              ]}
            >
              <Input placeholder="+977 9812345678 or 9812345678" />
            </Form.Item>
          </Col>
          {/* alternate phone */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Alternate Phone Number"
              name="nationality"
              rules={[
                {
                  pattern: /^(\+?\d{1,3}[- ]?)?\d{7,14}$/,
                  message: "Please enter a valid phone number",
                },
              ]}
            >
              <Input placeholder="+977 9812345678 or 9812345678" />
            </Form.Item>
          </Col>
          {/* address */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Address"
              name="nationality"
              rules={[{ required: true, message: "Adrress is required" }]}
            >
              <Input placeholder="Enter address" />
            </Form.Item>
          </Col>
          {/* Trip advisiore logo */}
          <Col xs={24} md={12}>
            <Form.Item label="Trip Adviser Icon" required>
              <Upload
                beforeUpload={beforeUpload}
                listType="picture"
                maxCount={1}
                fileList={fileList}
                onRemove={() => {
                  setUploadedFile(null);
                  setFileList([]);
                }}
              >
                <Button
                  icon={<UploadOutlined />}
                  loading={uploading}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Click to Upload"}
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          {/* google review  */}
          <Col xs={24} md={12}>
            <Form.Item label="Google Review" required>
              <Upload
                beforeUpload={beforeUpload}
                listType="picture"
                maxCount={1}
                fileList={fileList}
                onRemove={() => {
                  setUploadedFile(null);
                  setFileList([]);
                }}
              >
                <Button
                  icon={<UploadOutlined />}
                  loading={uploading}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Click to Upload"}
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          {/* twitter/X link */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Twitter/X Link"
              name="nationality"
              rules={[
                {
                  type: "url",
                  message: "Please enter a valid URL!",
                },
              ]}
            >
              <Input placeholder="https://twitter.com/" />
            </Form.Item>
          </Col>
          {/* facebook link */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Facebook Link"
              name="nationality"
              rules={[
                {
                  type: "url",
                  message: "Please enter a valid URL!",
                },
              ]}
            >
              <Input placeholder="https://www.facebook.com/" />
            </Form.Item>
          </Col>
          {/* Instagram Link */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Instagram Link"
              name="nationality"
              rules={[
                {
                  type: "url",
                  message: "Please enter a valid URL!",
                },
              ]}
            >
              <Input placeholder="https://instagram.com/" />
            </Form.Item>
          </Col>
          {/* Youtube Link */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Youtube Link"
              name="nationality"
              rules={[
                {
                  type: "url",
                  message: "Please enter a valid URL!",
                },
              ]}
            >
              <Input placeholder="https://youtube.com" />
            </Form.Item>
          </Col>
          {/* Google review link */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Google review link"
              name="nationality"
              rules={[
                {
                  type: "url",
                  message: "Please enter a valid URL!",
                },
              ]}
            >
              <Input placeholder="https://www.example.com" />
            </Form.Item>
          </Col>
          {/* Trip Advisor Link */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Google review link"
              name="nationality"
              rules={[
                {
                  type: "url",
                  message: "Please enter a valid URL!",
                },
              ]}
            >
              <Input placeholder="https://www.example.com" />
            </Form.Item>
          </Col>
          {/* Linked Link */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Linked Link"
              name="nationality"
              rules={[
                {
                  type: "url",
                  message: "Please enter a valid URL!",
                },
              ]}
            >
              <Input placeholder="https://www.linkedin.com/company/rewasoft" />
            </Form.Item>
          </Col>
          {/* Map Link */}
          <Col xs={24}>
            <Form.Item
              label="Map Link"
              name="nationality"
              rules={[
                {
                  type: "url",
                  message: "Please enter a valid URL!",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Enter map link" />
            </Form.Item>
          </Col>
          {/* Map Embed Link */}
          <Col xs={24}>
            <Form.Item label="Map Link (Embed)" name="mapLink">
              <TextArea rows={4} placeholder="Enter Google Map embed link" />
            </Form.Item>
          </Col>

          {/* Description */}
          <Col xs={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  max: 6,
                  message: "Description cannot exceed 6 characters",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Description (max 6 chars)"
                maxLength={6}
              />
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

export default SettingForm;
