import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(
    message: string,
    duration: number = 3000,
    action: string = 'ok',
    vPosition: any = 'top',
    hPosition: any = 'right'
  ) {
    this._snackBar.open(message, action, {
      horizontalPosition: hPosition,
      verticalPosition: vPosition,
      duration: duration,
    });
  }
}
