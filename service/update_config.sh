#!/bin/bash
# Copyright 2024 Google LLC.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Update runtime environment variables without having to fully redeploy the cloud function.
gcloud functions deploy vigenair \
--update-env-vars CONFIG_TRANSCRIPTION_MODEL_WHISPER=large,CONFIG_TRANSCRIPTION_MODEL_GEMINI=gemini-1.5-pro,CONFIG_TEXT_MODEL=gemini-1.5-pro
