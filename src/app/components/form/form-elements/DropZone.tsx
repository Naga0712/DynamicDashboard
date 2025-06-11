import React, { useState } from "react";
// import ComponentCard from "../../common/ComponentCard";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onUpload: (files: File[]) => void;
  uploadedFileName?: string;
  setUploadedFileName?: (name: string) => void;
}

const DropzoneComponent: React.FC<DropzoneProps> = ({ onUpload, uploadedFileName, setUploadedFileName }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[], fileRejections: any) => {
    if (fileRejections.length > 0) {
      setError("Some files were rejected due to size limits or format issues.");
      return;
    }

    setError(null); // Clear any previous errors
    const newFiles = [...files, ...acceptedFiles];
    setFiles(newFiles);
    onUpload(newFiles); // Pass the updated file list
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    maxSize: 5 * 1024 * 1024, // 5MB
    noClick: true, // Prevent auto opening on div click
    multiple: true, // Allow multiple file uploads
  });

  const removeFile = (fileName: string) => {
    const updatedFiles = files.filter((file) => file.name !== fileName);
    setFiles(updatedFiles);
    onUpload(updatedFiles);
  };

  const removeUploadedFileName = () => {
    if (setUploadedFileName) {
      setUploadedFileName('');
    }
  };

  const cleanFileName = (fileName: string) => {
    try {
      const nameWithExtension = fileName.split('?')[0];
      const nameWithoutExtension = nameWithExtension.substring(0, nameWithExtension.lastIndexOf('.'));
      const extension = nameWithExtension.split('.').pop() || '';

      const nameParts = nameWithoutExtension.split('_');

      const cleanName = nameParts.length > 1 ? nameParts.slice(0, 2).join('_') : nameParts[0];

      return `${cleanName}.${extension}`;
    } catch (error) {
      console.error('Error cleaning filename:', error);
      return fileName;
    }
  };



  return (
    <div>
      <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
        <form
          {...getRootProps()}
          className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10
          ${isDragActive
              ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
              : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
            }`}
          id="demo-upload"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center h-1 space-y-1">
            <button
              type="button"
              onClick={open}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Upload File"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                viewBox="0 0 29 28"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                />
              </svg>
            </button>

            <h4 className="text-sm font-medium text-gray-800 dark:text-white">
              {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
            </h4>
          </div>
        </form>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {/* Previously Uploaded file */}
      {uploadedFileName && (
        <div className="mt-4 border p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
          <h5 className="font-semibold text-gray-800 dark:text-white mb-2">Previously Uploaded File</h5>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li className="flex justify-between items-center mb-2">
              <span>{cleanFileName(uploadedFileName)}</span>
              <button
                className="text-red-500 text-sm hover:underline ml-4"
                onClick={removeUploadedFileName}
              >
                Remove
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <div className="mt-4 border p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
          <h5 className="font-semibold text-gray-800 dark:text-white mb-2">Uploaded Files</h5>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            {files.map((file) => (
              <li key={file.name} className="flex justify-between items-center mb-2">
                <span>{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
                <button
                  className="text-red-500 text-sm hover:underline"
                  onClick={() => removeFile(file.name)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* </ComponentCard> */}
    </div>
  );
};

export default DropzoneComponent;
