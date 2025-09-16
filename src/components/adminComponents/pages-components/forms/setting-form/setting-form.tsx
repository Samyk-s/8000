"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import resourceApi from "@/lib/api/resourceApi";
import { MediaFile } from "@/types/utils-type";
import SettingTabs from "@/components/adminComponents/tabs/setting-tabs";
import TextArea from "antd/es/input/TextArea";
import { SettingPayload, SiteSettingItem } from "@/types/site-setting";
import { updateSetting } from "@/redux-store/slices/siteSlice";

interface SettingFormProps {
  setting?: SiteSettingItem;
}

const SettingForm: React.FC<SettingFormProps> = ({ setting }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);

  // Separate state for each file
  const [logo, setLogo] = useState<MediaFile | null>(null);
  const [logoList, setLogoList] = useState<any[]>([]);

  const [secondaryLogo, setSecondaryLogo] = useState<MediaFile | null>(null);
  const [secondaryLogoList, setSecondaryLogoList] = useState<any[]>([]);

  const [favicon, setFavicon] = useState<MediaFile | null>(null);
  const [faviconList, setFaviconList] = useState<any[]>([]);

  const [recommendedImg, setRecommendedImg] = useState<MediaFile | null>(null);
  const [recommendedImgList, setRecommendedImgList] = useState<any[]>([]);

  const [paymentImg, setPaymentImg] = useState<MediaFile | null>(null);
  const [paymentImgList, setPaymentImgList] = useState<any[]>([]);
  const { loading } = useSelector((state: RootState) => state.setting);
  // Prefill form and uploaded images
  useEffect(() => {
    if (setting) {
      form.setFieldsValue({
        title: setting.title,
        email: setting.email,
        phone: setting.phone,
        alt_phone: setting.alt_phone,
        address: setting.address,
        twitter: setting.twitter,
        facebook: setting.facebook,
        instagram: setting.instagram,
        youtube: setting.youtube,
        tik_tok: setting.tik_tok,
        map_link: setting.map_link,
      });

      if (setting.logo) {
        setLogo(setting.logo);
        setLogoList([
          {
            uid: setting.logo.uid,
            name: setting.logo.name,
            status: "done",
            url: setting.logo.url,
          },
        ]);
      }
      if (setting.secondaryLogo) {
        setSecondaryLogo(setting.secondaryLogo);
        setSecondaryLogoList([
          {
            uid: setting.secondaryLogo.uid,
            name: setting.secondaryLogo.name,
            status: "done",
            url: setting.secondaryLogo.url,
          },
        ]);
      }
      if (setting.favicon) {
        setFavicon(setting.favicon);
        setFaviconList([
          {
            uid: setting.favicon.uid,
            name: setting.favicon.name,
            status: "done",
            url: setting.favicon.url,
          },
        ]);
      }
      if (setting.recommended_img) {
        setRecommendedImg(setting.recommended_img);
        setRecommendedImgList([
          {
            uid: setting.recommended_img.uid,
            name: setting.recommended_img.name,
            status: "done",
            url: setting.recommended_img.url,
          },
        ]);
      }
      if (setting.payment_img) {
        setPaymentImg(setting.payment_img);
        setPaymentImgList([
          {
            uid: setting.payment_img.uid,
            name: setting.payment_img.name,
            status: "done",
            url: setting.payment_img.url,
          },
        ]);
      }
    }
  }, [setting, form]);

  // File upload handler
  const handleFileUpload = async (
    rawFile: File,
    type:
      | "logo"
      | "secondaryLogo"
      | "favicon"
      | "recommendedImg"
      | "paymentImg",
  ) => {
    const formData = new FormData();
    formData.append("file", rawFile);

    try {
      setUploading(true);
      const res = await resourceApi.createResource(formData);
      setUploading(false);

      if (!res) return message.error("File upload failed");

      const fileObj = {
        uid: res.uid,
        name: res.name,
        status: "done",
        url: res.url,
      };

      switch (type) {
        case "logo":
          setLogo(res);
          setLogoList([fileObj]);
          break;
        case "secondaryLogo":
          setSecondaryLogo(res);
          setSecondaryLogoList([fileObj]);
          break;
        case "favicon":
          setFavicon(res);
          setFaviconList([fileObj]);
          break;
        case "recommendedImg":
          setRecommendedImg(res);
          setRecommendedImgList([fileObj]);
          break;
        case "paymentImg":
          setPaymentImg(res);
          setPaymentImgList([fileObj]);
          break;
      }
      message.success(`${type} uploaded successfully!`);
    } catch (error) {
      setUploading(false);
      message.error("File upload failed");
    }
  };

  // beforeUpload factory
  const makeBeforeUpload =
    (
      type:
        | "logo"
        | "secondaryLogo"
        | "favicon"
        | "recommendedImg"
        | "paymentImg",
    ) =>
    async (file: File) => {
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

  const onFinish = async (values: SettingPayload) => {
    const payload: SettingPayload = { ...values };

    // Only include the file if it's new or changed
    if (logo && logo.uid !== setting?.logo?.uid) payload.logo = logo;
    if (secondaryLogo && secondaryLogo.uid !== setting?.secondaryLogo?.uid)
      payload.secondaryLogo = secondaryLogo;
    if (favicon && favicon.uid !== setting?.favicon?.uid)
      payload.favicon = favicon;
    if (recommendedImg && recommendedImg.uid !== setting?.recommended_img?.uid)
      payload.recommended_img = recommendedImg;
    if (paymentImg && paymentImg.uid !== setting?.payment_img?.uid)
      payload.payment_img = paymentImg;

    dispatch(updateSetting(payload));
  };

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
          {/* All input fields remain */}
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
              rules={[{ required: true }, { type: "email" }]}
            >
              <Input placeholder="example@mail.com" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true }]}
            >
              <Input placeholder="+977 9812345678" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Alternate Phone Number" name="alt_phone">
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
              rules={[{ type: "url" }]}
            >
              <Input placeholder="https://twitter.com/" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Facebook Link"
              name="facebook"
              rules={[{ type: "url" }]}
            >
              <Input placeholder="https://www.facebook.com/" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Instagram Link"
              name="instagram"
              rules={[{ type: "url" }]}
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
              rules={[{ type: "url" }]}
            >
              <Input placeholder="https://www.tiktok.com/" />
            </Form.Item>
          </Col>

          {/* Map Link */}
          <Col xs={24}>
            <Form.Item
              label="Map Link"
              name="map_link"
              rules={[{ type: "url" }]}
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
