import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

/**
 * @title Drag&Drop sorting
 */
@Component({
  selector: 'cdk-drag-drop-sorting-example',
  templateUrl: 'cdk-drag-drop-sorting-example.html',
  styleUrls: ['cdk-drag-drop-sorting-example.css']
})
export class CdkDragDropSortingExample implements OnInit {
  movies = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);

  item: any;
  startIndex: number = 0;
  aux: any;
  endIndex: number = 0;

  ngOnInit(): void {
    this.aux = this.movies.slice(0, 10);
    this.setRender(2);
    this.scrolled();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    this.setRender(3);
  }

  scrolled() {
    this.item = document.getElementById('content');
    if (
      this.item.scrollTop + this.item.offsetHeight >=
      this.item.scrollHeight
    ) {
      this.setRender(1);
      console.log('scrolled botton!!');
    } else if (this.item.scrollTop == 0 && this.startIndex >= 10) {
      console.log('scrolled top!!');
      this.setRender(2);
    }
    console.log('Distancia do top: ' + this.item.scrollTop);
    console.log('tamanho da div: ' + this.item.offsetHeight);
    console.log('Distancia Rolado: ' + this.item.scrollHeight);
  }

  setRender(method: any, start = 0, end = 0) {
    if (method == 'toBotton' || method == 1) {
      this.startIndex += 10;
      this.endIndex += 10;
    } else if (method == 'toTop' || method == 2) {
      if (this.startIndex < 10) {
        this.startIndex = 0;
        this.endIndex = 10;
      } else {
        this.startIndex -= 10;
        this.endIndex -= 10;
      }
    } else if (method == 'upgrade' || method == 3) {
      this.aux = this.movies.slice(this.startIndex, this.endIndex);
    }
    if (this.endIndex >= this.movies.length) {
      this.startIndex = this.movies.length - 10;
      this.endIndex = this.movies.length;
    }
    this.aux = this.movies.slice(this.startIndex, this.endIndex);
  }

  verificar() {
    this.scrolled();
  }
}

/**  Copyright 2021 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
