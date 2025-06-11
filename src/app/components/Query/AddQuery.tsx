import { t } from 'i18next';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import ApiManager from '../../services/ApiManager';
import { Query } from '../../services/ApiClient';

interface ApproverCommentsProps {
  onClose: () => void;
  username: string;
  processid: number; // Ensure this is passed from parent
  userid :number; // Ensure this is passed from parent
  facilityid?: number; // Optional, adjust as necessary
}

type FormData = {
  username: string;
  comments: string;
  processid: number;
  userid :number;
  facilityid: number; // Assuming this is needed, adjust as necessary
};

export default function AddQuery({ onClose, username, processid,userid,facilityid }: ApproverCommentsProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset, // ✅ Import reset to clear form after submission
  } = useForm<FormData>({
    defaultValues: {
      username: username || '',
      comments: '',
      processid: processid || 0,
    },
    mode: 'onChange', // Enables live validation for `isValid`
  });

  const apiClient = new ApiManager().CreateApiClient();

  const onSubmit = async (data: FormData) => {
    try {
      const comments = new Query({
        processid: data.processid,
        userid: userid,
        comments: data.comments,
        facilityid : facilityid,
        commentsusername: data.username,
        iscomments: true,
        isactive: true,
      });

      await apiClient.addQueries(comments);
      reset();       // ✅ Clear form after submit
      onClose();     // ✅ Close modal after submit
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Username Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
          {t('COL_USER')}
        </label>
        <Controller
          name="username"
          control={control}
          rules={{ required: 'Username is required' }}
          render={({ field }) => (
            <input
              {...field}
              readOnly
              className="w-full border border-gray-300 rounded-md bg-gray-100 text-gray-600 p-2 cursor-not-allowed focus:outline-none"
            />
          )}
        />
        {errors.username && (
          <p className="text-sm text-red-600 mt-1" role="alert">
            {errors.username.message}
          </p>
        )}
      </div>

      {/* Comments Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
          {t('COL_QUERY_COMMENTS')}
        </label>
        <Controller
          name="comments"
          control={control}
          rules={{ required: 'Comment is required' }}
          render={({ field }) => (
            <textarea
              {...field}
              rows={6}
              placeholder="Add your comment here..."
              className={`w-full border rounded-md p-3 resize-none text-gray-700 focus:outline-none focus:ring-2 ${
                errors.comments ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
          )}
        />
        {errors.comments && (
          <p className="text-sm text-red-600 mt-1" role="alert">
            {errors.comments.message}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          {t('BTN_CANCEL')}
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className={`px-4 py-2 text-white font-medium rounded-md focus:outline-none focus:ring-2 ${
            isValid
              ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {t('BTN_SUBMIT')}
        </button>
      </div>
    </form>
  );
}
