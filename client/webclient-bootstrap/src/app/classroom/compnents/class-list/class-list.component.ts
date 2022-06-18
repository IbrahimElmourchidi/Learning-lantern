import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { NotifySerivce } from 'src/app/shared/services/notify.service';
import { AppState, StateService } from 'src/app/shared/services/state.service';
import { validateName } from 'src/app/shared/validator/name.validator';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-class-list',
  templateUrl: 'class-list.component.html',
  styleUrls: ['class-list.component.scss'],
})
export class ClassListComponent implements OnInit, OnDestroy {
  appState!: AppState;
  flag = false;
  createRoomForm!: FormGroup;
  joinRoomForm!: FormGroup;
  roomName!: FormControl;
  roomId!: FormControl;
  notifyMessage!: Subscription;

  constructor(
    private chatService: ChatService,
    private notify: NotifySerivce,
    private appStateService: StateService
  ) {}

  ngOnInit(): void {
    this.initFormControl();
    this.appStateService.currentState.subscribe(
      (state) => (this.appState = state)
    );
    this.chatService.getRooms().subscribe((data) => {
      if (this.flag)
        this.notify.changeNotify({
          header: `Room ${this.roomName.value} was created.`,
          style: 'green',
        });
      else this.flag = true;
      this.appState.rooms = data;
      this.enterRooms();
    });

    this.notifyMessage = this.chatService.getNewMessage().subscribe((data) => {
      if (data.room.Id !== this.appState.activeRoom?.Id) {
        this.notify.changeNotify({
          header: `New Message: ${data.room.Name}`,
          message: data.text,
        });
      }
    });
  }

  createRoom() {
    if (this.createRoomForm.invalid) {
      Object.keys(this.createRoomForm.controls).forEach((key) => {
        this.createRoomForm.controls[key].markAsDirty();
        this.createRoomForm.controls[key].markAsTouched();
      });
    } else {
      this.chatService.createRoom(this.roomName.value);
    }
  }

  joinRoom() {
    if (this.joinRoomForm.invalid) {
      Object.keys(this.joinRoomForm.controls).forEach((key) => {
        this.joinRoomForm.controls[key].markAsDirty();
        this.joinRoomForm.controls[key].markAsTouched();
      });
    } else {
      this.chatService.joinRoom(this.roomId.value);
    }
  }

  createForm() {
    this.createRoomForm = new FormGroup({
      roomName: this.roomName,
    });
    this.joinRoomForm = new FormGroup({
      roomId: this.roomId,
    });
  }

  initFormControl() {
    this.roomId = new FormControl('', [
      Validators.required,
      Validators.minLength(36),
      Validators.maxLength(36),
    ]);
    this.roomName = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      validateName,
    ]);
    this.createForm();
  }
  setActiveRoom(index: number) {
    this.appStateService.changeState({
      activeRoom: this.appState.rooms?.items[index],
    });
  }

  enterRooms() {
    if (this.appState.alreadyJoined === true) return;
    for (let room of this.appState.rooms!.items) {
      console.log('lets enter rooom ', room.Name);
      this.chatService.enterRoom(room);
    }
    this.appStateService.changeState({
      alreadyJoined: true,
    });
  }

  ngOnDestroy(): void {
    this.notifyMessage.unsubscribe();
  }
}
