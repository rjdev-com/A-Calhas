/*
  # Create Storage Bucket for Project Images

  1. Storage
    - Create public bucket 'project-images' for storing project photos
    - Configure policies for public read access
    - Configure policies for authenticated write access (admin only)

  2. Security
    - Public can view images (SELECT)
    - Only authenticated users can upload images (INSERT)
    - Only authenticated users can delete images (DELETE)
    - Only authenticated users can update images (UPDATE)

  3. Notes
    - Bucket will store all project portfolio images
    - Images will be organized by project ID
    - Public access allows images to load without authentication
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view project images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can upload project images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can update project images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'project-images')
  WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can delete project images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-images');