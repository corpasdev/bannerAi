import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  getMetadata,
  updateMetadata,
  listAll,
  StorageReference,
  UploadResult,
} from 'firebase/storage';
import type { UploadTaskSnapshot, SettableMetadata, FullMetadata } from 'firebase/storage';
import { storage } from './init';

// Types
export interface FileUploadProgress {
  bytesTransferred: number;
  totalBytes: number;
  percentage: number;
}

export interface FileUploadResult {
  downloadURL: string;
  metadata: FullMetadata;
  path: string;
}

export interface FileMetadata {
  name: string;
  size: number;
  contentType: string;
  timeCreated: string;
  updated: string;
  downloadURL: string;
}

// Helper functions
const createStorageRef = (path: string): StorageReference => {
  return ref(storage, path);
};

const generateUniqueFileName = (originalName: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  return `${timestamp}_${randomString}.${extension}`;
};

// File upload operations
export const uploadFile = async (
  file: File,
  path: string,
  metadata?: SettableMetadata
): Promise<FileUploadResult> => {
  try {
    const storageRef = createStorageRef(path);
    const uploadResult: UploadResult = await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(uploadResult.ref);

    return {
      downloadURL,
      metadata: uploadResult.metadata,
      path: uploadResult.ref.fullPath,
    };
  } catch (error) {
    throw new Error(`Failed to upload file: ${error}`);
  }
};

export const uploadFileWithProgress = (
  file: File,
  path: string,
  onProgress?: (progress: FileUploadProgress) => void,
  metadata?: SettableMetadata
): Promise<FileUploadResult> => {
  return new Promise((resolve, reject) => {
    const storageRef = createStorageRef(path);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      'state_changed',
      (snapshot: UploadTaskSnapshot) => {
        const progress: FileUploadProgress = {
          bytesTransferred: snapshot.bytesTransferred,
          totalBytes: snapshot.totalBytes,
          percentage: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        };
        onProgress?.(progress);
      },
      (error) => {
        reject(new Error(`Upload failed: ${error}`));
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            downloadURL,
            metadata: uploadTask.snapshot.metadata,
            path: uploadTask.snapshot.ref.fullPath,
          });
        } catch (error) {
          reject(new Error(`Failed to get download URL: ${error}`));
        }
      }
    );
  });
};

// File download operations
export const getFileDownloadURL = async (path: string): Promise<string> => {
  try {
    const storageRef = createStorageRef(path);
    return await getDownloadURL(storageRef);
  } catch (error) {
    throw new Error(`Failed to get download URL: ${error}`);
  }
};

export const getFileMetadata = async (path: string): Promise<FullMetadata> => {
  try {
    const storageRef = createStorageRef(path);
    return await getMetadata(storageRef);
  } catch (error) {
    throw new Error(`Failed to get file metadata: ${error}`);
  }
};

// File management operations
export const deleteFile = async (path: string): Promise<void> => {
  try {
    const storageRef = createStorageRef(path);
    await deleteObject(storageRef);
  } catch (error) {
    throw new Error(`Failed to delete file: ${error}`);
  }
};

export const updateFileMetadata = async (
  path: string,
  metadata: SettableMetadata
): Promise<FullMetadata> => {
  try {
    const storageRef = createStorageRef(path);
    return await updateMetadata(storageRef, metadata);
  } catch (error) {
    throw new Error(`Failed to update file metadata: ${error}`);
  }
};

// Directory operations
export const listFiles = async (path: string): Promise<FileMetadata[]> => {
  try {
    const storageRef = createStorageRef(path);
    const result = await listAll(storageRef);
    
    const filePromises = result.items.map(async (itemRef) => {
      const metadata = await getMetadata(itemRef);
      const downloadURL = await getDownloadURL(itemRef);
      
      return {
        name: metadata.name,
        size: metadata.size,
        contentType: metadata.contentType || 'unknown',
        timeCreated: metadata.timeCreated,
        updated: metadata.updated,
        downloadURL,
      };
    });

    return await Promise.all(filePromises);
  } catch (error) {
    throw new Error(`Failed to list files: ${error}`);
  }
};

// Utility functions
export const uploadProfileImage = async (
  file: File,
  userId: string,
  onProgress?: (progress: FileUploadProgress) => void
): Promise<string> => {
  const fileName = generateUniqueFileName(file.name);
  const path = `profiles/${userId}/${fileName}`;
  
  const metadata: SettableMetadata = {
    contentType: file.type,
    customMetadata: {
      userId,
      uploadedAt: new Date().toISOString(),
    },
  };

  const result = await uploadFileWithProgress(file, path, onProgress, metadata);
  return result.downloadURL;
};

export const uploadDocument = async (
  file: File,
  userId: string,
  category: string,
  onProgress?: (progress: FileUploadProgress) => void
): Promise<FileUploadResult> => {
  const fileName = generateUniqueFileName(file.name);
  const path = `documents/${userId}/${category}/${fileName}`;
  
  const metadata: SettableMetadata = {
    contentType: file.type,
    customMetadata: {
      userId,
      category,
      originalName: file.name,
      uploadedAt: new Date().toISOString(),
    },
  };

  return await uploadFileWithProgress(file, path, onProgress, metadata);
};

export const deleteUserFiles = async (userId: string): Promise<void> => {
  try {
    const userProfilesPath = `profiles/${userId}`;
    const userDocumentsPath = `documents/${userId}`;
    
    // Delete profile images
    const profileFiles = await listFiles(userProfilesPath);
    await Promise.all(
      profileFiles.map(file => deleteFile(`${userProfilesPath}/${file.name}`))
    );
    
    // Delete documents
    const documentFiles = await listFiles(userDocumentsPath);
    await Promise.all(
      documentFiles.map(file => deleteFile(`${userDocumentsPath}/${file.name}`))
    );
  } catch (error) {
    throw new Error(`Failed to delete user files: ${error}`);
  }
};

// File validation
export const validateFile = (
  file: File,
  options: {
    maxSize?: number; // in bytes
    allowedTypes?: string[];
    maxDimensions?: { width: number; height: number };
  }
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    // Check file size
    if (options.maxSize && file.size > options.maxSize) {
      reject(new Error(`File size exceeds maximum limit of ${options.maxSize} bytes`));
      return;
    }

    // Check file type
    if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
      reject(new Error(`File type ${file.type} is not allowed`));
      return;
    }

    // Check image dimensions if it's an image
    if (file.type.startsWith('image/') && options.maxDimensions) {
      const img = new Image();
      img.onload = () => {
        if (
          img.width > options.maxDimensions!.width ||
          img.height > options.maxDimensions!.height
        ) {
          reject(
            new Error(
              `Image dimensions exceed maximum of ${options.maxDimensions!.width}x${options.maxDimensions!.height}`
            )
          );
        } else {
          resolve(true);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    } else {
      resolve(true);
    }
  });
}; 