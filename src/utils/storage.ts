import { createClient } from './supabase/client';

/**
 * Extracts the file path from a Supabase public URL.
 * Example: https://xxx.supabase.co/storage/v1/object/public/portfolio/projects/image.jpg
 * Returns: projects/image.jpg
 */
export const getFilePathFromUrl = (url: string, bucketName: string = 'portfolio') => {
    try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split(`/${bucketName}/`);
        if (pathParts.length > 1) {
            return pathParts[1];
        }
        return null;
    } catch (e) {
        return null;
    }
};

/**
 * Deletes a file from the specified storage bucket given its public URL.
 */
export const deleteFileByUrl = async (url: string, bucketName: string = 'portfolio') => {
    if (!url) return;

    const filePath = getFilePathFromUrl(url, bucketName);
    if (!filePath) return;

    const supabase = createClient();
    const { error } = await supabase.storage.from(bucketName).remove([filePath]);

    if (error) {
        console.error('Error deleting file from storage:', error.message);
    }

    return { error };
};
