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

import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CONFIG } from '../../../../config';

@Component({
  selector: 'segments-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    CdkDropList,
    CdkDrag,
    ScrollingModule,
  ],
  templateUrl: './segments-list.component.html',
  styleUrl: './segments-list.component.css',
})
export class SegmentsListComponent {
  @Input({ required: true }) segmentList?: any[];
  @Input({ required: true }) segmentMode!: 'preview' | 'segments';
  @Input({ required: true }) allowSelection!: boolean;
  @Input({ required: true }) draggable!: boolean;

  @Output() seekToSegmentEvent = new EventEmitter<number>();

  CONFIG = CONFIG;

  private _currentSegmentId: number = 0;
  @Input({ required: true })
  set currentSegmentId(value: number) {
    this._currentSegmentId = value;
    if (this.segmentMode === 'preview') {
      document
        .getElementById(`segment-${this._currentSegmentId}`)
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
    }
  }
  get currentSegmentId() {
    return this._currentSegmentId;
  }

  toggleSegmentSelection(i: number) {
    this.segmentList![i].selected = !this.segmentList![i].selected;
  }

  seekToSegment(i: number) {
    this.seekToSegmentEvent.emit(i);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.segmentList!, event.previousIndex, event.currentIndex);
    this.segmentList!.forEach(segment => (segment.played = false));
  }
}
