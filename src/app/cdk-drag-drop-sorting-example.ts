import { Component, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkDrag } from '@angular/cdk/drag-drop/public-api';
import { CdkDragMove, CdkDragSortEvent, CdkDragStart } from '@angular/cdk/drag-drop/drag-events';

/**
 * @title Drag&Drop sorting
 */
@Component({
  selector: 'cdk-drag-drop-sorting-example',
  templateUrl: 'cdk-drag-drop-sorting-example.html',
  styleUrls: ['cdk-drag-drop-sorting-example.css']
})
export class CdkDragDropSortingExample implements OnInit, OnChanges {
  movies = Array.from({ length: 1000000 }).map((_, i) => `${i}`);

  item: any;
  scrollBar: any;
  startIndex: number = 0;
  virtualList: any; //virtualList
  endIndex: number = 0;
  dragIndex: any;
  haveScroll = false;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('atualizei');
  }

  ngOnInit(): void {
    this.item = document.getElementById('content');
    this.item.addEventListener('scroll', (e: any) => this.scrolled())
    this.setRender(2);
    this.scrolled('init');
  }

  drop(event: CdkDragDrop<string[]>) {
    //console.log(event.);
    //console.log('drag!')
    this.dragIndex = []
    moveItemInArray(this.virtualList, event.previousIndex, event.currentIndex);
    this.updateList(this.haveScroll);
    this.haveScroll = false;
  }

  drag(event: any) {
    // this.state = 'dragStarted';
    this.dragIndex = this.movies[event.source.element.nativeElement.id.replace("_id:",'')];
    //console.log(event.source.element.nativeElement.id.replace("_id:",''));
  }

  scrolled(method = 'scrolled', itemSize = 50, itemToAdd = 10) {
    if (method == 'init') {
      this.virtualList = [];
      this.setRender(method, itemSize, itemToAdd);
    } else { 
        if (
        this.item.scrollTop + this.item.offsetHeight >=
        (this.item.scrollHeight - this.item.scrollHeight/20)
        ) {
          this.setRender(1);
          console.log('scrolled botton!!');
        } else if (this.startIndex != 0 && this.item.scrollTop > 0 && this.item.scrollTop <= this.item.scrollHeight/20 ) {
          console.log('scrolled top!!');
          this.setRender(2);
      }
    
    }
    //console.log('Distancia do top: ' + this.item.scrollTop);
    //console.log('tamanho da div: ' + this.item.offsetHeight);
    //console.log('Distancia Rolado: ' + this.item.scrollHeight);
  }

  setRender(method: any, itemSize = 50, itemToAdd = 10) {
    if (method == 'init'){
      this.startIndex = 0;
      this.endIndex = itemSize;
      this.virtualList = this.movies.slice(this.startIndex, this.endIndex);

    } else if (method == 'toBotton' || method == 1) {
      this.startIndex += itemToAdd;
      this.endIndex += itemToAdd;
    } else if (method == 'toTop' || method == 2) {
        this.startIndex -= itemToAdd;
        this.endIndex -= itemToAdd;
    } else if (method == 'upgrade' || method == 3) {
      this.virtualList = this.movies.slice(this.startIndex, this.endIndex);
    }
    if (this.endIndex >= this.movies.length) {
      this.startIndex = this.movies.length - 10;
      this.endIndex = this.movies.length;
    }
    if (this.dragIndex?.length > 0){
      this.haveScroll = true
      let aux = this.movies.slice(0, this.endIndex);
      this.virtualList = aux;
    } else {
      this.virtualList = this.movies.slice(this.startIndex, this.endIndex);
    }
  }

  updateList(haveScroll: boolean) {
    let indexAux = 0;
    if(haveScroll){
      for (let i = 0; i < this.endIndex; i++) {
        this.movies[i] = this.virtualList[indexAux];
        indexAux++;
      }
    } else {
      for (let i = this.startIndex; i < this.endIndex; i++) {
        this.movies[i] = this.virtualList[indexAux];
        indexAux++;
      }
    }
    this.setRender(3);
  }
}

/**  Copyright 2021 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
