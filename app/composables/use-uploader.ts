import { toast } from "vue-sonner";
import crypto from "crypto";

// import s3 sdks
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl as getSignedUrlFromS3 } from "@aws-sdk/s3-request-presigner";
import type { APIResponse } from "~/lib/types";

type GetFileUrlParams = {
  fileType?: string;
  fileSize?: number;
  file?: File;
  userId: string;
};

type PresignedUrlResponse = {
  url: string;
  key: string;
  contentType: string;
};

type UploadedFile = {
  url: string;
  key: string;
  type: string;
};

const MAX_FILES = 5;
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const acceptedFileTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
];
export const useUploader = () => {
  const noteStore = useNoteStore();

  // generate random file name with crypto
  const generateFileName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString("hex");

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const config = useRuntimeConfig();

  // create s3 client
  const s3Config = config.s3 || {
    accessKey: process.env.NUXT_S3_ACCESS_KEY,
    secretKey: process.env.NUXT_S3_SECRET_KEY,
    region: process.env.NUXT_S3_REGION,
    bucketName: process.env.NUXT_S3_BUCKET_NAME,
  };
  const s3 = new S3Client({
    region: s3Config.region,
    credentials: {
      accessKeyId: s3Config.accessKey || "",
      secretAccessKey: s3Config.secretKey || "",
    },
  });

  const resetUploads = () => {
    noteStore.files = [];
    noteStore.previewUrls.forEach((url) => URL.revokeObjectURL(url));
    noteStore.previewUrls = [];
  };

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;

    const selectedFiles = Array.from(input.files || []);
    if (!selectedFiles) return;

    const validSizeFiles = selectedFiles.filter((f) => {
      const isValid = f.size <= MAX_SIZE_BYTES;
      if (!isValid) {
        toast.error(`${f.name} exceeds the ${MAX_SIZE_MB}MB limit.`);
      }
      return isValid;
    });

    const allowedCount = Math.max(0, MAX_FILES - noteStore.files.length);
    const accepted = validSizeFiles.slice(0, allowedCount);

    if (validSizeFiles.length > allowedCount) {
      toast.error(`You can only upload up to ${MAX_FILES} files.`);
    }

    const newPreviewUrls = accepted.map((file) => URL.createObjectURL(file));

    noteStore.files.push(...accepted);
    noteStore.previewUrls.push(...newPreviewUrls);
  };

  const removeFile = (index: number) => {
    const file = noteStore.files[index];
    const newFiles = [...noteStore.files];
    const newPreviewUrls = [...noteStore.previewUrls];

    newFiles.splice(index, 1);
    newPreviewUrls.splice(index, 1);

    const removedUrl = noteStore.previewUrls[index];
    if (removedUrl) {
      URL.revokeObjectURL(removedUrl);
    }
    noteStore.files = newFiles;
    noteStore.previewUrls = newPreviewUrls;

    toast.success(`${file?.name || "File"} removed successfully.`);
  };

  const getSignedUrl = async ({
    file,
    userId,
    fileType,
    fileSize,
  }: GetFileUrlParams): Promise<
    APIResponse & { url?: string; file?: File }
  > => {
    if (!userId) {
      return { success: false, message: "User not authenticated" };
    }

    const _fileSize = fileSize || (file ? file.size : undefined);
    const _fileType = fileType || (file ? file.type : undefined);

    if (!_fileType || !_fileSize || !file || !userId) {
      return { success: false, message: "Missing required fields" };
    }

    if (!acceptedFileTypes.includes(_fileType)) {
      return { success: false, message: "Invalid file type" };
    }

    if (_fileSize !== undefined && _fileSize > MAX_SIZE_BYTES) {
      return { success: false, message: "File too large" };
    }

    const checksum = await computeSHA256(file);

    try {
      // create s3 put object command
      const putObjCommand = new PutObjectCommand({
        Bucket: config.s3.bucketName!,
        Key: `${generateFileName()}.${_fileType.split("/")[1]}`,
        ContentType: _fileType,
        ContentLength: _fileSize,
        ChecksumSHA256: checksum,
        // Let's also add some metadata which is stored in s3.
        Metadata: {
          userId,
        },
      });

      // get signed url from s3
      const url = await getSignedUrlFromS3(s3, putObjCommand, {
        expiresIn: 3600,
      });

      console.log("Signed URL:", url);
      return { success: true, url, file };
    } catch (error) {
      console.error("Error creating S3 client:", error);
      return { success: false, message: "Failed to create s3 client" };
    }
  };

  const getPresignedUrls = async (files: File[]) => {
    const res = await $fetch<PresignedUrlResponse[]>(
      `${config.public.apiUrl}/media/presigned-urls`,
      {
        method: "POST",
        body: files.map((file) => ({
          filename: file.name,
          type: file.type,
        })),
      }
    );
    return res;
  };

  const deleteS3Object = async (url: string) => {
    const match = url.match(/(?:\.com\/|\/)([^\/]+)$/);
    const key = match ? match[1] : null;

    console.log(key);

    if (!key) {
      throw new Error("Invalid URL");
    }

    try {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: config.s3.bucketName,
        Key: key,
      });
      await s3.send(deleteCommand);
    } catch (error) {
      console.error("Error deleting object from S3:", error);
    }
  };

  return {
    handleFileChange,
    resetUploads,
    removeFile,
    getSignedUrl,
    deleteS3Object,
    MAX_FILES,
    MAX_SIZE_MB,
  };
};
