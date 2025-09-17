"use client";

import React from "react";
import { Form, Input, Button, Row, Col, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import SettingTabs from "@/components/adminComponents/tabs/setting-tabs";
import TextArea from "antd/es/input/TextArea";
import { SettingPayload, SiteSettingItem } from "@/types/site-setting";
import useSettingForm from "@/hooks/useSetting";

interface SettingFormProps {
  setting?: SiteSettingItem;
}

const SettingForm: React.FC<SettingFormProps> = ({ setting }) => {
  const {
    form,
    loading,
    uploading,
    logoList,
    setLogoList,
    secondaryLogoList,
    setSecondaryLogoList,
    faviconList,
    setFaviconList,
    recommendedImgList,
    setRecommendedImgList,
    paymentImgList,
    setPaymentImgList,
    makeBeforeUpload,
    onFinish,
    setLogo,
    setSecondaryLogo,
    setFavicon,
    setRecommendedImg,
    setPaymentImg,
  } = useSettingForm(setting);

  return (
    <div className="flex flex-col gap-3">
      <SettingTabs />
      <Form
        form={form}
        name="setting-form"
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={[16, 10]}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Site Title"
              name="title"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter site title" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
                {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              ]}
            >
              <Input placeholder="example@mail.com" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Phone number is required" },
                {
                  pattern: /^\+?[0-9]{7,15}$/,
                  message: "Please enter a valid phone number (+9779800000000)",
                },
              ]}
            >
              <Input placeholder="+977 9812345678" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Phone number is required" },
                {
                  pattern: /^(\+?\d{1,3}[- ]?)?\d{10}$/,
                  message:
                    "Invalid phone number. Include 10 digits, with or without country code",
                },
              ]}
            >
              <Input placeholder="+977 9812345678" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Alternate Phone Number"
              name="alt_phone"
              rules={[
                {
                  pattern: /^(\+?\d{1,3}[- ]?)?\d{10}$/,
                  message:
                    "Invalid phone number. Include 10 digits, with or without country code",
                },
              ]}
            >
              <Input placeholder="+977 9812345678" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter address" />
            </Form.Item>
          </Col>

          {/* Social Links */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Twitter/X Link"
              name="twitter"
              rules={[{ type: "url", message: "It should be link" }]}
            >
              <Input placeholder="https://twitter.com/" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Facebook Link"
              name="facebook"
              rules={[{ type: "url", message: "It should be link" }]}
            >
              <Input placeholder="https://www.facebook.com/" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Instagram Link"
              name="instagram"
              rules={[{ type: "url", message: "It should be link" }]}
            >
              <Input placeholder="https://instagram.com/" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Youtube Link"
              name="youtube"
              rules={[{ type: "url" }]}
            >
              <Input placeholder="https://youtube.com" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="TikTok Link"
              name="tik_tok"
              rules={[{ type: "url", message: "It should be link" }]}
            >
              <Input placeholder="https://www.tiktok.com/" />
            </Form.Item>
          </Col>

          {/* Map Link */}
          <Col xs={24}>
            <Form.Item
              label="Map Link"
              name="map_link"
              rules={[{ type: "url", message: "It should be link" }]}
            >
              <TextArea rows={4} placeholder="Enter map link" />
            </Form.Item>
          </Col>

          {/* Upload Fields */}
          <Col xs={24} md={12}>
            <Form.Item label="Logo" required>
              <Upload
                beforeUpload={makeBeforeUpload("logo")}
                listType="picture"
                maxCount={1}
                fileList={logoList}
                onRemove={() => {
                  setLogo(null);
                  setLogoList([]);
                }}
              >
                <Button icon={<UploadOutlined />} loading={uploading}>
                  {uploading ? "Uploading..." : "Click to Upload"}
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Secondary Logo" required>
              <Upload
                beforeUpload={makeBeforeUpload("secondaryLogo")}
                listType="picture"
                maxCount={1}
                fileList={secondaryLogoList}
                onRemove={() => {
                  setSecondaryLogo(null);
                  setSecondaryLogoList([]);
                }}
              >
                <Button icon={<UploadOutlined />} loading={uploading}>
                  {uploading ? "Uploading..." : "Click to Upload"}
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Favicon" required>
              <Upload
                beforeUpload={makeBeforeUpload("favicon")}
                listType="picture"
                maxCount={1}
                fileList={faviconList}
                onRemove={() => {
                  setFavicon(null);
                  setFaviconList([]);
                }}
              >
                <Button icon={<UploadOutlined />} loading={uploading}>
                  {uploading ? "Uploading..." : "Click to Upload"}
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Recommended Image" required>
              <Upload
                beforeUpload={makeBeforeUpload("recommendedImg")}
                listType="picture"
                maxCount={1}
                fileList={recommendedImgList}
                onRemove={() => {
                  setRecommendedImg(null);
                  setRecommendedImgList([]);
                }}
              >
                <Button icon={<UploadOutlined />} loading={uploading}>
                  {uploading ? "Uploading..." : "Click to Upload"}
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Payment Image" required>
              <Upload
                beforeUpload={makeBeforeUpload("paymentImg")}
                listType="picture"
                maxCount={1}
                fileList={paymentImgList}
                onRemove={() => {
                  setPaymentImg(null);
                  setPaymentImgList([]);
                }}
              >
                <Button icon={<UploadOutlined />} loading={uploading}>
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
