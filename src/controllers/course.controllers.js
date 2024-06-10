import {
  createCourseService,
  deleteImageCourseService,
  uploadImageCourseService,
} from "~/services/couser.service";

export const uploadImageCourseController = async (req, res) => {
  try {
    const imageFile = req.file;
    const result = await uploadImageCourseService(imageFile);
    return res.status(200).json({
      message: "Tải ảnh thành công",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Upload image failed",
      error: error.message,
    });
  }
};

export const deleteImageCourseController = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    await deleteImageCourseService(imageUrl);
    return res.status(200).json({
      message: "Xóa ảnh thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Delete image failed",
      error: error.message,
    });
  }
};

export const createCourseController = async (req, res) => {
  try {
    const courseData = req.body;
    const result = await createCourseService(courseData);
    return res.status(201).json({
      message: "Tạo khóa học thành công",
      course: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Create course failed",
      error: error.message,
    });
  }
};
