import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Task {
  id: number;
  category: string;
  taskName: string;
  description: string;
  expectedStartDate: string; // ISO string
  expectedWorkingHours: number;
  hourlyRate: number;
  rateCurrency: 'USD' | 'AUD' | 'SGD' | 'INR';
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  taskForm: FormGroup;
  tasks: Task[] = [];
  editingTaskId: number | null = null;

  categories = ['Web Development', 'Design', 'Marketing'];
  currencies = ['USD', 'AUD', 'SGD', 'INR'];

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      category: ['', Validators.required],
      taskName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      expectedStartDate: ['', Validators.required],
      expectedWorkingHours: ['', [Validators.required, Validators.min(1)]],
      hourlyRate: ['', [Validators.required, Validators.min(0)]],
      rateCurrency: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const taskData: Task = {
      id: this.editingTaskId ?? Date.now(),
      category: this.taskForm.value.category,
      taskName: this.taskForm.value.taskName,
      description: this.taskForm.value.description,
      expectedStartDate: this.taskForm.value.expectedStartDate,
      expectedWorkingHours: this.taskForm.value.expectedWorkingHours,
      hourlyRate: this.taskForm.value.hourlyRate,
      rateCurrency: this.taskForm.value.rateCurrency,
    };

    if (this.editingTaskId) {
      const index = this.tasks.findIndex((t) => t.id === this.editingTaskId);
      if (index !== -1) this.tasks[index] = taskData;
      this.editingTaskId = null;
    } else {
      this.tasks.push(taskData);
    }
    this.taskForm.reset();
  }

  onEdit(task: Task) {
    this.editingTaskId = task.id;
    this.taskForm.setValue({
      category: task.category,
      taskName: task.taskName,
      description: task.description,
      expectedStartDate: task.expectedStartDate,
      expectedWorkingHours: task.expectedWorkingHours,
      hourlyRate: task.hourlyRate,
      rateCurrency: task.rateCurrency,
    });
  }

  onCancel() {
    this.editingTaskId = null;
    this.taskForm.reset();
  }

  onDelete(task: Task) {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
  }
}
