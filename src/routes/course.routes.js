import { Router } from "express";
import multer from "multer";

// ** controller
import {
  createChapterController,
  createCourseController,
  deleteImageCourseController,
  deleteVideoController,
  uploadImageCourseController,
  uploadVideoController,
} from "~/controllers/course.controllers";

// ** middleware
// import { isInstructor } from "~/middlewares/check-permission";
import { requireSignin } from "~/middlewares/require-signin";

// ** route
const routerCourse = Router();

// ** multer
const upload = multer();

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

export default routerCourse;
