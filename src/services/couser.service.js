import AWS from "aws-sdk";

//
import { v4 as uuidv4 } from "uuid";
import { Course } from "~/models/course.model";

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
