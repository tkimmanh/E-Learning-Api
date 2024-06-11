import {
  createChapterService,
  createCourseService,
  deleteImageCourseService,
  deleteVideoService,
  uploadImageCourseService,
  uploadVideoService,
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

export const createChapterController = async (req, res) => {
  try {
    const { courseId, chapterData } = req.body;
    const result = await createChapterService(courseId, chapterData);
    return res.status(201).json({
      message: "Tạo chương thành công",
      course: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Create chapter failed",
      error: error.message,
    });
  }
};

export const uploadVideoController = async (req, res) => {
  try {
    const videoFile = req.file;
    const result = await uploadVideoService(videoFile);
    return res.status(200).json({
      message: "Tải video thành công",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Upload video failed",
      error: error.message,
    });
  }
};

export const deleteVideoController = async (req, res) => {
  try {
    const { videoUrl } = req.body;
    await deleteVideoService(videoUrl);
    return res.status(200).json({
      message: "Xóa video thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Xóa video thất bại",
      error: error.message,
    });
  }
};
