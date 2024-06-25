// ** aws
import AWS from "aws-sdk";

// ** uuid
import { v4 as uuidv4 } from "uuid";

// ** model
import { Course } from "~/models/course.model";
import { User } from "~/models/users.model";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadImageCourseService = async (imageFile) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `images/${uuidv4()}-${imageFile.originalname}`,
    Body: imageFile.buffer,
    ContentType: imageFile.mimetype,
    ACL: "public-read",
  };
  const uploadResult = await s3.upload(params).promise();
  return uploadResult.Location;
};

export const deleteImageCourseService = async (imageUrl) => {
  if (!imageUrl) {
    throw new Error("imageUrl is required");
  }
  const key = imageUrl.split(".com/")[1];
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  await s3.deleteObject(params).promise();
};

export const createCourseService = async (courseData) => {
  if (!courseData) {
    return res.status(400).json({
      message: "Vui lòng nhập đầy đủ thông tin",
    });
  }
  const newCourse = await Course.create(courseData);

  return newCourse;
};

export const uploadVideoService = async (videoFile) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `videos/${uuidv4()}-${videoFile.originalname}`,
    Body: videoFile.buffer,
    ContentType: videoFile.mimetype,
    ACL: "public-read",
  };
  const uploadResult = await s3.upload(params).promise();
  return uploadResult.Location;
};

export const createChapterService = async (courseId, chapterData) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new Error("Course not found");
  }
  course.chapters.push(chapterData);
  await course.save();
  return course;
};

export const deleteVideoService = async (videoUrl) => {
  if (!videoUrl) {
    throw new Error("videoUrl không được để trống");
  }
  const key = videoUrl.split(".com/")[1];
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  await s3.deleteObject(params).promise();
};

export const listCourseService = async () => {
  const courses = await Course.find({ published: true });
  return courses;
};

export const getDetailCourseService = async (courseId) => {
  const course = await Course.findById({ _id: courseId });
  return course;
};

export const getListCourseByUserService = async (userId) => {
  const user = await User.findById(userId).populate("courses");
  return user.courses;
};

export const getPurchasedCourseByIdService = async (userId, courseId) => {
  const user = await User.findById(userId).populate("courses");

  if (!user) {
    throw new Error("Người d không tồn tại");
  }
  const course = user.courses.find(
    (course) => course._id.toString() === courseId
  );

  if (!course) {
    throw new Error("Bạn chưa mua khóa học này");
  }
  return course;
};
