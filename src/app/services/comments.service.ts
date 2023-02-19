import { Injectable } from '@angular/core';
import { Opinion } from 'src/Opinion';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  comments: Opinion[]=[];



  constructor() { }

  getNextId(){
    let maxId=0
    for(let o of this.comments){
      maxId=Math.max(maxId, o.opinionId);

    }
    return maxId+1;
  }
}
