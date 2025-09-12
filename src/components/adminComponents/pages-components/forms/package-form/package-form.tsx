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
  const [parentPageIds, setParentPageIds] = useState<number[]>(
    currentPackage ? [currentPackage.page_id] : [],
  );
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingRoute, setUploadingRoute] = useState(false);
  const [imageList, setImageList] = useState<any[]>([]);
  const [coverImageList, setCoverImageList] = useState<any[]>([]);
  const [coverRouteList, setRouteList] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<MediaFile | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<MediaFile | null>(null);
  const [routeFile, setRouteFile] = useState<MediaFile | null>(null);

  useEffect(() => {
    if (currentPackage) {
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
        parentPageIds: currentPackage?.page_id,
      });
      if (currentPackage?.image) {
        setImageFile(currentPackage?.image);
        setImageList([
          {
            uid: currentPackage?.image.uid,
            name: currentPackage?.image.name,
            status: "done",
            url: currentPackage?.image.url,
          },
        ]);
      }

      if (currentPackage?.cover_image) {
        setCoverImageFile(currentPackage?.cover_image);
        setCoverImageList([
          {
            uid: currentPackage?.cover_image?.uid,
            name: currentPackage?.cover_image?.name,
            status: "done",
            url: currentPackage?.cover_image?.url,
          },
        ]);
      }
      if (currentPackage?.route_map) {
        setRouteFile(currentPackage?.route_map);
        setRouteList([
          {
            uid: currentPackage?.route_map?.uid,
            name: currentPackage?.route_map?.name,
            status: "done",
            url: currentPackage?.route_map?.url,
          },
        ]);
      }
    }
  }, [currentPackage, form]);

  /** handle file upload */
  const handleFileUpload = async (
    rawFile: File,
    type: "image" | "cover" | "route",
  ): Promise<void> => {
    const formData = new FormData();
    formData.append("file", rawFile);

    try {
      if (type === "image") setUploadingImage(true);
      if (type === "cover") setUploadingCover(true);
      if (type === "route") setUploadingRoute(true);

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
      message.error("All three images must be uploaded!");
      return;
    }

    if (parentPageIds.length === 0) {
      message.error("Please select at least one page!");
      return;
    }

    const payload: PackagePayload = {
      title: values.title,
      image: imageFile,
      cover_image: coverImageFile,
      route_map: routeFile,
      altitude: Number(values.altitude),
      grade: values.grade,
      season: values.season,
      groupSize: values.groupSize,
      packageDays: Number(values.packageDays),
      price: Number(values.price),
      country: values.country,
      order: Number(values.order),
      description: values.description,
      includes: values.includes,
      excludes: values.excludes,
      tripNotes: values.tripNotes,
      parentPageIds,
      status: values.status ? 1 : 0,
      isUpcoming: values.isUpcoming ? 1 : 0,
      isBooking: values.isBooking ? 1 : 0,
    };

    if (currentPackage) {
      dispatch(updatePackage({ id: currentPackage.id, data: payload }));
      router.push("/admin/packages");
    } else {
      dispatch(createPackage(payload));
      router.push("/admin/packages");
    }
  };

  return (
    <Form form={form} name="package-form" layout="vertical" onFinish={onFinish}>
      <Row gutter={[16, 10]}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Country is required" }]}
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
        <Col xs={24} md={8}>
          <Form.Item label="Route Map" required>
            <Upload
              beforeUpload={makeBeforeUpload("route")}
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

        {/* Other Fields */}
        <Col xs={24} md={8}>
          <Form.Item
            label="Altitude"
            name="altitude"
            rules={[{ required: true, message: "Altitude is required" }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Grade"
            name="grade"
            rules={[{ required: true, message: "Grade is required" }]}
          >
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
            rules={[{ required: true, message: "Group size is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Package Days"
            name="packageDays"
            rules={[{ required: true, message: "Package day is required" }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Best Season"
            name="season"
            rules={[{ required: true, message: "Season is required" }]}
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
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Price is required" }]}
          >
            <Input type="number" min={0} />
          </Form.Item>
        </Col>

        {/* Parent Pages */}
        <Col span={24}>
          <Form.Item label="Activity/Destination/Pages">
            <CreatePackageTransfer onChange={setParentPageIds} />
          </Form.Item>
        </Col>

        {/* TextEditors */}
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

        {/* Order and Flags */}
        <Col xs={12} lg={8}>
          <Form.Item
            label="Order No."
            name="order"
            rules={[{ required: true, message: "Order is required" }]}
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
