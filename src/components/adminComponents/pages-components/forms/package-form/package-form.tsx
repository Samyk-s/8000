"use client";

import React, { useState, useEffect } from "react";
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
import CreatePackageTransfer from "../../drag-drop/drag-drop";
import TextEditor from "../../text-editor/text-editor";
import { Grade, Season } from "@/types/enum/enum";
import resourceApi from "@/lib/api/resourceApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux-store/store/store";
import {
  createPackage,
  updatePackage,
} from "@/redux-store/slices/packageSlice";
import { PackageItem, PackagePayload } from "@/types/package";
import { useRouter } from "next/navigation";
import { MediaFile } from "@/types/utils-type";

const { Option } = Select;

interface PackageFormProps {
  currentPackage?: PackageItem;
}

const PackageForm: React.FC<PackageFormProps> = ({ currentPackage }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [imageFile, setImageFile] = useState<MediaFile | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<MediaFile | null>(null);
  const [routeFile, setRouteFile] = useState<MediaFile | null>(null);

  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const [coverImageList, setCoverImageList] = useState<UploadFile[]>([]);
  const [routeList, setRouteList] = useState<UploadFile[]>([]);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingRoute, setUploadingRoute] = useState(false);

  useEffect(() => {
    if (currentPackage) {
      const ids = currentPackage?.parentPages?.map((p) => p.id) ?? [];

      form.setFieldsValue({
        title: currentPackage.title,
        country: currentPackage.country,
        altitude: currentPackage.altitude,
        grade: currentPackage.grade,
        season: currentPackage.season,
        groupSize: currentPackage.groupSize,
        packageDays: currentPackage.packageDays,
        price: currentPackage.price,
        order: currentPackage.order,
        status: !!currentPackage.status,
        isUpcoming: !!currentPackage.isUpcoming,
        isBooking: !!currentPackage.isBooking,
        description: currentPackage.description,
        includes: currentPackage.includes,
        excludes: currentPackage.excludes,
        tripNotes: currentPackage.tripNotes,
        parentPageIds: ids,
      });

      if (currentPackage.image) {
        setImageFile(currentPackage.image);
        setImageList([
          {
            uid: currentPackage.image.uid,
            name: currentPackage.image.name,
            status: "done",
            url: currentPackage.image.url,
          },
        ]);
      }

      if (currentPackage.cover_image) {
        setCoverImageFile(currentPackage.cover_image);
        setCoverImageList([
          {
            uid: currentPackage.cover_image.uid,
            name: currentPackage.cover_image.name,
            status: "done",
            url: currentPackage.cover_image.url,
          },
        ]);
      }

      if (currentPackage.route_map) {
        setRouteFile(currentPackage.route_map);
        setRouteList([
          {
            uid: currentPackage.route_map.uid,
            name: currentPackage.route_map.name,
            status: "done",
            url: currentPackage.route_map.url,
          },
        ]);
      }
    }
  }, [currentPackage, form]);

  const handleFileUpload = async (
    rawFile: File,
    type: "image" | "cover" | "route",
  ) => {
    const formData = new FormData();
    formData.append("file", rawFile);

    try {
      if (type === "image") setUploadingImage(true);
      if (type === "cover") setUploadingCover(true);
      if (type === "route") setUploadingRoute(true);

      const res: MediaFile = await resourceApi.createResource(formData);

      const uploadObj: UploadFile = {
        uid: res.uid,
        name: res.name,
        status: "done",
        url: res.url,
      };

      if (type === "image") {
        setImageFile(res);
        setImageList([uploadObj]);
      } else if (type === "cover") {
        setCoverImageFile(res);
        setCoverImageList([uploadObj]);
      } else {
        setRouteFile(res);
        setRouteList([uploadObj]);
      }

      message.success(
        `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully!`,
      );
    } catch (error) {
      console.error(error);
      message.error(
        `${type.charAt(0).toUpperCase() + type.slice(1)} upload failed`,
      );
    } finally {
      if (type === "image") setUploadingImage(false);
      if (type === "cover") setUploadingCover(false);
      if (type === "route") setUploadingRoute(false);
    }
  };

  const makeBeforeUpload =
    (type: "image" | "cover" | "route") =>
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

  const onFinish = (values: PackagePayload) => {
    if (!imageFile || !coverImageFile || !routeFile) {
      message.error("All three files must be uploaded!");
      return;
    }

    const payload: PackagePayload = {
      ...values,
      image: imageFile,
      cover_image: coverImageFile,
      route_map: routeFile,
      parentPageIds: values?.parentPageIds,
      altitude: Number(values.altitude),
      packageDays: Number(values.packageDays),
      price: Number(values.price),
      order: Number(values.order),
      status: values.status ? 1 : 0,
      isUpcoming: values.isUpcoming ? 1 : 0,
      isBooking: values.isBooking ? 1 : 0,
    };

    if (currentPackage) {
      dispatch(updatePackage({ id: currentPackage.id, data: payload }));
    } else {
      dispatch(createPackage(payload));
    }

    router.push("/admin/packages");
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={[16, 10]}>
        {/* Title & Country */}
        <Col xs={24} md={12}>
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* File Uploads */}
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
              <Button icon={<UploadOutlined />} loading={uploadingImage}>
                {uploadingImage ? "Uploading..." : "Click to Upload"}
              </Button>
            </Upload>
          </Form.Item>
        </Col>

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
              <Button icon={<UploadOutlined />} loading={uploadingCover}>
                {uploadingCover ? "Uploading..." : "Click to Upload"}
              </Button>
            </Upload>
          </Form.Item>
        </Col>

        <Col xs={24} md={8}>
          <Form.Item label="Route Map" required>
            <Upload
              beforeUpload={makeBeforeUpload("route")}
              listType="picture"
              maxCount={1}
              fileList={routeList}
              onRemove={() => {
                setRouteFile(null);
                setRouteList([]);
              }}
            >
              <Button icon={<UploadOutlined />} loading={uploadingRoute}>
                {uploadingRoute ? "Uploading..." : "Click to Upload"}
              </Button>
            </Upload>
          </Form.Item>
        </Col>

        {/* Numeric and Select Fields */}
        <Col xs={24} md={8}>
          <Form.Item
            label="Altitude"
            name="altitude"
            rules={[{ required: true }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item label="Grade" name="grade" rules={[{ required: true }]}>
            <Select placeholder="Select Grade">
              {Object.values(Grade).map((grade) => (
                <Option key={grade} value={grade}>
                  {grade}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Group Size"
            name="groupSize"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Package Days"
            name="packageDays"
            rules={[{ required: true }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Best Season"
            name="season"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Season">
              {Object.values(Season).map((season) => (
                <Option key={season} value={season}>
                  {season}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <Input type="number" min={0} />
          </Form.Item>
        </Col>

        {/* Parent Pages */}
        <Col span={24}>
          <Form.Item label="Activity/Destination/Pages" name="parentPageIds">
            <CreatePackageTransfer />
          </Form.Item>
        </Col>

        {/* Text Editors */}
        <Col span={24}>
          <Form.Item label="Description" name="description">
            <TextEditor />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label="Includes" name="includes">
            <TextEditor />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label="Excludes" name="excludes">
            <TextEditor />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Trip Notes" name="tripNotes">
            <TextEditor />
          </Form.Item>
        </Col>

        {/* Order & Flags */}
        <Col xs={12} lg={8}>
          <Form.Item
            label="Order No."
            name="order"
            rules={[{ required: true }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Form.Item label="Status" name="status" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Form.Item
            label="Booking Open"
            name="isBooking"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Form.Item
            label="Is Upcoming"
            name="isUpcoming"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="bg-black text-white hover:!bg-black hover:!text-white"
        >
          {currentPackage ? "Update Package" : "Create Package"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PackageForm;
