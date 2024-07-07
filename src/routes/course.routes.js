import { Router } from "express";
import multer from "multer";

// ** controller
import {
  createChapterController,
  createCourseController,
  deleteImageCourseController,
  deleteVideoController,
  getDetailCourseController,
  getListCourseByUserController,
  getPurchasedCourseByIdController,
  listCourseController,
  uploadImageCourseController,
  uploadVideoController,
  addFreeCourseController,
  updateCourseController,
  updateChapterController,
  updateVideoController,
} from "~/controllers/course.controllers";

// ** middleware
// import { isInstructor } from "~/middlewares/check-permission";
import { requireSignin } from "~/middlewares/require-signin";

// ** route
const routerCourse = Router();

// ** multer
const upload = multer();

routerCourse.get("/list-course", listCourseController);
routerCourse.get("/detail-course/:courseId", getDetailCourseController);

routerCourse.post(
  "/upload-image",
  requireSignin,
  upload.single("image"),
  uploadImageCourseController
);

routerCourse.delete(
  "/delete-image",
  requireSignin,
  deleteImageCourseController
);

routerCourse.post("/create-course", requireSignin, createCourseController);
routerCourse.post("/create-chapter", createChapterController);
routerCourse.post(
  "/upload-video",
  upload.single("video"),
  uploadVideoController
);
routerCourse.delete("/delete-video", requireSignin, deleteVideoController);
routerCourse.get(
  "/list-course-by-user",
  requireSignin,
  getListCourseByUserController
);
routerCourse.get(
  "/purchased-course/:courseId",
  requireSignin,
  getPurchasedCourseByIdController
);

routerCourse.post(
  "/add-free-course/:courseId",
  requireSignin,
  addFreeCourseController
);
routerCourse.put(
  "/edit-course/:courseId",
  requireSignin,
  updateCourseController
);
routerCourse.put(
  "/edit-course/:courseId/chapter/:chapterId",
  requireSignin,

  updateChapterController
);
routerCourse.put(
  "/edit-course/:courseId/chapter/:chapterId/video/:videoId",
  requireSignin,
  updateVideoController
);

export default routerCourse;
