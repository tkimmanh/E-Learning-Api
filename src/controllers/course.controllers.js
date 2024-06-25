import { createPaymentService } from "~/services/cart.service";
import {
  createChapterService,
  createCourseService,
  deleteImageCourseService,
  deleteVideoService,
  getDetailCourseService,
  getListCourseByUserService,
  getPurchasedCourseByIdService,
  listCourseService,
  uploadImageCourseService,
  uploadVideoService,
} from "~/services/course.service";

export const uploadImageCourseController = async (req, res) => {
  try {
    const imageFile = req.file;
    const result = await uploadImageCourseService(imageFile);
    return res.status(200).json({
      msg: "Tải ảnh thành công",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Upload image failed",
      error: error.message,
    });
  }
};

export const deleteImageCourseController = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    await deleteImageCourseService(imageUrl);
    return res.status(200).json({
      msg: "Xóa ảnh thành công",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Delete image failed",
      error: error.message,
    });
  }
};

export const createCourseController = async (req, res) => {
  try {
    const courseData = req.body;
    const result = await createCourseService(courseData);
    return res.status(201).json({
      msg: "Tạo khóa học thành công",
      course: result,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Create course failed",
      error: error.message,
    });
  }
};

export const createChapterController = async (req, res) => {
  try {
    const { courseId, chapterData } = req.body;
    const result = await createChapterService(courseId, chapterData);
    return res.status(201).json({
      msg: "Tạo chương thành công",
      course: result,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Create chapter failed",
      error: error.message,
    });
  }
};

export const uploadVideoController = async (req, res) => {
  try {
    const videoFile = req.file;
    const result = await uploadVideoService(videoFile);
    return res.status(200).json({
      msg: "Tải video thành công",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Upload video failed",
      error: error.message,
    });
  }
};

export const deleteVideoController = async (req, res) => {
  try {
    const { videoUrl } = req.body;
    await deleteVideoService(videoUrl);
    return res.status(200).json({
      msg: "Xóa video thành công",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Xóa video thất bại",
      error: error.message,
    });
  }
};

export const listCourseController = async (req, res) => {
  try {
    const result = await listCourseService();
    if (!result) {
      return res.status(404).json({
        msg: "Không tồn tại khóa học",
      });
    }
    return res.status(200).json({
      msg: "Lấy danh sách khóa học thành công",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Lấy danh sách khóa học thất bại",
      error: error.message,
    });
  }
};
export const getDetailCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const result = await getDetailCourseService(courseId);
    if (!result) {
      return res.status(404).json({
        msg: "Không tồn tại khóa học",
      });
    }
    return res.status(200).json({
      msg: "Lấy chi tiết khóa học thành công",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Lấy chi tiết khóa học thất bại",
      error: error.message,
    });
  }
};

export const createPaymentController = async (req, res) => {
  try {
    const { courseId } = req.params;
    await createPaymentService(courseId);
  } catch (error) {
    return res.status(500).json({
      msg: "Create payment failed",
      error: error.message,
    });
  }
};

export const getListCourseByUserController = async (req, res) => {
  try {
    const result = await getListCourseByUserService(req.user._id);
    return res.status(200).json({
      msg: "Lấy danh sách khóa học thành công",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Lấy danh sách khóa học thất bại",
      error: error.message,
    });
  }
};

export const getPurchasedCourseByIdController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const result = await getPurchasedCourseByIdService(req.user._id, courseId);

    return res.status(200).json({
      msg: "Lấy khóa học đã mua thành công",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Lấy khóa học đã mua thất bại",
      error: error.message,
    });
  }
};
