import React, { memo, useState } from "react";
import { Upload, notification, Modal, Button, Checkbox } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default memo(function DocumentUpload({ formData }) {
  const [featuredImage, setFeaturedImage] = useState("No featured image Selected");
  const [uploadedFiles, setUploadedFiles] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  });

  const handleChange = async ({ fileList }) => {
    const file = fileList[fileList.length - 1];
    if (uploadedFiles?.fileList?.length >= 4 || !file) return;
    if (!file?.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setUploadedFiles({ ...uploadedFiles, fileList });
  };

  const handlePreview = (file) => {
    setUploadedFiles({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
      fileList: uploadedFiles.fileList,
    });
  };
  const handleDelete = (value) => {
    const fileList = uploadedFiles?.fileList?.filter((item) => item.uid !== value.uid);
    setUploadedFiles({ ...uploadedFiles, fileList });
  };

  const handleCancel = () => setUploadedFiles({ ...uploadedFiles, previewVisible: false });

  const handleSubmit = () => {
    console.log({ formData, featuredImage, uploadedFiles: uploadedFiles.fileList });
  };

  return (
    <div className="form_wrapper__document_upload">
      Upload Document
      <Dragger
        className="form_wrapper__document_upload__dragger"
        name="file"
        multiple={true}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        fileList={uploadedFiles.fileList}
        beforeUpload={() => {
          if (uploadedFiles?.fileList?.length >= 4)
            notification.error({ message: "You can upload only 4 images !!" });
        }}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleDelete}
        listType="picture-card"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
      </Dragger>
      <Modal
        visible={uploadedFiles.previewVisible}
        title={uploadedFiles.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <>
          <img
            className="form_wrapper__document_upload__img"
            alt="example"
            style={{ width: "100%" }}
            src={uploadedFiles.previewImage}
          />
          <Checkbox
            className="form_wrapper__document_upload__checkbox"
            checked={uploadedFiles.previewImage === featuredImage}
            onChange={() => {
              if (featuredImage === uploadedFiles.previewImage)
                setFeaturedImage("No featured image Selected");
              else setFeaturedImage(uploadedFiles.previewImage);
            }}
          >
            Select as featured image
          </Checkbox>
        </>
      </Modal>
      <Button className="form_wrapper__document_upload__btn" type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
});
