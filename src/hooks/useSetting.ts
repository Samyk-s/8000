"use client";

import { useEffect, useState } from "react";
import { Form, Upload, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import resourceApi from "@/lib/api/resourceApi";
import { MediaFile } from "@/types/utils-type";
import { SettingPayload, SiteSettingItem } from "@/types/site-setting";
import { updateSetting, fetchSetting } from "@/redux-store/slices/siteSlice";

export const useSetting = (setting?: SiteSettingItem) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const { loading } = useSelector((state: RootState) => state.setting);

  const [uploading, setUploading] = useState(false);

  // Each file + list maintained separately
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
  const { item } = useSelector((state: RootState) => state.setting);

  useEffect(() => {
    dispatch(fetchSetting()); // fetch single site setting
  }, [dispatch]);
  // Prefill form + file lists when setting available
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
    } else {
      // If no setting passed, clear fields (optional)
      form.resetFields();
      setLogo(null);
      setLogoList([]);
      setSecondaryLogo(null);
      setSecondaryLogoList([]);
      setFavicon(null);
      setFaviconList([]);
      setRecommendedImg(null);
      setRecommendedImgList([]);
      setPaymentImg(null);
      setPaymentImgList([]);
    }
  }, [setting, form]);

  // Upload handler
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

      if (!res) {
        message.error("File upload failed");
        return;
      }

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
    } catch (err) {
      setUploading(false);
      message.error("File upload failed");
    }
  };

  // beforeUpload factory (returns Upload.LIST_IGNORE to prevent auto-upload)
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

  // Submit handler
  const onFinish = async (values: SettingPayload) => {
    const payload: SettingPayload = { ...values };

    // Attach changed/new files only
    if (logo && logo.uid !== setting?.logo?.uid) payload.logo = logo;
    if (
      secondaryLogo &&
      secondaryLogo.uid !== setting?.secondaryLogo?.uid
    )
      payload.secondaryLogo = secondaryLogo;
    if (favicon && favicon.uid !== setting?.favicon?.uid)
      payload.favicon = favicon;
    if (
      recommendedImg &&
      recommendedImg.uid !== setting?.recommended_img?.uid
    )
      payload.recommended_img = recommendedImg;
    if (paymentImg && paymentImg.uid !== setting?.payment_img?.uid)
      payload.payment_img = paymentImg;

    // dispatch update
    dispatch(updateSetting(payload));
    // optionally refetch setting after a small delay or on slice change - the slice can handle it.
    // dispatch(fetchSetting()); // uncomment if you want immediate refresh
  };

  return {
    form,
    loading,
    uploading,
    logo,
    setLogo,
    logoList,
    setLogoList,
    secondaryLogo,
    setSecondaryLogo,
    secondaryLogoList,
    setSecondaryLogoList,
    favicon,
    setFavicon,
    faviconList,
    setFaviconList,
    recommendedImg,
    setRecommendedImg,
    recommendedImgList,
    setRecommendedImgList,
    paymentImg,
    setPaymentImg,
    paymentImgList,
    setPaymentImgList,
    makeBeforeUpload,
    onFinish,
    item
  };
};

export default useSetting;
