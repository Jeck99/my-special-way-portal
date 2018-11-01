import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import Student from '../../../../../models/student.model';
import { StudentService } from '../../../services/student.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Class } from '../../../../../models/class.model';
import { AddStudentDialogComponent } from '../../add/add-student.dialog';

@Component({
  selector: 'app-add-student.dialog',
  templateUrl: './add-student-reminder.dialog.html',
  styleUrls: ['./add-student-reminder.dialog.scss'],
})
export class AddStudentReminderDialogComponent implements OnInit {
  form: FormGroup;
  formControl = new FormControl('', [Validators.required]);
  gradeList: Class[];
  hours: string[] = [
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
  ];

  @Output()
  cancel = new EventEmitter<void>();
  @Input()
  options = { submitButtonLabel: 'עדכן' };

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student,
    public studentService: StudentService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: '',
      lastName: '',
      gender: '',
      userName: '',
      password: '',
      class: undefined,
    });
  }

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  close(): void {
    this.dialogRef.close();
  }

  confirmAdd(dialogData): void {
    this.dialogRef.close(dialogData);
  }

  // close() {
  //   this.cancel.emit();
  // }
}