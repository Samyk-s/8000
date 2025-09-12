"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Upload, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import Loader from "../../loader/loader";
import { fetchTeams } from "@/redux-store/slices/teamSlice";
import resourceApi from "@/lib/api/resourceApi";
import { MediaFile } from "@/types/utils-type";
import {
  createSummiter,
  updateSummiter,
} from "@/redux-store/slices/summiterSlice";
import { SummitterItem } from "@/types/summitter";
import { useRouter } from "next/navigation";
import SummitterTabs from "@/components/adminComponents/tabs/summitter-tabs";

const { Option } = Select;

interface SummiterFormProps {
  summitter?: SummitterItem;
}

const SummiterForm: React.FC<SummiterFormProps> = ({ summitter }) => {
  const { items, loading } = useSelector((state: RootState) => state.teams);
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const [uploadedFile, setUploadedFile] = useState<MediaFile | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    dispatch(fetchTeams({ params: {} }));

    // If updating, populate the form
    if (summitter) {
      form.setFieldsValue({
        name: summitter.name,
        nationality: summitter.nationality,
        summittedDate: summitter.summittedDate,
        peak: summitter.peak,
        summitterEmail: summitter.summitterEmail,
        order: summitter.order,
        led_by_id: summitter.ledBy?.id,
      });

      if (summitter.image) {
        setUploadedFile(summitter.image);
        setFileList([
          {
            uid: summitter.image.uid,
            name: summitter.image.name,
            status: "done",
            url: summitter.image.url,
          },
        ]);
      }
    }
  }, [dispatch, summitter, form]);

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
      console.error(error);
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
    if (!uploadedFile) {
      message.error("Please upload an image before submitting");
      return;
    }

    const payload = {
      ...values,
      order: Number(values.order),
      image: uploadedFile,
    };

    if (summitter) {
      // Update existing summiter
      dispatch(updateSummiter({ id: summitter.id, payload }));
      router.push("/admin/summitters");
    } else {
      // Create new summiter
      dispatch(createSummiter(payload));
      router.push("/admin/summitters");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Please fill all required fields.");
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-3">
      <SummitterTabs />
      <Form
        form={form}
        name="summiter-form"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={[16, 10]}>
          {/* Name */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Nationality */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Nationality"
              name="nationality"
              rules={[{ required: true, message: "Nationality is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Summitted Date */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Summitted Date"
              name="summittedDate"
              rules={[
                { required: true, message: "Summitted date is required" },
              ]}
            >
              <Input type="date" />
            </Form.Item>
          </Col>

          {/* Peak */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Peak"
              name="peak"
              rules={[{ required: true, message: "Peak is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Email */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Summitter Email"
              name="summitterEmail"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input type="email" />
            </Form.Item>
          </Col>

          {/* Order */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Order"
              name="order"
              rules={[{ required: true, message: "Order is required" }]}
            >
              <Input type="number" min={1} />
            </Form.Item>
          </Col>

          {/* Lead by */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Lead"
              name="led_by_id"
              rules={[{ required: true, message: "Leader is required" }]}
            >
              <Select
                placeholder="Select Lead"
                defaultValue={summitter?.ledBy?.name || ""}
              >
                {items?.map((item) => (
                  <Option key={item?.id} value={item?.id}>
                    {item?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Image */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Image" required>
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
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-fit bg-black text-white hover:!bg-black hover:!text-white"
          >
            {summitter ? "Update" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SummiterForm;
