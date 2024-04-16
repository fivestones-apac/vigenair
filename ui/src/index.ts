/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Methods in this file are referenced in ./ui/src/app/api-calls/*.
 * Do not rename without ensuring all references are updated.
 */

import { GenerationHelper, GenerationSettings } from './generation';
import { StorageManager } from './storage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getRunsFromGcs() {
  return StorageManager.listObjects();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFromGcs(filePath: string, mimeType: string): string | null {
  const result = StorageManager.loadFile(filePath) as GoogleAppsScript.Byte[];
  if (!result) {
    return null;
  }
  const dataUrl = `data:${mimeType};base64,${Utilities.base64Encode(result)}`;
  return dataUrl;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function uploadVideo(dataUrl: string, uploadedFileName: string) {
  const encodedUserId = Session.getActiveUser().getEmail()
    ? Utilities.base64Encode(Session.getActiveUser().getEmail())
    : Session.getTemporaryActiveUserKey();
  const folder = `${uploadedFileName}--${Date.now()}--${encodedUserId}`;
  StorageManager.uploadFile(dataUrl.split(',')[1], folder);
  return folder;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateVariants(gcsFolder: string, settings: GenerationSettings) {
  return GenerationHelper.generateVariants(gcsFolder, settings);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function doGet() {
  return HtmlService.createTemplateFromFile('ui')
    .evaluate()
    .setTitle('ViGenAiR - Recrafting Video Ads with Generative AI')
    .setFaviconUrl(
      'https://services.google.com/fh/files/misc/vigenair_logo.png'
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function include(filename: string) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
