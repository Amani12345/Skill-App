import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Skill {
  id: number;
  category: string;
  experience: string;
  natureOfWork: 'onsite' | 'online';
  hourlyRate: number;
}

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
})
export class SkillComponent implements OnInit {
  skillForm: FormGroup;
  skills: Skill[] = [];
  editingSkillId: number | null = null;

  categories = ['Web Development', 'Design', 'Marketing'];

  constructor(private fb: FormBuilder) {
    this.skillForm = this.fb.group({
      category: ['', Validators.required],
      experience: ['', [Validators.required]],
      natureOfWork: ['', Validators.required],
      hourlyRate: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.skillForm.invalid) {
      this.skillForm.markAllAsTouched();
      return;
    }

    const skillData: Skill = {
      id: this.editingSkillId ?? Date.now(),
      category: this.skillForm.value.category,
      experience: this.skillForm.value.experience,
      natureOfWork: this.skillForm.value.natureOfWork,
      hourlyRate: this.skillForm.value.hourlyRate,
    };

    if (this.editingSkillId) {
      const index = this.skills.findIndex((s) => s.id === this.editingSkillId);
      if (index !== -1) this.skills[index] = skillData;
      this.editingSkillId = null;
    } else {
      this.skills.push(skillData);
    }
    this.skillForm.reset();
  }

  onEdit(skill: Skill) {
    this.editingSkillId = skill.id;
    this.skillForm.setValue({
      category: skill.category,
      experience: skill.experience,
      natureOfWork: skill.natureOfWork,
      hourlyRate: skill.hourlyRate,
    });
  }

  onCancel() {
    this.editingSkillId = null;
    this.skillForm.reset();
  }

  onDelete(skill: Skill) {
    this.skills = this.skills.filter((s) => s.id !== skill.id);
  }
}
